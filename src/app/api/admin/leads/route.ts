import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import type { ApiResponse } from "@/lib/supabase/types";

// Simple auth check - requires ADMIN_SECRET header
function isAuthorized(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === adminSecret;
}

// GET /api/admin/leads - List all leads
export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // Filter by status

    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/leads - Update lead status
export async function PATCH(request: NextRequest): Promise<NextResponse<ApiResponse<{ id: string; status: string }>>> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const body = await request.json().catch(() => null);

    if (!body?.id || !body?.status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const { id, status } = body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    // Get current lead status
    const { data: currentLead, error: fetchError } = await supabase
      .from("leads")
      .select("status")
      .eq("id", id)
      .single();

    if (fetchError || !currentLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // If accepting a lead, check if spots are available and decrement
    if (status === "accepted" && currentLead.status !== "accepted") {
      const { data: spots } = await supabase
        .from("founding_spots")
        .select("remaining")
        .eq("id", 1)
        .single();

      if (!spots || spots.remaining <= 0) {
        return NextResponse.json({ success: false, error: "No founding spots remaining" }, { status: 400 });
      }

      // Decrement spots
      const { error: decrementError } = await supabase.rpc("decrement_founding_spots");
      if (decrementError) {
        return NextResponse.json({ success: false, error: "Failed to reserve spot" }, { status: 500 });
      }
    }

    // If un-accepting (changing from accepted to something else), increment spots back
    if (currentLead.status === "accepted" && status !== "accepted") {
      await supabase.rpc("increment_founding_spots");
    }

    // Update lead status
    const { error: updateError } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { id, status } });
  } catch {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import type { ApiResponse, FoundingSpotsResponse } from "@/lib/supabase/types";

export const revalidate = 60; // Cache for 60 seconds

export async function GET(): Promise<NextResponse<ApiResponse<FoundingSpotsResponse>>> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("founding_spots")
      .select("total, remaining")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch founding spots" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Founding spots not configured" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { total: data.total, remaining: data.remaining },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

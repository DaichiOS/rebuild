import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import type { ApiResponse, LeadSubmitRequest, LeadInsert } from "@/lib/supabase/types";

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile: string): boolean {
  // Australian mobile: 04XX XXX XXX or +614XX XXX XXX
  const cleaned = mobile.replace(/\s|-/g, "");
  return /^(\+?61|0)4\d{8}$/.test(cleaned);
}

function validateLeadRequest(data: unknown): { valid: true; data: LeadSubmitRequest } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const body = data as Record<string, unknown>;

  // Required fields
  const requiredFields = ["name", "email", "mobile", "businessName", "industry", "hasWebsite", "lookingFor", "frustration"];
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== "string" || (body[field] as string).trim() === "") {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  // Email validation
  if (!isValidEmail(body.email as string)) {
    return { valid: false, error: "Invalid email address" };
  }

  // Mobile validation
  if (!isValidMobile(body.mobile as string)) {
    return { valid: false, error: "Invalid mobile number" };
  }

  return {
    valid: true,
    data: {
      name: (body.name as string).trim(),
      email: (body.email as string).trim().toLowerCase(),
      mobile: (body.mobile as string).trim(),
      businessName: (body.businessName as string).trim(),
      websiteUrl: body.websiteUrl ? (body.websiteUrl as string).trim() : undefined,
      industry: (body.industry as string).trim(),
      hasWebsite: (body.hasWebsite as string).trim(),
      lookingFor: (body.lookingFor as string).trim(),
      frustration: (body.frustration as string).trim(),
      heardFrom: body.heardFrom ? (body.heardFrom as string).trim() : undefined,
    },
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  try {
    const supabase = getSupabase();

    // Parse and validate request body
    const body = await request.json().catch(() => null);
    const validation = validateLeadRequest(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const leadData = validation.data;

    // Check for duplicate email
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("email", leadData.email)
      .single();

    if (existingLead) {
      return NextResponse.json(
        { success: false, error: "This email has already been submitted" },
        { status: 409 }
      );
    }

    // Transform to database format
    const leadInsert: LeadInsert = {
      name: leadData.name,
      email: leadData.email,
      mobile: leadData.mobile,
      business_name: leadData.businessName,
      website_url: leadData.websiteUrl || null,
      industry: leadData.industry,
      has_website: leadData.hasWebsite,
      looking_for: leadData.lookingFor,
      frustration: leadData.frustration,
      heard_from: leadData.heardFrom || null,
    };

    // Insert lead
    const { data: newLead, error: insertError } = await supabase
      .from("leads")
      .insert(leadInsert)
      .select("id")
      .single();

    if (insertError) {
      console.error("Lead insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to save your information" },
        { status: 500 }
      );
    }

    // Decrement founding spots (fire and forget - don't block on this)
    supabase.rpc("decrement_founding_spots").then(({ error }) => {
      if (error) console.error("Failed to decrement founding spots:", error);
    });

    return NextResponse.json({
      success: true,
      data: { id: newLead.id },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

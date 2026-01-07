// Database types for Supabase tables

export type Lead = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  business_name: string;
  website_url: string | null;
  industry: string;
  has_website: string;
  looking_for: string;
  frustration: string;
  heard_from: string | null;
  created_at: string;
};

export type LeadInsert = Omit<Lead, "id" | "created_at">;

export type FoundingSpots = {
  id: number;
  total: number;
  remaining: number;
  updated_at: string;
};

// API response types
export type FoundingSpotsResponse = {
  total: number;
  remaining: number;
};

export type LeadSubmitRequest = {
  name: string;
  email: string;
  mobile: string;
  businessName: string;
  websiteUrl?: string;
  industry: string;
  hasWebsite: string;
  lookingFor: string;
  frustration: string;
  heardFrom?: string;
};

export type ApiResponse<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

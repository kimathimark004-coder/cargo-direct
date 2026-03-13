import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type CreateDriverBody = {
  full_name?: string;
  phone?: string;
  email?: string;
  national_id?: string;
  license_number?: string;
  vehicle_registration?: string;
  vehicle_type?: string;
};

export async function POST(req: Request) {
  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server misconfigured." },
      { status: 500 }
    );
  }

  let body: CreateDriverBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const full_name = (body.full_name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const national_id = (body.national_id ?? "").trim();
  const license_number = (body.license_number ?? "").trim();
  const vehicle_registration = (body.vehicle_registration ?? "").trim();
  const vehicle_type = (body.vehicle_type ?? "").trim();

  const missing = [];
  if (!full_name) missing.push("Full Name");
  if (!phone) missing.push("Phone Number");
  if (!email) missing.push("Email");
  if (!national_id) missing.push("National ID");
  if (!license_number) missing.push("Driver License Number");
  if (!vehicle_registration) missing.push("Vehicle Registration Number");
  if (!vehicle_type) missing.push("Vehicle Type");

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("drivers")
    .insert([
      {
        full_name,
        phone,
        email,
        national_id,
        license_number,
        vehicle_registration,
        vehicle_type,
        verification_status: "pending",
        phone_verified: false,
      },
    ])
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message, code: error.code, hint: error.hint },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}


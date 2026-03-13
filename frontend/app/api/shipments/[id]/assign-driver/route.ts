import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type Body = { driver_id?: string };

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server misconfigured." },
      { status: 500 }
    );
  }

  const { id: shipmentId } = await ctx.params;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const driverId = (body.driver_id ?? "").trim();
  if (!driverId) {
    return NextResponse.json({ error: "driver_id is required" }, { status: 400 });
  }

  const { data: driver, error: driverError } = await supabaseAdmin
    .from("drivers")
    .select("id, full_name, verification_status, phone_verified")
    .eq("id", driverId)
    .single();

  if (driverError) {
    return NextResponse.json(
      { error: driverError.message, code: driverError.code },
      { status: 500 }
    );
  }

  if (
    driver.verification_status !== "verified" ||
    driver.phone_verified !== true
  ) {
    return NextResponse.json(
      {
        error:
          "Driver is not eligible. Require phone_verified=true AND verification_status='verified'.",
      },
      { status: 403 }
    );
  }

  // Expected schema: shipments has driver_id (uuid/text) and optional driver (name).
  const { error: updateError } = await supabaseAdmin
    .from("shipments")
    .update({ driver_id: driver.id, driver: driver.full_name })
    .eq("id", shipmentId);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message, code: updateError.code, hint: updateError.hint },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}


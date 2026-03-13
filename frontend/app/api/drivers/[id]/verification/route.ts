import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type Body = { verification_status?: "verified" | "rejected" };

export async function PATCH(
  _req: Request,
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

  const { id } = await ctx.params;

  let body: Body;
  try {
    body = await _req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const status = body.verification_status;
  if (status !== "verified" && status !== "rejected") {
    return NextResponse.json(
      { error: "verification_status must be 'verified' or 'rejected'" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("drivers")
    .update({ verification_status: status })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message, code: error.code, hint: error.hint },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}


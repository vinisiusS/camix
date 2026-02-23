import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const payload = {
      id: 1,
      nome: body.nome ?? null,
      numero_c: body.numero_c ?? null,
      numero_fpc: body.numero_fpc ?? null,
      numero_val: body.numero_val ?? null,
      numero_vvc: body.numero_vvc ?? null,
      numero_t: body.numero_t ?? null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_camix")
      .upsert(payload, { onConflict: "id" });

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, erro: e.message }) };
  }
}
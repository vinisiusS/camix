const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
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

    const url = `${process.env.SUPABASE_URL}/rest/v1/user_camix?id=eq.1`;

    const r = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) throw new Error(await r.text());

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, erro: e.message }),
    };
  }
};
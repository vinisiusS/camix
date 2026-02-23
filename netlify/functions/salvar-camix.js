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
      nome: body.nome ?? null,
      numero_c: body.numero_c ?? null,
      numero_fpc: body.numero_fpc ?? null,
      numero_val: body.numero_val ?? null,
      numero_vvc: body.numero_vvc ?? null,
      numero_t: body.numero_t ?? null,
    };

    const url = `${process.env.SUPABASE_URL}/rest/v1/user_camix`;

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
    if (!r.ok) throw new Error(text || "Erro no Supabase");

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: text, // vai voltar a linha criada (com id)
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, erro: e.message }),
    };
  }
};
// Funzione serverless (Vercel). Riceve le richieste dal frontend e le inoltra
// all'API Anthropic usando la chiave salvata nelle variabili d'ambiente del
// progetto Vercel — la chiave non è mai visibile nel browser dell'utente.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY non configurata su Vercel (Settings → Environment Variables)." });
    return;
  }

  const { system, content, maxTokens } = req.body || {};
  if (!content) {
    res.status(400).json({ error: "Richiesta non valida: manca il contenuto." });
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens || 1200,
        system,
        messages: [{ role: "user", content }],
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: data.error?.message || "Errore dall'API Anthropic." });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Errore del server: " + err.message });
  }
}

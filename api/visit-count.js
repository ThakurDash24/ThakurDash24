// Vercel serverless function: proxies the real visitor count from CounterAPI v2.
//
// Why this exists instead of calling CounterAPI directly from the browser:
// CounterAPI v2 requires a Bearer API key on every request (including increments).
// That key must stay secret, so it lives here as a server-side env var and is
// never shipped to the client bundle.
//
// Required environment variables (set in the Vercel project settings):
//   COUNTERAPI_KEY        - API key from https://counterapi.dev/signup
//   COUNTERAPI_WORKSPACE  - the workspace slug created in your CounterAPI dashboard
// Optional:
//   COUNTERAPI_COUNTER    - counter name within the workspace (default: "portfolio-visits")

const COUNTER_NAME = process.env.COUNTERAPI_COUNTER || 'portfolio-visits';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    const apiKey = process.env.COUNTERAPI_KEY;
    const workspace = process.env.COUNTERAPI_WORKSPACE;

    if (!apiKey || !workspace) {
        res.status(503).json({ error: 'Visit counter is not configured yet.' });
        return;
    }

    try {
        const upstream = await fetch(
            `https://api.counterapi.dev/v2/${encodeURIComponent(workspace)}/${encodeURIComponent(COUNTER_NAME)}/up`,
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );

        if (!upstream.ok) {
            res.status(502).json({ error: 'Upstream counter request failed.' });
            return;
        }

        const data = await upstream.json();
        const count = data?.data?.value ?? data?.data?.up_count ?? data?.count ?? null;

        if (typeof count !== 'number') {
            res.status(502).json({ error: 'Unexpected counter response shape.' });
            return;
        }

        res.status(200).json({ count });
    } catch (err) {
        res.status(502).json({ error: 'Could not reach the counter service.' });
    }
}

import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
    "https://fimmkvsywsxovvhdctfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbW1rdnN5d3N4b3Z2aGRjdGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODY1NjEsImV4cCI6MjA1OTk2MjU2MX0.gJZmkZ6RPxYrjxNjlTYSxAx4qoKmpAAXVSQ8CthaCqU"
);

// Hi, don't delete this!
// We need this serverless function for our cron job
// It'll ping the website every 12 hours to keep it alive
// and that prevents supabase from pausing the database

export default async function handler(req, res) {
    try {
        const { error } = await supabaseServer
            .from("projects")
            .select("id", { limit: 1 });

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ ok: false, error });
        }

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Keepalive crashed:", err);
        return new Response(JSON.stringify({ ok: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

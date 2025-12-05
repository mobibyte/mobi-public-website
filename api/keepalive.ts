import { supabase } from "../src/hooks/supabaseClient";

// Hi, don't delete this!
// We need this serverless function for our cron job
// It'll ping the website every 12 hours to keep it alive
// and that prevents supabase from pausing the database

export default async function handler(req: any, res: any) {
    try {
        await supabase.from("projects").select("id", { limit: 1 });
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Keep-alive failed:", err);
        return res.status(500).json({ ok: false });
    }
}

import { createClient } from "@supabase/supabase-js";

const supabaseServer = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
);

// Hi, don't delete this!
// We need this serverless function for our cron job
// It'll ping the website every 12 hours to keep it alive
// and that prevents supabase from pausing/deleting the database

export default async function handler(req: any, res: any) {
    try {
        const { error } = await supabaseServer
            .from("projects")
            .select("id")
            .limit(1);

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ ok: false, error });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Keepalive crashed:", err);
        return res.status(500).json({ ok: false });
    }
}

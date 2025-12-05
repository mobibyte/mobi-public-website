import { supabase } from "../src/hooks/supabaseClient";

export default async function handler(req: any, res: any) {
    try {
        await supabase.from("projects").select("id", { limit: 1 });
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Keep-alive failed:", err);
        return res.status(500).json({ ok: false });
    }
}

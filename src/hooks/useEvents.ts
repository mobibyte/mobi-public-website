import { supabase } from "./supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "../types";

export function useGetCurrentSemesterEvents() {
    const today = new Date();

    return useQuery<Event[], Error>({
        queryKey: ["events"],
        queryFn: async () => {
            console.log("today:", today.toISOString());
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)")
                .gte("ends_at", today.toISOString());
            if (error) {
                throw new Error(error.message);
            }
            const events = data.map((event) => {
                return {
                    ...event,
                    created_at: new Date(event.created_at),
                    starts_at: new Date(event.starts_at),
                    ends_at: new Date(event.ends_at),
                };
            });
            console.log("Fetched events:", events);
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 60, // 1 hour
    });
}

export function useGetAllSemesterEvents() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan

    let startDate: string;
    let endDate: string;

    // Spring: Jan–May
    if (month >= 0 && month <= 4) {
        startDate = `${year}-01-01`;
        endDate = `${year}-05-31`;
    }
    // Fall: Aug–Dec
    else if (month >= 7 && month <= 11) {
        startDate = `${year}-08-01`;
        endDate = `${year}-12-31`;
    }
    // Optional: handle summer (Jun–Jul)
    else {
        startDate = `${year}-06-01`;
        endDate = `${year}-07-31`;
    }

    return useQuery<Event[], Error>({
        queryKey: ["events", "all"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("events")
                .select("*, profiles (*)")
                .gte("ends_at", startDate)
                .lte("ends_at", endDate);
            if (error) {
                throw new Error(error.message);
            }
            const events = data.map((event) => {
                return {
                    ...event,
                    created_at: new Date(event.created_at),
                    starts_at: new Date(event.starts_at),
                    ends_at: new Date(event.ends_at),
                };
            });
            console.log("Fetched events:", events);
            return (events as Event[]) || [];
        },
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 60, // 1 hour
    });
}

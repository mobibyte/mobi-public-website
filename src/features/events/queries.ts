import { queryOptions } from "@tanstack/react-query";
import { getAllSemesterEvents, getAllEvents, getEventById } from "./api";

export const eventQueries = {
    allSemesterEvents: () =>
        queryOptions({
            queryKey: ["events", "semester"],
            queryFn: async () => getAllSemesterEvents(),
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // Data is considered fresh for 1 hour
        }),

    byId: (eventId: string) =>
        queryOptions({
            queryKey: ["event", eventId],
            queryFn: async () => getEventById(eventId),
            gcTime: 1000 * 60 * 60,
        }),

    all: () =>
        queryOptions({
            queryKey: ["events", "all"],
            queryFn: async () => getAllEvents,
            refetchOnWindowFocus: true,
            gcTime: 1000 * 60 * 60, // 1 hour
        }),
};

type FormattedDate = {
    month: string;
    year: number;
    day: number;
    shortMonth: string;
    time: string;
    weekDay: string;
    shortWeekDay: string;
    fullDate: string;
};

import type { Officer } from "@/types";

export function FormatDate(date: Date): FormattedDate {
    const formatted = {
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        day: date.getDate(),
        shortMonth: date.toLocaleString("default", { month: "short" }),
        time: date.toLocaleTimeString("default", {
            hour: "numeric",
            minute: "2-digit",
        }),
        weekDay: date.toLocaleString("default", { weekday: "long" }),
        shortWeekDay: date.toLocaleString("default", { weekday: "short" }),
        fullDate: new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
        }).format(date),
    };
    return formatted;
}

export function getSemester(): "Spring" | "Fall" {
    const today = new Date();
    const month = today.getMonth(); // 0 = January, 11 = December
    return month < 6 ? "Spring" : "Fall";
}

export function sanitizeFileName(name: string) {
    // Keep extension
    const dot = name.lastIndexOf(".");
    const base = dot === -1 ? name : name.slice(0, dot);
    const ext = dot === -1 ? "" : name.slice(dot);

    // Normalize & remove weird unicode, collapse spaces, allow [\w.-]
    const cleanBase = base
        .normalize("NFKD")
        .replace(/[\u202F\u00A0]/g, " ") // narrow NBSP & NBSP -> space
        .replace(/\s+/g, " ")
        .trim()
        .replace(/[^\w.-]+/g, "-"); // non-url-safe -> hyphen

    return `${cleanBase}${ext}`;
}

export const sortOfficers = (officers: Officer[]) =>
    // Sorts by officer's level and then their seniority
    [...officers].sort(
        (a, b) =>
            b.level - a.level || a.created_at.getTime() - b.created_at.getTime()
    );

export function todayAt(hour: number, minute = 0) {
    const d = new Date();
    d.setHours(hour, minute, 0, 0);

    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60_000);

    return local.toISOString().slice(0, 16);
}

export function todayFolder(local = true) {
    const d = new Date();
    if (!local) {
        // use UTC if you prefer server/cron consistency
        const y = d.getUTCFullYear();
        const m = String(d.getUTCMonth() + 1).padStart(2, "0");
        const day = String(d.getUTCDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export const toLocalInputValue = (d?: Date | string) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mi = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

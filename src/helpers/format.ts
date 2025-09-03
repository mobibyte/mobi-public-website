type FormattedDate = {
    month: string;
    year: number;
    day: number;
    shortMonth: string;
    time: string;
    weekDay: string;
    shortWeekDay: string;
};

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
    };
    return formatted;
}

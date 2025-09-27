import { createContext, useContext, type ReactNode } from "react";
import type { RSVP } from "@/types";
import { useGetUserRsvp } from "@/hooks/useRsvp";

const RsvpContext = createContext<RSVP[]>([]);

type RsvpProviderProps = {
    children: ReactNode;
};

export const RsvpProvider = ({ children }: RsvpProviderProps) => {
    const { data } = useGetUserRsvp();

    return (
        <RsvpContext.Provider value={data || []}>
            {children}
        </RsvpContext.Provider>
    );
};

export const useRsvpContext = () => {
    const context = useContext(RsvpContext);
    if (!context) {
        throw new Error("useRsvp must be used within a RsvpProvider");
    }
    return context;
};

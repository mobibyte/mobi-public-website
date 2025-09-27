import { createContext, useContext, type ReactNode } from "react";
import { useGetUserRsvp } from "@/hooks/useRsvp";
import type { RSVP } from "@/types";

type RSVPProps = {
  rsvp: RSVP[] | undefined;
  isPending: boolean;
};

const RsvpContext = createContext<RSVPProps | undefined>(undefined);

export const RsvpProvider = ({ children }: { children: ReactNode }) => {
  const { data: rsvp, isPending } = useGetUserRsvp();

  const values = {
    rsvp: rsvp,
    isPending: isPending,
  };

  return <RsvpContext.Provider value={values}>{children}</RsvpContext.Provider>;
};

export const useRsvpContext = () => {
  const context = useContext(RsvpContext);
  if (!context) {
    throw new Error("useRSVP must be used withing a RSVPProvider");
  }
  return context;
};

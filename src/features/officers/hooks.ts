import { useQuery, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "@/features/auth/hooks";
import { successToast, errorToast } from "@/components/Toasts";
import { createOfficer, updateOfficer, deleteOfficer } from "./api";
import { officerQueries } from "./queries";
import type { Officer } from "./types";

export function useGetAllOfficers() {
    return useSuspenseQuery(officerQueries.all());
}

export function useGetUserOfficer() {
    const { data: session } = useSession();
    const userId = session?.user.id ?? null;
    return useQuery(officerQueries.byUserId(userId));
}

export function useCreateOfficer() {
    return useMutation({
        mutationFn: async (officer: Officer) => createOfficer(officer),
        onSuccess: (officer) => {
            console.log("Successfully created", officer.id);
            successToast("Successfully created");
        },
        onError: (error) => {
            console.error(error);
            errorToast(error);
        },
    });
}

// Promote or demote officer
export function useUpdateOfficer() {
    return useMutation({
        mutationFn: async ({
            officer,
            level,
        }: {
            officer: Officer;
            level: 1 | 2 | 3;
        }) => updateOfficer(officer, level),
        onSuccess: () => {
            console.log("Successfully promoted");
            successToast("Successfully promoted");
        },
        onError: (error) => {
            console.error(error);
            errorToast(error);
        },
    });
}

export function useDeleteOfficer() {
    return useMutation({
        mutationFn: async (officer: Officer) => deleteOfficer(officer),
        onSuccess: () => {
            successToast("Successfully deleted");
            console.log("Successfully deleted");
        },
        onError: (error) => {
            console.error(error);
            errorToast(error);
        },
    });
}

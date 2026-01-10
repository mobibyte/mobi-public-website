import { toaster } from "@/components/ui/toaster";

export function successToast(title: string, description?: string) {
    toaster.create({
        title: title,
        description: description,
        type: "success",
    });
}

export function errorToast(error: Error, description?: string) {
    toaster.create({
        title: error.name,
        description: description ? description : error.message,
        type: "error",
    });
}

export function infoToast(title: string, description?: string) {
    toaster.create({
        title: title,
        description: description,
        type: "info",
    });
}

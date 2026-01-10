import { useEffect } from "react";
import { useNavigation } from "react-router";
import NProgress from "nprogress";

export function RouteProgress() {
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "loading") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [navigation.state]);

    return null;
}

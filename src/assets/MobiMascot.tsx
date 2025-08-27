import { Image } from "@chakra-ui/react";
import mobi from "./MOBI.png";
import { Reveal } from "@/components/ui/Reveal";

export function MobiMascot() {
    return (
        <Reveal delay={300}>
            <Image
                src={mobi}
                alt="MOBI Mascot"
                style={{ animation: "bob 2.4s ease-in-out infinite" }}
            />
        </Reveal>
    );
}

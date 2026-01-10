import { Grid, Heading } from "@chakra-ui/react";
import { OfficerCard } from "../components/OfficerCard";
import { useGetAllOfficers } from "../hooks";

export function OfficersPage() {
    const { data: officers } = useGetAllOfficers();

    return (
        <>
            <Heading
                fontSize={48}
                className="space-grotesk-500"
                textAlign={"center"}
                lineHeight={1}
                zIndex={2}
            >
                MOBI Officers
            </Heading>
            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))",
                }}
                gap="6"
            >
                {officers ? (
                    officers.map((officer) => {
                        return (
                            <OfficerCard
                                officer={officer}
                                key={officer.user_id}
                            />
                        );
                    })
                ) : (
                    <>No officers to display</>
                )}
            </Grid>
        </>
    );
}

import { Box, Grid, Text, Title } from "@mantine/core";
import { FC } from "react";
import { ProfileCard } from "./inner/ProfileCard";
import { PeopleData } from "../../../../types";
import { PilotSkeleton } from "../../../skeletons";

interface PilotsProps {
    data: Pick<PeopleData, "gender" | "height" | "mass" | "name">[];
    isLoading: boolean;
}

export const Pilots: FC<PilotsProps> = ({ data, isLoading }) => {
    if (isLoading) return <PilotSkeleton />;

    return (
        <Box>
            <Title order={4} weight={500} mb="md">
                Pilots
            </Title>
            {data.length > 0 ? (
                <Grid>
                    {data.map((pilot, index) => (
                        <ProfileCard
                            gender={pilot.gender}
                            height={pilot.height}
                            mass={pilot.mass}
                            name={pilot.name}
                            key={index}
                        />
                    ))}
                </Grid>
            ) : (
                <Text c="dimmed" size="sm">
                    No known pilots
                </Text>
            )}
        </Box>
    );
};

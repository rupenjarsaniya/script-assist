import { Box, Grid, Group, Skeleton, Text } from "@mantine/core";
import { FC } from "react";
import { ProfileCard } from "./inner/ProfileCard";
import { PeopleData } from "../../../../types";

interface PilotsProps {
    data: Pick<PeopleData, "gender" | "height" | "mass" | "name">[];
    isLoading: boolean;
}

export const Pilots: FC<PilotsProps> = ({ data, isLoading }) => {
    return (
        <Box>
            {isLoading ? (
                <Skeleton height={20} width="30%" mb="lg" />
            ) : (
                <Text weight={500} mb="xs">
                    Pilots
                </Text>
            )}

            {isLoading ? (
                <Group spacing="lg">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} height={300} width={250} radius="md" />
                    ))}
                </Group>
            ) : data.length > 0 ? (
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

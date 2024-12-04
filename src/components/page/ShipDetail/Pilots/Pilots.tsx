import { Box, Flex, Grid, Skeleton, Text } from "@mantine/core";
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
                <Flex gap={20}>
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} height={250} width={150} radius="md" />
                    ))}
                </Flex>
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

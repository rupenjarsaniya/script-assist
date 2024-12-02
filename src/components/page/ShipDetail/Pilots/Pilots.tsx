import { Box, Grid, Text } from "@mantine/core";
import { FC } from "react";
import { ProfileCard } from "./inner/ProfileCard";
import { PeopleData } from "../../../../types";

interface PilotsProps {
    data: Pick<PeopleData, "eye_color" | "gender" | "hair_color" | "height" | "mass" | "name" | "skin_color">[];
}

export const Pilots: FC<PilotsProps> = ({ data }) => {
    return (
        <Box>
            <Text weight={500} mb="xs">
                Pilots:
            </Text>
            <Grid>
                {data.length > 0 ? (
                    data.map((pilot, index) => (
                        <ProfileCard
                            eye_color={pilot.eye_color}
                            gender={pilot.gender}
                            hair_color={pilot.hair_color}
                            height={pilot.height}
                            mass={pilot.mass}
                            name={pilot.name}
                            skin_color={pilot.skin_color}
                            key={index}
                        />
                    ))
                ) : (
                    <Text color="dimmed">No known pilots</Text>
                )}
            </Grid>
        </Box>
    );
};

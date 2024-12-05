import { Box, Group, Skeleton, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { CharacterCard } from "../inner/CharacterCard";
import classes from "./Crew.module.scss";

interface CastProps {
    isLoading: boolean;
    directorName: string;
    producerName: string;
}

export const Crew: FC<CastProps> = ({ directorName, producerName, isLoading }) => {
    return (
        <Box>
            <Title order={3} weight={600} mb="lg">
                {isLoading ? <Skeleton height={20} width="30%" /> : "Crew"}
            </Title>
            <Group noWrap className={classes.overflow} spacing={40} align="start">
                {isLoading ? (
                    [...Array(2)].map((_, index) => (
                        <Stack align="center" key={index}>
                            <Skeleton height={150} width={150} style={{ borderRadius: 99 }} />
                            <Skeleton height={20} width={100} mt="xs" />
                        </Stack>
                    ))
                ) : (
                    <>
                        <CharacterCard name={directorName} designation="Director" />
                        <CharacterCard name={producerName} designation="Producer" />
                    </>
                )}
            </Group>
        </Box>
    );
};

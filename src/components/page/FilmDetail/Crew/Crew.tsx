import { Box, Group, Skeleton, Title } from "@mantine/core";
import { FC } from "react";
import { CharacterCard } from "../inner/CharacterCard";
import classes from "./Crew.module.scss";
import { CrewSkeleton } from "../../../skeletons";

interface CastProps {
    isLoading: boolean;
    directorName: string;
    producerName: string;
}

export const Crew: FC<CastProps> = ({ directorName, producerName, isLoading }) => {
    if (isLoading) return <CrewSkeleton classes={classes} />;

    return (
        <Box>
            <Title order={4} weight={500} mb="md">
                Crew
            </Title>
            <Group noWrap className={classes.overflow} spacing={40} align="start">
                <CharacterCard name={directorName} designation="Director" />
                <CharacterCard name={producerName} designation="Producer" />
            </Group>
        </Box>
    );
};

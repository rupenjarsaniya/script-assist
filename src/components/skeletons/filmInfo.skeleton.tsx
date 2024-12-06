import { Group, Paper, Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

interface FilmInfoSkeletonProps {
    classes: CSSModuleClasses;
}

export const FilmInfoSkeleton: FC<FilmInfoSkeletonProps> = ({ classes }) => {
    return (
        <Group px={100} align="center" spacing={40} h={"100%"}>
            <Paper className={classes.poster} radius="md" pos="relative">
                <Skeleton height={300} width={220} />
                <Skeleton height={20} mt="md" width="60%" />
            </Paper>
            <Stack className={classes.filmWrapper} spacing="lg">
                <Skeleton height={40} width="80%" />
                <Skeleton height={60} width="90%" />
                <Skeleton height={20} width="40%" />
            </Stack>
        </Group>
    );
};

import { clsx, Group, Image, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { FC } from "react";
import { FilmData } from "../../../../types";
import classes from "./FilmInfo.module.scss";

interface FilmInfoProps {
    isLoading: boolean;
    film: Pick<FilmData, "release_date" | "title" | "opening_crawl">;
}

export const FilmInfo: FC<FilmInfoProps> = ({ film, isLoading }) => {
    return (
        <Paper className={clsx([classes.bg, { [classes.bgImage]: !isLoading }])} mt="lg" h={400} pos="relative" radius="md">
            <Group px={100} align="center" spacing={40} h={"100%"}>
                <Paper className={classes.poster} radius="md" pos="relative">
                    {isLoading ? (
                        <Skeleton height={300} width={220} />
                    ) : (
                        <Image src="https://placehold.co/80x120" alt="Star Wars" width={220} height={300} />
                    )}
                    {isLoading ? (
                        <Skeleton height={20} mt="md" width="60%" />
                    ) : (
                        <Text
                            align="center"
                            mt="md"
                            c="white"
                            size="xs"
                            pos="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            bg="rgba(0, 0, 0, 0.5)"
                        >
                            Released on {moment(film?.release_date).format("MMMM DD, YYYY")}
                        </Text>
                    )}
                </Paper>
                <Stack className={classes.filmWrapper} spacing="lg">
                    {isLoading ? (
                        <Skeleton height={40} width="80%" />
                    ) : (
                        <Title order={1} weight={700} c="white">
                            {film?.title}
                        </Title>
                    )}
                    {isLoading ? (
                        <Skeleton height={60} width="90%" />
                    ) : (
                        <Text size="sm" c="white">
                            {film?.opening_crawl}
                        </Text>
                    )}
                    {isLoading ? (
                        <Skeleton height={20} width="40%" />
                    ) : (
                        <Text size="xs" c="dimmed">
                            3h 20m • Action, Thriller • UA
                        </Text>
                    )}
                </Stack>
            </Group>
        </Paper>
    );
};

import { clsx, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { FC } from "react";
import { FilmData } from "../../../../types";
import classes from "./FilmInfo.module.scss";
import { FilmInfoSkeleton } from "../../../skeletons";

interface FilmInfoProps {
    isLoading: boolean;
    film: Pick<FilmData, "release_date" | "title" | "opening_crawl"> | null;
}

export const FilmInfo: FC<FilmInfoProps> = ({ film, isLoading }) => {
    return (
        <Paper className={clsx([classes.bg, { [classes.bgImage]: !isLoading }])} mt="lg" h={400} pos="relative" radius="md">
            {isLoading ? (
                <FilmInfoSkeleton classes={classes} />
            ) : (
                <Group px={100} align="center" spacing={40} h={"100%"}>
                    <Paper className={classes.poster} radius="md" pos="relative">
                        <Image src="https://picsum.photos/200/300" alt="Star Wars" width={220} height={300} />
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
                    </Paper>
                    <Stack className={classes.filmWrapper} spacing="lg">
                        <Title order={1} weight={700} c="white">
                            {film?.title}
                        </Title>
                        <Text size="sm" c="white">
                            {film?.opening_crawl}
                        </Text>
                        <Text size="xs" c="dimmed">
                            3h 20m • Action, Thriller • UA
                        </Text>
                    </Stack>
                </Group>
            )}
        </Paper>
    );
};

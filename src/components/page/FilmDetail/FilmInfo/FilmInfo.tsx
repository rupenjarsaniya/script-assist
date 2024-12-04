import { Box, clsx, Flex, Image, Paper, Skeleton, Text, Title } from "@mantine/core";
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
        <Box className={clsx([classes.bg, { [classes.bgImage]: !isLoading }])} my="lg">
            <Flex px={100} align="center" gap={40} h={"100%"}>
                <Paper className={classes.poster} radius="md">
                    {isLoading ? (
                        <Skeleton height={300} width={220} />
                    ) : (
                        <Image src="https://placehold.co/80x120" alt="Star Wars" width={220} height={300} />
                    )}
                    {isLoading ? (
                        <Skeleton height={20} mt="md" width="60%" />
                    ) : (
                        <Text align="center" mt="md" c="white" size="xs" className={classes.releaseDate}>
                            Released on {moment(film?.release_date).format("MMMM DD, YYYY")}
                        </Text>
                    )}
                </Paper>
                <Box style={{ flex: 1 }}>
                    {isLoading ? (
                        <Skeleton height={40} width="80%" />
                    ) : (
                        <Title order={1} weight={700} c="white">
                            {film?.title}
                        </Title>
                    )}
                    {isLoading ? (
                        <Skeleton height={60} mt="md" width="90%" />
                    ) : (
                        <Text size="sm" mt="md" c="white">
                            {film?.opening_crawl}
                        </Text>
                    )}
                    {isLoading ? (
                        <Skeleton height={20} mt="sm" width="40%" />
                    ) : (
                        <Text size="xs" mt="sm" c="dimmed">
                            3h 20m • Action, Thriller • UA
                        </Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

import { Box, Flex, Grid, Skeleton, Text, Title } from "@mantine/core";
import { FC } from "react";
import { MovieCard } from "./inner/MovieCard";
import { FilmData } from "../../../../types";
import { useNavigate } from "react-router-dom";

interface FilmsProps {
    data: FilmData[];
    isLoading: boolean;
}

export const Films: FC<FilmsProps> = ({ data, isLoading }) => {
    const navigate = useNavigate();

    const handleSelectFilm = (film: FilmData) => {
        navigate(`/film-detail/${film.id}`);
    };

    return (
        <Box>
            {isLoading ? (
                <Skeleton height={20} width="30%" mb="lg" />
            ) : (
                <Title order={4} weight={500} mb="md">
                    Films
                </Title>
            )}

            {isLoading ? (
                <Flex gap={20}>
                    {[...Array(4)].map((_, index) => (
                        <Box key={index}>
                            <Skeleton height={250} width={200} radius="md" />
                            <Skeleton height={20} width={150} mt="xs" />
                            <Skeleton height={15} width={100} mt="xs" />
                        </Box>
                    ))}
                </Flex>
            ) : data.length > 0 ? (
                <Grid>
                    {data.map((film, index) => (
                        <MovieCard
                            episodeId={film.episode_id}
                            title={film.title}
                            onClick={() => handleSelectFilm(film)}
                            key={index}
                        />
                    ))}
                </Grid>
            ) : (
                <Text c="dimmed">No known films</Text>
            )}
        </Box>
    );
};

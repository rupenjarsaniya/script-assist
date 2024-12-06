import { Box, Grid, Text, Title } from "@mantine/core";
import { FC } from "react";
import { MovieCard } from "./inner/MovieCard";
import { FilmData } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { FilmsSkeleton } from "../../../skeletons";

interface FilmsProps {
    data: FilmData[];
    isLoading: boolean;
}

export const Films: FC<FilmsProps> = ({ data, isLoading }) => {
    const navigate = useNavigate();

    const handleSelectFilm = (film: FilmData) => {
        navigate(`/film-detail/${film.id}`);
    };

    if (isLoading) return <FilmsSkeleton />;

    return (
        <Box>
            <Title order={4} weight={500} mb="md">
                Films
            </Title>

            {data.length > 0 ? (
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
                <Text c="dimmed" size="sm">
                    No known films
                </Text>
            )}
        </Box>
    );
};

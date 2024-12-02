import { Box, Grid, Modal, Text } from "@mantine/core";
import { FC, useState } from "react";
import { MovieCard } from "./inner/MovieCard";
import { FilmDetail } from "./inner/FilmDetail";
import { FilmData } from "../../../../types";

interface FilmsProps {
    data: FilmData[];
}

export const Films: FC<FilmsProps> = ({ data }) => {
    const [opened, setOpened] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<FilmData | null>(null);

    const handleSelectFilm = (film: FilmData) => {
        setSelectedFilm(film);
        setOpened(true);
    };

    const handleClose = () => {
        setSelectedFilm(null);
        setOpened(false);
    };

    return (
        <Box>
            <Text weight={500} mb="xs">
                Films:
            </Text>
            <Grid>
                {data.length > 0 ? (
                    data.map((film, index) => (
                        <MovieCard
                            created={film.created}
                            director={film.director}
                            edited={film.edited}
                            episodeId={film.episode_id}
                            openingCrawl={film.opening_crawl}
                            producer={film.producer}
                            releaseDate={film.release_date}
                            title={film.title}
                            onClick={() => handleSelectFilm(film)}
                            key={index}
                        />
                    ))
                ) : (
                    <Text color="dimmed">No known films</Text>
                )}
            </Grid>

            {/* Film detail modal */}
            <Modal opened={opened} onClose={handleClose} title="Film Detail" size="xl" centered>
                {selectedFilm && <FilmDetail film={selectedFilm} />}
            </Modal>
        </Box>
    );
};

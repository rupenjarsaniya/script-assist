import { FC, useMemo } from "react";
import { Container, Card, Text, Badge, Title, Flex, Grid } from "@mantine/core";
import { useCustomQuery } from "../../../../../../hooks";
import { getPeopleById } from "../../../../../../services";
import { Loader } from "../../../../..";
import { getIdFromUrl } from "../../../../../../utils/fn";
import { CharacterCard } from "./inner/CharacterCard";
import { FilmData } from "../../../../../../types";

interface FilmDetailProps {
    film: FilmData;
}

export const FilmDetail: FC<FilmDetailProps> = ({ film }) => {
    const _film = useMemo(() => {
        if (!film) return null;

        const characterIds = film.characters.map((url: string) => getIdFromUrl(url));
        film.characterIds = characterIds;
        return film;
    }, [film]);

    const { data: characterData, isLoading: isCharacterLoading } = useCustomQuery({
        queryFn: async () => Promise.all(_film?.characterIds.map((id: string) => getPeopleById({ id })) || []),
        queryKey: ["getCharacters"],
        enabled: !!_film?.characterIds?.length,
    });

    const _characterData = useMemo(() => {
        if (!characterData) return [];

        return characterData.map((pilot) => pilot.data);
    }, [characterData]);

    if (!_film) {
        return (
            <Container>
                <Text align="center" color="red" weight={500}>
                    Failed to load resource details.
                </Text>
            </Container>
        );
    }

    return (
        <Container>
            {/* Film section */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Flex align="center" gap={10}>
                    <Text size="md" weight="bold">
                        {film?.title}
                    </Text>
                    <Badge color="blue" variant="light">
                        Released: {new Date(film?.release_date).toLocaleDateString()}
                    </Badge>
                </Flex>
                <Text size="sm" color="dimmed" mt="xs">
                    Episode: {film?.episode_id}
                </Text>
                <Text size="sm" mt="xs">
                    Directed by: {film?.director}
                </Text>
                <Text size="sm" mt="xs">
                    Produced by: {film?.producer}
                </Text>
                <Text mt="xs">{film?.opening_crawl}</Text>
            </Card>

            {/* Character section */}
            <Title order={4} mt="xl" mb="lg">
                Characters
            </Title>
            {isCharacterLoading ? (
                <Loader text="Fetch characters..." />
            ) : (
                <Grid>
                    {_characterData.length > 0 ? (
                        _characterData.map((character, index) => <CharacterCard name={character.name} key={index} />)
                    ) : (
                        <Text color="dimmed">No known characters</Text>
                    )}
                </Grid>
            )}
        </Container>
    );
};

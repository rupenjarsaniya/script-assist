import { Box, clsx, Divider, Flex, Image, Skeleton, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { FC, useMemo } from "react";
import classes from "./FilmDetail.module.scss";
import moment from "moment";
import { getIdFromUrl } from "../../utils/fn";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById } from "../../services";
import { CharacterCard } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

const FilmDetail: FC = () => {
    const { filmId } = useParams();
    const navigate = useNavigate();

    const { data: film, isLoading: isFilmLoading } = useCustomQuery({
        queryFn: getFilmById,
        queryKey: ["getFilmData"],
        variables: { id: filmId as string },
    });

    const _film = useMemo(() => {
        if (!film?.data) return null;

        const characterIds = film.data.characters.map((url: string) => getIdFromUrl(url));
        film.data.characterIds = characterIds;

        return film.data;
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

    const isLoading = useMemo(() => isFilmLoading || isCharacterLoading, [isFilmLoading, isCharacterLoading]);

    const handleBack = () => navigate(-1);

    return (
        <>
            {/* Back button */}
            <UnstyledButton onClick={handleBack}>
                <Flex align="center" gap={3}>
                    <IconArrowNarrowLeft size={30} stroke={1.5} />
                    <Text size="md">Back</Text>
                </Flex>
            </UnstyledButton>

            <Box className={clsx([classes.bg, { [classes.bgImage]: !isLoading }])} my="lg">
                <Flex px={100} align="center" style={{ height: "100%" }} gap={40}>
                    <Box style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
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
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: "rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                Released on {moment(_film?.release_date).format("MMMM DD, YYYY")}
                            </Text>
                        )}
                    </Box>
                    <Box style={{ flex: 1 }}>
                        {isLoading ? (
                            <Skeleton height={40} width="80%" />
                        ) : (
                            <Title order={1} weight={700} c="white">
                                {_film?.title}
                            </Title>
                        )}
                        {isLoading ? (
                            <Skeleton height={60} mt="md" width="90%" />
                        ) : (
                            <Text size="sm" mt="md" c="white">
                                {_film?.opening_crawl}
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

            <Box mt="xl">
                <Title order={3} weight={600} mb="lg">
                    {isLoading ? <Skeleton height={20} width="30%" /> : "Cast"}
                </Title>
                <Flex wrap="wrap" gap={20}>
                    {isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <Stack align="center" key={index}>
                                <Skeleton height={150} width={150} style={{ borderRadius: 99 }} />
                                <Skeleton height={20} width={100} mt="xs" />
                            </Stack>
                        ))
                    ) : _characterData.length > 0 ? (
                        _characterData.map((character, index) => <CharacterCard name={character.name} key={index} />)
                    ) : (
                        <Text c="dimmed">No known characters</Text>
                    )}
                </Flex>
            </Box>

            <Divider mt="xl" mb="xl" />

            <Box mt="xl">
                <Title order={3} weight={600} mb="lg">
                    {isLoading ? <Skeleton height={20} width="30%" /> : "Crew"}
                </Title>
                <Flex gap={20}>
                    {isLoading ? (
                        [...Array(2)].map((_, index) => (
                            <Stack align="center" key={index}>
                                <Skeleton height={150} width={150} style={{ borderRadius: 99 }} />
                                <Skeleton height={20} width={100} mt="xs" />
                            </Stack>
                        ))
                    ) : (
                        <>
                            <CharacterCard name={_film?.director} designation="Director" />
                            <CharacterCard name={_film?.producer} designation="Producer" />
                        </>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default FilmDetail;

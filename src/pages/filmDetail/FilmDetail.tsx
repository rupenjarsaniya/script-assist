import { Divider, Stack } from "@mantine/core";
import { FC, useMemo } from "react";
import { getIdFromUrl } from "../../utils/fn";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById } from "../../services";
import { BackButton, Cast, Crew, FilmInfo } from "../../components";
import { useParams } from "react-router-dom";

const FilmDetail: FC = () => {
    const { filmId } = useParams();

    const { data: filmData, isLoading: isFilmLoading } = useCustomQuery({
        queryFn: getFilmById,
        queryKey: ["getFilmDetail"],
        variables: { id: filmId as string },
    });

    const _filmData = useMemo(() => {
        if (!filmData?.data) return null;

        const characterIds = filmData.data.characters.map((url: string) => getIdFromUrl(url));
        filmData.data.characterIds = characterIds;

        return filmData.data;
    }, [filmData]);

    const { data: characterData, isLoading: isCharacterLoading } = useCustomQuery({
        queryFn: async () => Promise.all((_filmData?.characterIds || []).map((id: string) => getPeopleById({ id })) || []),
        queryKey: ["getCharacters"],
        enabled: !!_filmData?.characterIds?.length,
    });

    const characters = useMemo(() => (!characterData ? [] : characterData.map((pilot) => pilot.data.name)), [characterData]);

    const isLoading = useMemo(() => isFilmLoading || isCharacterLoading, [isFilmLoading, isCharacterLoading]);

    return (
        <Stack spacing="lg">
            <BackButton />

            <FilmInfo isLoading={isLoading} film={_filmData} />

            <Cast characters={characters} isLoading={isLoading} />

            <Divider />

            <Crew directorName={_filmData?.director || ""} producerName={_filmData?.producer || ""} isLoading={isLoading} />
        </Stack>
    );
};

export default FilmDetail;

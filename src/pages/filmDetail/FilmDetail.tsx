import { Divider } from "@mantine/core";
import { FC, useMemo } from "react";
import { getIdFromUrl } from "../../utils/fn";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById } from "../../services";
import { BackButton, Cast, Crew, FilmInfo } from "../../components";
import { useParams } from "react-router-dom";

const FilmDetail: FC = () => {
    const { filmId } = useParams();

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

    const _characterData = useMemo(() => (!characterData ? [] : characterData.map((pilot) => pilot.data)), [characterData]);

    const isLoading = useMemo(() => isFilmLoading || isCharacterLoading, [isFilmLoading, isCharacterLoading]);

    return (
        <>
            <BackButton />

            <FilmInfo isLoading={isLoading} film={_film} />

            <Cast characterData={_characterData} isLoading={isLoading} />

            <Divider mt="xl" mb="xl" />

            <Crew directorName={_film?.director} producerName={_film?.producer} isLoading={isLoading} />
        </>
    );
};

export default FilmDetail;

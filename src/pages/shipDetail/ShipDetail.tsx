import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Divider, Box } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById, getStarShipById } from "../../services";
import { BackButton, Films, Pilots, ShipDetailCard } from "../../components";
import { getIdFromUrl } from "../../utils/fn";

const ShipDetail: FC = () => {
    const { starshipId } = useParams();

    const { data: starshipData, isLoading: isStarshipLoading } = useCustomQuery({
        queryFn: getStarShipById,
        queryKey: ["getStarShipById"],
        variables: { id: String(starshipId) },
    });

    const _starshipData = useMemo(() => {
        if (!starshipData?.data) return null;

        Object.entries(starshipData.data).forEach(([key, value]) => {
            if (value === "unknown" || (typeof value === "string" && value.includes("n/a"))) {
                (starshipData.data as Record<string, any>)[key] = "0";
            }

            if (key === "pilots") {
                const pilotIds = value.map((url: string) => (url ? getIdFromUrl(url) : ""));
                (starshipData.data as Record<string, any>).pilotIds = pilotIds;
            }

            if (key === "films") {
                const filmIds = value.map((url: string) => (url ? getIdFromUrl(url) : ""));
                (starshipData.data as Record<string, any>).filmIds = filmIds;
            }
        });

        return starshipData.data;
    }, [starshipData]);

    const { data: pilotData, isLoading: isPilotLoading } = useCustomQuery({
        queryFn: async () => Promise.all((_starshipData?.pilotIds || []).map((id: string) => getPeopleById({ id })) || []),
        queryKey: ["getPilotData", starshipId],
        enabled: !!_starshipData?.pilots?.length,
    });

    const { data: filmData, isLoading: isFilmLoading } = useCustomQuery({
        queryFn: async () => Promise.all((_starshipData?.filmIds || []).map((id: string) => getFilmById({ id })) || []),
        queryKey: ["getFilmData", starshipId],
        enabled: !!_starshipData?.films?.length,
    });

    const _pilotData = useMemo(() => (!pilotData ? [] : pilotData.map((pilot) => pilot.data)), [pilotData]);

    const _filmData = useMemo(() => {
        if (!filmData) return [];

        filmData.forEach((film) => {
            const filmId = getIdFromUrl(film.data.url);
            film.data.id = filmId;
        });

        return filmData.map((film) => film.data);
    }, [filmData]);

    const hyperdriveConfig = useMemo(() => {
        if (!_starshipData) return { value: 0, color: "green" };
        if (_starshipData.hyperdrive_rating === "unknown") return { value: 0, color: "gray" };

        const value = Number(_starshipData.hyperdrive_rating.replace(".", ""));
        let color = "green";

        if (value >= 0 && value <= 10) {
            color = "red";
        } else if (value > 10 && value <= 50) {
            color = "yellow";
        }

        return { value, color };
    }, [_starshipData]);

    return (
        <Box>
            {/* Back button */}
            <BackButton />

            {/* Ship detail card */}
            <ShipDetailCard isLoading={isStarshipLoading} hyperdriveConfig={hyperdriveConfig} starshipData={_starshipData} />

            {/* Pilots section */}
            <Pilots data={_pilotData} isLoading={isStarshipLoading || isPilotLoading} />

            <Divider my="lg" />

            {/* Films section */}
            <Films data={_filmData} isLoading={isStarshipLoading || isFilmLoading} />
        </Box>
    );
};

export default ShipDetail;

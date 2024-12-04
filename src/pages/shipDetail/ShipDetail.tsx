import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Badge, Group, Divider, Title, Flex, Skeleton } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById, getStarShipById } from "../../services";
import { BackButton, Films, HyperdriveRating, Pilots, ShipDetailTable, Stat } from "../../components";
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
        queryFn: async () => Promise.all(_starshipData?.pilotIds.map((id: string) => getPeopleById({ id })) || []),
        queryKey: ["getPilotData"],
        enabled: !!_starshipData?.pilots?.length,
    });

    const { data: filmData, isLoading: isFilmLoading } = useCustomQuery({
        queryFn: async () => Promise.all(_starshipData?.filmIds.map((id: string) => getFilmById({ id })) || []),
        queryKey: ["getFilmData"],
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

    const isLoading = useMemo(
        () => isStarshipLoading || isPilotLoading || isFilmLoading,
        [isStarshipLoading, isPilotLoading, isFilmLoading],
    );

    return (
        <>
            {/* Back button */}
            <BackButton />

            {/* Ship detail card */}
            <Card shadow="sm" padding="lg" radius="md" my="lg" withBorder>
                <Group position="apart">
                    {isLoading ? (
                        <Skeleton width={100} height={40} />
                    ) : (
                        <Title order={2} weight={600}>
                            {_starshipData?.name}
                        </Title>
                    )}
                    <Flex gap={10}>
                        {isLoading ? (
                            <>
                                <Skeleton width={100} height={20} />
                                <Skeleton width={100} height={20} />
                                <Skeleton width={100} height={20} />
                            </>
                        ) : (
                            <>
                                <Badge color="green">Class: {_starshipData?.starship_class}</Badge>
                                <Badge color="blue">Hyperdrive: {_starshipData?.hyperdrive_rating}</Badge>
                                <Badge color="yellow">Speed: {_starshipData?.MGLT} MGLT</Badge>
                            </>
                        )}
                    </Flex>
                </Group>

                {isLoading ? (
                    <Skeleton width="100%" height={20} mt="sm" />
                ) : (
                    <Text size="sm" c="dimmed">
                        {_starshipData?.model} by {_starshipData?.manufacturer}
                    </Text>
                )}

                <Divider my="lg" />

                <Flex gap={20}>
                    <ShipDetailTable data={_starshipData} isLoading={isLoading} />
                    <Flex direction="column" gap={20} style={{ flex: 1 }}>
                        <HyperdriveRating
                            config={[hyperdriveConfig]}
                            icon="up"
                            value={_starshipData?.hyperdrive_rating || "0"}
                            isLoading={isLoading}
                        />
                        <Flex gap={20}>
                            <Stat
                                title="Cost in credits"
                                value={Number(_starshipData?.cost_in_credits || 0)}
                                isLoading={isLoading}
                            />
                            <Stat title="Passengers" value={Number(_starshipData?.passengers || 0)} isLoading={isLoading} />
                        </Flex>
                    </Flex>
                </Flex>
            </Card>

            {/* Pilots Section */}
            <Pilots data={_pilotData} isLoading={isLoading} />

            <Divider my="lg" />

            {/* Films Section */}
            <Films data={_filmData} isLoading={isLoading} />
        </>
    );
};

export default ShipDetail;

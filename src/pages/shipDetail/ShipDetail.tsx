import { FC, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Card, Text, Badge, Group, Divider, Title, Flex } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getFilmById, getPeopleById, getStarShipById } from "../../services";
import { Films, Loader, Pilots, ShipDetailTable } from "../../components";
import { getIdFromUrl } from "../../utils/fn";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

const ShipDetail: FC = () => {
    const { starshipId } = useParams();
    const navigate = useNavigate();

    const { data: starshipData, isLoading: isStarshipLoading } = useCustomQuery({
        queryFn: getStarShipById,
        queryKey: ["getStarShipById"],
        variables: { id: String(starshipId) },
    });

    const _starshipData = useMemo(() => {
        if (!starshipData?.data) return null;

        const pilotIds = starshipData.data.pilots.map((url: string) => (url ? getIdFromUrl(url) : ""));
        const filmIds = starshipData.data.films.map((url: string) => (url ? getIdFromUrl(url) : ""));

        starshipData.data.pilotIds = pilotIds;
        starshipData.data.filmIds = filmIds;

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

    const _pilotData = useMemo(() => {
        if (!pilotData) return [];

        return pilotData.map((pilot) => pilot.data);
    }, [pilotData]);

    const _filmData = useMemo(() => {
        if (!filmData) return [];

        return filmData.map((film) => film.data);
    }, [filmData]);

    if (isStarshipLoading || isPilotLoading || isFilmLoading) {
        return <Loader text="Loading..." />;
    }

    if (!_starshipData) {
        return (
            <Container>
                <Text align="center" color="red" weight={500}>
                    Failed to load resource details.
                </Text>
            </Container>
        );
    }

    return (
        <>
            {/* Back button */}
            <Link to="/">
                <Flex align="center" gap={3}>
                    <IconArrowNarrowLeft size={30} stroke={1.5} />
                    <Text size="md">Back</Text>
                </Flex>
            </Link>

            {/* Ship detail card */}
            <Card shadow="sm" padding="lg" radius="md" mt={10} withBorder>
                <Group position="apart" mb="lg">
                    <Title order={2}>{_starshipData.name}</Title>
                    <Badge color="blue" size="lg">
                        {_starshipData.starship_class}
                    </Badge>
                </Group>

                <Text color="dimmed" mb="lg">
                    {_starshipData.model} by {_starshipData.manufacturer}
                </Text>

                <Divider my="sm" />

                <ShipDetailTable data={_starshipData} />

                <Divider my="lg" />

                <Group position="apart" mt="lg">
                    <Pilots data={_pilotData} />
                    <Films data={_filmData} />
                </Group>
            </Card>
        </>
    );
};

export default ShipDetail;

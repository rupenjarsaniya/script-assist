import { Card, Group, Skeleton, Title, Badge, Divider, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { StarshipData } from "../../../../types";
import classes from "./ShipDetailCard.module.scss";
import { ShipDetailTable } from "./inner/ShipDetailTable";
import { HyperdriveRating } from "./inner/HyperdriveRating";
import { Stat } from "./inner/Stat";

interface ShipDetailCardProps {
    isLoading: boolean;
    starshipData: StarshipData | null;
    hyperdriveConfig: { color: string; value: number };
}

export const ShipDetailCard: FC<ShipDetailCardProps> = ({ isLoading, hyperdriveConfig, starshipData }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" my="lg" withBorder>
            <Group position="apart">
                {isLoading ? (
                    <Skeleton width={100} height={40} />
                ) : (
                    <Title order={2} weight={600}>
                        {starshipData?.name}
                    </Title>
                )}
                <Group>
                    {isLoading ? (
                        <>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={100} height={20} />
                            <Skeleton width={100} height={20} />
                        </>
                    ) : (
                        <>
                            <Badge color="green">Class: {starshipData?.starship_class}</Badge>
                            <Badge color="blue">Hyperdrive: {starshipData?.hyperdrive_rating}</Badge>
                            <Badge color="yellow">Speed: {starshipData?.MGLT} MGLT</Badge>
                        </>
                    )}
                </Group>
            </Group>

            {isLoading ? (
                <Skeleton width="100%" height={20} mt="sm" />
            ) : (
                <Text size="sm" c="dimmed">
                    {starshipData?.model} by {starshipData?.manufacturer}
                </Text>
            )}

            <Divider my="lg" />

            <Group spacing="lg">
                <ShipDetailTable data={starshipData} isLoading={isLoading} />
                <Stack className={classes.statWraper} spacing="lg">
                    <HyperdriveRating
                        config={[hyperdriveConfig]}
                        icon="up"
                        value={starshipData?.hyperdrive_rating || "0"}
                        isLoading={isLoading}
                    />
                    <Group spacing="lg">
                        <Stat
                            title="Cost in credits"
                            value={Number(starshipData?.cost_in_credits || 0)}
                            isLoading={isLoading}
                        />
                        <Stat title="Passengers" value={Number(starshipData?.passengers || 0)} isLoading={isLoading} />
                    </Group>
                </Stack>
            </Group>
        </Card>
    );
};

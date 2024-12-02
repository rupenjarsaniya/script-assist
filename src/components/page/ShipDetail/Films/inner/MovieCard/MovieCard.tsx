import { Badge, Button, Card, Divider, Grid, Group, Text, Title } from "@mantine/core";
import { FC } from "react";

interface MovieCardProps {
    title: string;
    episodeId: number;
    openingCrawl: string;
    director: string;
    producer: string;
    releaseDate: string;
    created: string;
    edited: string;
    onClick: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({
    title,
    episodeId,
    openingCrawl,
    director,
    producer,
    releaseDate,
    created,
    edited,
    onClick,
}) => {
    return (
        <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mb="xs">
                    <Title order={3}>
                        {title} (Episode {episodeId})
                    </Title>
                    <Badge color="blue" variant="light">
                        Released: {new Date(releaseDate).toLocaleDateString()}
                    </Badge>
                </Group>

                <Divider my="sm" />

                <Text size="sm" color="dimmed" mb="md">
                    {openingCrawl}
                </Text>

                <Group position="apart" mt="md" spacing="xs">
                    <Text weight={500}>Director: {director}</Text>
                    <Text weight={500}>Producer: {producer}</Text>
                </Group>

                <Divider my="sm" />

                <Group position="apart" mt="md">
                    <Text size="xs" color="dimmed">
                        Created: {new Date(created).toLocaleString()}
                    </Text>
                    <Text size="xs" color="dimmed">
                        Edited: {new Date(edited).toLocaleString()}
                    </Text>
                </Group>

                <Button mt="md" onClick={onClick}>
                    View Detail
                </Button>
            </Card>
        </Grid.Col>
    );
};

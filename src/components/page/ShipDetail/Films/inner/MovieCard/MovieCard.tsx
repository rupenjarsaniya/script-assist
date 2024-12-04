import { Box, Grid, Image, Text, Title, UnstyledButton } from "@mantine/core";
import { FC } from "react";

interface MovieCardProps {
    title: string;
    episodeId: number;
    onClick: () => void;
}

export const MovieCard: FC<MovieCardProps> = ({ title, episodeId, onClick }) => {
    return (
        <Grid.Col span={2}>
            <UnstyledButton onClick={onClick} w={"100%"}>
                <Image src="https://placehold.co/250x350.png" alt="Star Wars" radius="md" height={250} />
                <Title order={5} mt="md">
                    {title}
                </Title>
                <Text size="sm" c="dimmed">
                    Episode {episodeId}
                </Text>
            </UnstyledButton>
        </Grid.Col>
    );
};

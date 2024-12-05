import { Box, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { CharacterCard } from "../inner/CharacterCard";
import classes from "./Cast.module.scss";

interface CastProps {
    isLoading: boolean;
    characters: string[];
}

export const Cast: FC<CastProps> = ({ characters, isLoading }) => {
    return (
        <Box>
            <Title order={3} weight={600} mb="lg">
                {isLoading ? <Skeleton height={20} width="30%" /> : "Cast"}
            </Title>
            <Group noWrap className={classes.overflow} spacing={40} align="start">
                {isLoading ? (
                    [...Array(4)].map((_, index) => (
                        <Stack align="center" key={index}>
                            <Skeleton height={150} width={150} style={{ borderRadius: 99 }} />
                            <Skeleton height={20} width={100} mt="xs" />
                        </Stack>
                    ))
                ) : characters.length > 0 ? (
                    characters.map((character, index) => <CharacterCard name={character} key={index} />)
                ) : (
                    <Text c="dimmed" size="sm">
                        No known characters
                    </Text>
                )}
            </Group>
        </Box>
    );
};

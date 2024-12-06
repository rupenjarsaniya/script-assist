import { Box, Group, Text, Title } from "@mantine/core";
import { FC } from "react";
import { CharacterCard } from "../inner/CharacterCard";
import classes from "./Cast.module.scss";
import { CastSkeleton } from "../../../skeletons";

interface CastProps {
    isLoading: boolean;
    characters: string[];
}

export const Cast: FC<CastProps> = ({ characters, isLoading }) => {
    if (isLoading) return <CastSkeleton classes={classes} />;

    return (
        <Box>
            <Title order={4} weight={500} mb="md">
                Cast
            </Title>
            <Group noWrap className={classes.overflow} spacing={40} align="start">
                {characters.length > 0 ? (
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

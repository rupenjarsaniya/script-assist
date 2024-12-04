import { Box, Flex, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { PeopleData } from "../../../../types";
import { CharacterCard } from "../inner/CharacterCard";

interface CastProps {
    isLoading: boolean;
    characterData: Pick<PeopleData, "name">[];
}

export const Cast: FC<CastProps> = ({ characterData, isLoading }) => {
    return (
        <Box>
            <Title order={3} weight={600} mb="lg">
                {isLoading ? <Skeleton height={20} width="30%" /> : "Cast"}
            </Title>
            <Group spacing="lg">
                {isLoading ? (
                    [...Array(4)].map((_, index) => (
                        <Stack align="center" key={index}>
                            <Skeleton height={150} width={150} style={{ borderRadius: 99 }} />
                            <Skeleton height={20} width={100} mt="xs" />
                        </Stack>
                    ))
                ) : characterData.length > 0 ? (
                    characterData.map((character, index) => <CharacterCard name={character.name} key={index} />)
                ) : (
                    <Text c="dimmed">No known characters</Text>
                )}
            </Group>
        </Box>
    );
};

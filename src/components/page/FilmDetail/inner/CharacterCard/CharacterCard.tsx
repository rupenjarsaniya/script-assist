import { Box, Image, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { generateRandomNumber } from "../../../../../utils/fn";

interface CharacterCardProps {
    name: string;
    designation?: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({ name, designation }) => {
    const avatarId = generateRandomNumber(1, 10);

    return (
        <Stack align="center" spacing="sm">
            <Image
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarId}.png`}
                alt={name}
                width={100}
                height={100}
                radius={99}
            />
            <Box>
                <Text size="sm" align="center" truncate="end" w={100}>
                    {name}
                </Text>
                {designation && (
                    <Text size="sm" c="dimmed" align="center">
                        {designation}
                    </Text>
                )}
            </Box>
        </Stack>
    );
};

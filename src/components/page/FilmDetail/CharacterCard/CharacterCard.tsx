import { Box, Flex, Image, Text } from "@mantine/core";
import { FC } from "react";
import { generateRandomNumber } from "../../../../utils/fn";

interface CharacterCardProps {
    name: string;
    designation?: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({ name, designation }) => {
    const avatarId = generateRandomNumber(1, 10);

    return (
        <Flex align="center" direction="column" w={150} gap={10}>
            <Image
                src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarId}.png`}
                alt={name}
                width={100}
                height={100}
                radius={99}
            />
            <Box>
                <Text size="sm" align="center">
                    {name}
                </Text>
                {designation && (
                    <Text size="sm" c="dimmed" align="center">
                        {designation}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

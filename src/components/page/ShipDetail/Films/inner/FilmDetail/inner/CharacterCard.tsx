import { Flex, Grid, Image, Text } from "@mantine/core";
import { FC } from "react";

interface CharacterCardProps {
    name: string;
}

export const CharacterCard: FC<CharacterCardProps> = ({ name }) => {
    return (
        <Grid.Col span={3}>
            <Flex align="center" direction="column">
                <Image
                    src={"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                    alt={name}
                    width={100}
                    height={100}
                    radius={99}
                />
                <Text size="sm" mt="sm" align="center">
                    {name}
                </Text>
            </Flex>
        </Grid.Col>
    );
};

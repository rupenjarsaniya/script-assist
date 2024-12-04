import { Avatar, Box, Card, Flex, Grid, Text, Title } from "@mantine/core";
import { FC } from "react";
import { PeopleData } from "../../../../../../types";
import { generateRandomNumber } from "../../../../../../utils/fn";

interface ProfileCardProps extends Pick<PeopleData, "gender" | "height" | "mass" | "name"> {}

export const ProfileCard: FC<ProfileCardProps> = ({ gender, height, mass, name }) => {
    const avatarId = generateRandomNumber(1, 10);

    return (
        <Grid.Col span={3}>
            <Card withBorder padding="xl" radius="md">
                <Card.Section
                    h={140}
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
                    }}
                />
                <Avatar
                    src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarId}.png`}
                    size={80}
                    radius={80}
                    mx="auto"
                    mt={-30}
                />
                <Title order={5} mt="md" align="center">
                    {name}
                </Title>
                <Flex mt="md" justify="center" gap={30}>
                    <Box>
                        <Text ta="center" fz="sm" fw={500}>
                            {height}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Height
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="sm" fw={500}>
                            {mass}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Mass
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="sm" fw={500} transform="capitalize">
                            {gender}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Gender
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Grid.Col>
    );
};

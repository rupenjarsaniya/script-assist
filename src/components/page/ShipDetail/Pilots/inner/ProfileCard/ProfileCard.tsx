import { Avatar, Box, Card, Flex, Grid, Text } from "@mantine/core";
import { FC } from "react";
import { PeopleData } from "../../../../../../types";

const stats = [
    { value: "34K", label: "Followers" },
    { value: "187", label: "Follows" },
    { value: "1.6K", label: "Posts" },
];

interface ProfileCardProps
    extends Pick<PeopleData, "eye_color" | "gender" | "hair_color" | "height" | "mass" | "name" | "skin_color"> {}

export const ProfileCard: FC<ProfileCardProps> = ({ eye_color, gender, hair_color, height, mass, name, skin_color }) => {
    return (
        <Grid.Col span={4}>
            <Card withBorder padding="xl" radius="md">
                <Card.Section
                    h={140}
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
                    }}
                />
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    size={80}
                    radius={80}
                    mx="auto"
                    mt={-30}
                />
                <Text ta="center" fz="lg" fw={500} mt="sm">
                    {name}
                </Text>
                <Flex mt="md" justify="center" gap={30}>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
                            {hair_color}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Hair color
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
                            {eye_color}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Eye Color
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
                            {skin_color}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Skin color
                        </Text>
                    </Box>
                </Flex>
                <Flex mt="md" justify="center" gap={30}>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
                            {height}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Height
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
                            {mass}
                        </Text>
                        <Text ta="center" fz="xs" c="dimmed" lh={1}>
                            Mass
                        </Text>
                    </Box>
                    <Box>
                        <Text ta="center" fz="md" fw={500}>
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

import { Box, Center, Flex, Paper, Skeleton, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { FC } from "react";
import { generateRandomNumber } from "../../../../../../utils/fn";
import classes from "./Stat.module.scss";

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

interface StatProps {
    title: string;
    value: number;
    isLoading: boolean;
}

export const Stat: FC<StatProps> = ({ title, value, isLoading }) => {
    const percentage = generateRandomNumber(-20, 20);
    const Icon = percentage > 0 ? icons.up : icons.down;

    return (
        <Paper withBorder p="md" radius="md" className={classes.root}>
            {isLoading || Boolean(value) ? (
                <>
                    <Flex gap={20}>
                        {isLoading ? (
                            <Stack>
                                <Skeleton height={20} width={100} />
                                <Skeleton height={40} width={200} />
                            </Stack>
                        ) : (
                            <Box>
                                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                                    {title}
                                </Text>
                                <Text fw={700} fz="xl">
                                    {value}
                                </Text>
                            </Box>
                        )}
                        {isLoading ? (
                            <Skeleton width={38} height={38} radius="md" />
                        ) : (
                            <ThemeIcon
                                color="gray"
                                variant="light"
                                style={{
                                    color: percentage > 0 ? "teal" : "red",
                                }}
                                size={38}
                                radius="md"
                            >
                                <Icon size={28} stroke={1.5} />
                            </ThemeIcon>
                        )}
                    </Flex>
                    {isLoading ? (
                        <Skeleton width={200} height={20} mt="md" />
                    ) : (
                        <Text c="dimmed" fz="sm" mt="md">
                            <Text component="span" c={percentage > 0 ? "teal" : "red"} fw={700}>
                                {percentage}%
                            </Text>{" "}
                            compared to last month
                        </Text>
                    )}
                </>
            ) : (
                <Center maw={400} h={100}>
                    <Text c="dimmed" size="sm">
                        No data available
                    </Text>
                </Center>
            )}
        </Paper>
    );
};

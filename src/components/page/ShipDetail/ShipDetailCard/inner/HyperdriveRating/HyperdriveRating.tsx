import { Box, Center, Group, Paper, RingProgress, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { FC } from "react";
import { HyperdriveRatingSkeleton } from "../../../../../skeletons";

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

interface HyperdriveRatingProps {
    config: { value: number; color: string }[];
    icon: "up" | "down";
    value: string;
    isLoading: boolean;
}

export const HyperdriveRating: FC<HyperdriveRatingProps> = ({ config, icon, value, isLoading }) => {
    const Icon = icons[icon];

    return (
        <Paper withBorder radius="md" p="xs" key={"stat.label"}>
            {isLoading ? (
                <HyperdriveRatingSkeleton />
            ) : (
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={config}
                        label={
                            <Center>
                                <Icon size={20} stroke={1.5} />
                            </Center>
                        }
                    />
                    <Box>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                            Hyperdrive Rating
                        </Text>
                        <Text fw={700} size="xl">
                            {value === "unknown" ? "N/A" : value}
                        </Text>
                    </Box>
                </Group>
            )}
        </Paper>
    );
};

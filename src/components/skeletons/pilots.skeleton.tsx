import { Box, Group, Skeleton } from "@mantine/core";
import { FC } from "react";

export const PilotSkeleton: FC = () => {
    return (
        <Box>
            <Skeleton height={20} width="30%" mb="lg" />
            <Group spacing="lg">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height={300} width={250} radius="md" />
                ))}
            </Group>
        </Box>
    );
};

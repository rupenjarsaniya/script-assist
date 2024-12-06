import { Box, Group, Skeleton } from "@mantine/core";
import { FC } from "react";

export const FilmsSkeleton: FC = () => {
    return (
        <Box>
            <Skeleton height={20} width="30%" mb="lg" />
            <Group spacing="lg">
                {[...Array(4)].map((_, index) => (
                    <Box key={index}>
                        <Skeleton height={250} width={200} radius="md" />
                        <Skeleton height={20} width={150} mt="xs" />
                        <Skeleton height={15} width={100} mt="xs" />
                    </Box>
                ))}
            </Group>
        </Box>
    );
};

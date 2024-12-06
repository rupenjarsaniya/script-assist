import { Group, Skeleton, Stack } from "@mantine/core";

export const HyperdriveRatingSkeleton = () => {
    return (
        <Group>
            <Skeleton width={80} height={80} radius="md" />
            <Stack>
                <Skeleton width={80} height={16} radius="md" />
                <Skeleton width={80} height={32} radius="md" />
            </Stack>
        </Group>
    );
};

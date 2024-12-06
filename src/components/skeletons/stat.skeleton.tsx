import { Flex, Skeleton, Stack, Text } from "@mantine/core";

export const StatSkeleton = () => {
    return (
        <>
            <Flex gap={20}>
                <Stack>
                    <Skeleton height={20} width={100} />
                    <Skeleton height={40} width={200} />
                </Stack>
                <Skeleton width={38} height={38} radius="md" />
            </Flex>
            <Skeleton width={200} height={20} mt="md" />
        </>
    );
};

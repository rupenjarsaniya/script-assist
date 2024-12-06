import { Group, Skeleton } from "@mantine/core";

export const ShipDetailCardSkeleton = () => {
    return (
        <>
            <Group position="apart">
                <Skeleton width={100} height={40} />
                <Group>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={20} />
                </Group>
            </Group>
            <Skeleton width="100%" height={20} mt="sm" />
        </>
    );
};

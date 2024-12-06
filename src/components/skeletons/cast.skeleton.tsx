import { Box, Group, Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

interface CastSkeletonProps {
    classes: CSSModuleClasses;
}

export const CastSkeleton: FC<CastSkeletonProps> = ({ classes }) => {
    return (
        <Box>
            <Skeleton height={20} width="30%" mb="lg" />
            <Group noWrap className={classes.overflow} spacing={40} align="start">
                {[...Array(4)].map((_, index) => (
                    <Stack align="center" key={index}>
                        <Skeleton height={100} width={100} className={classes.fullRadius} />
                        <Skeleton height={20} width={100} mt="xs" />
                    </Stack>
                ))}
            </Group>
        </Box>
    );
};

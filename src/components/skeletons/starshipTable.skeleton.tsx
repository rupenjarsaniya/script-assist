import { Skeleton } from "@mantine/core";

export const StarshipTableSkeleton = () => {
    return Array.from({ length: 10 }).map((_, index) => (
        <tr key={index}>
            <td>
                <Skeleton height={30} width="80%" />
            </td>
            <td>
                <Skeleton height={30} width="60%" />
            </td>
            <td>
                <Skeleton height={30} width="50%" />
            </td>
            <td>
                <Skeleton height={30} width="50%" />
            </td>
            <td>
                <Skeleton height={30} width="70%" />
            </td>
            <td>
                <Skeleton height={30} width="70%" />
            </td>
        </tr>
    ));
};

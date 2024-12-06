import { Skeleton } from "@mantine/core";

export const ShipDetailTableSkeleton = () => {
    return [...Array(6)].map((_, index) => (
        <tr key={index}>
            <td>
                <Skeleton width={100} height={20} />
            </td>
            <td>
                <Skeleton width={100} height={20} />
            </td>
        </tr>
    ));
};

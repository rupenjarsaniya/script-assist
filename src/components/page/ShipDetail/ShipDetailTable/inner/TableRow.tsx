import { Skeleton, Text } from "@mantine/core";
import { FC } from "react";

interface TableRowProps {
    title: string;
    value: string;
    isLoading: boolean;
}

export const TableRow: FC<TableRowProps> = ({ title, value, isLoading }) => {
    if (isLoading) {
        return (
            <tr>
                <td>
                    <Skeleton width={100} height={20} />
                </td>
                <td>
                    <Skeleton width={100} height={20} />
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>
                <Text weight={500}>{title}</Text>
            </td>
            <td>{value}</td>
        </tr>
    );
};

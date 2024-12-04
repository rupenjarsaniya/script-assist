import { Text } from "@mantine/core";
import { FC } from "react";

interface TableRowProps {
    title: string;
    value: string;
}

export const TableRow: FC<TableRowProps> = ({ title, value }) => {
    return (
        <tr>
            <td>
                <Text weight={500}>{title}</Text>
            </td>
            <td>{value}</td>
        </tr>
    );
};

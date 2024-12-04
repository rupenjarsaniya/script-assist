import { Table } from "@mantine/core";
import { FC } from "react";
import { StarshipData } from "../../../../types";
import { TableRow } from "./inner/TableRow";

interface ShipDetailTableProps {
    data: Pick<
        StarshipData,
        "length" | "max_atmosphering_speed" | "crew" | "cargo_capacity" | "consumables" | "MGLT"
    > | null;
    isLoading: boolean;
}

export const ShipDetailTable: FC<ShipDetailTableProps> = ({ data, isLoading }) => {
    return (
        <Table highlightOnHover withColumnBorders={false} withBorder={false} style={{ flex: 1 }}>
            <tbody>
                <TableRow title="Length" value={`${data?.length} meters`} isLoading={isLoading} />
                <TableRow
                    title="Max Atmosphering Speed"
                    value={`${data?.max_atmosphering_speed} km/h`}
                    isLoading={isLoading}
                />
                <TableRow title="Crew" value={data?.crew || "0"} isLoading={isLoading} />
                <TableRow title="Cargo Capacity" value={`${data?.cargo_capacity || "0"} kg`} isLoading={isLoading} />
                <TableRow title="Consumables" value={data?.consumables || "0"} isLoading={isLoading} />
                <TableRow title="MGLT" value={data?.MGLT || "0"} isLoading={isLoading} />
            </tbody>
        </Table>
    );
};

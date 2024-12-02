import { Table, Text } from "@mantine/core";
import { FC } from "react";
import { StarshipData } from "../../../../types";
import { TableRow } from "./inner/TableRow";

interface ShipDetailTableProps {
    data: Pick<
        StarshipData,
        | "length"
        | "cost_in_credits"
        | "max_atmosphering_speed"
        | "crew"
        | "passengers"
        | "cargo_capacity"
        | "consumables"
        | "hyperdrive_rating"
        | "MGLT"
        | "created"
        | "edited"
    >;
}

export const ShipDetailTable: FC<ShipDetailTableProps> = ({ data }) => {
    return (
        <Table highlightOnHover withColumnBorders>
            <tbody>
                <TableRow title="Length" value={`${data.length} meters`} />
                <TableRow
                    title="Cost in Credits"
                    value={data.cost_in_credits === "unknown" ? "Unknown" : data.cost_in_credits}
                />
                <TableRow title="Max Atmosphering Speed" value={`${data.max_atmosphering_speed} km/h`} />
                <TableRow title="Crew" value={data.crew} />
                <TableRow title="Passengers" value={data.passengers} />
                <TableRow title="Cargo Capacity" value={`${data.cargo_capacity} kg`} />
                <TableRow title="Consumables" value={data.consumables} />
                <TableRow title="Hyperdrive Rating" value={data.hyperdrive_rating} />
                <TableRow title="MGLT" value={data.MGLT} />
                <TableRow title="Created" value={new Date(data.created).toLocaleString()} />
                <TableRow title="Edited" value={new Date(data.edited).toLocaleString()} />
            </tbody>
        </Table>
    );
};

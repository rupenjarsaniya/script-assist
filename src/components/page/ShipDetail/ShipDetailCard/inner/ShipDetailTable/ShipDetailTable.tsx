import { Table } from "@mantine/core";
import { FC } from "react";
import { StarshipData } from "../../../../../../types";
import { TableRow } from "./inner/TableRow";
import classes from "./ShipDetailTable.module.scss";
import moment from "moment";
import { ShipDetailTableSkeleton } from "../../../../../skeletons";

interface ShipDetailTableProps {
    data: Pick<
        StarshipData,
        "length" | "max_atmosphering_speed" | "crew" | "cargo_capacity" | "consumables" | "created"
    > | null;
    isLoading: boolean;
}

export const ShipDetailTable: FC<ShipDetailTableProps> = ({ data, isLoading }) => {
    return (
        <Table highlightOnHover={!isLoading} withColumnBorders={false} withBorder={false} className={classes.root}>
            <tbody>
                {isLoading ? (
                    <ShipDetailTableSkeleton />
                ) : (
                    <>
                        <TableRow title="Length" value={`${data?.length} meters`} />
                        <TableRow title="Max Atmosphering Speed" value={`${data?.max_atmosphering_speed} km/h`} />
                        <TableRow title="Crew" value={data?.crew || "0"} />
                        <TableRow title="Cargo Capacity" value={`${data?.cargo_capacity || "0"} kg`} />
                        <TableRow title="Consumables" value={data?.consumables || "0"} />
                        <TableRow title="Created At" value={moment(data?.created).format("MMMM do YYYY, hh:mm A") || "0"} />
                    </>
                )}
            </tbody>
        </Table>
    );
};

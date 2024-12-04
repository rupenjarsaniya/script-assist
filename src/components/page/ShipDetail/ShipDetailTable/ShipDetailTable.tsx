import { Skeleton, Table } from "@mantine/core";
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
        <Table highlightOnHover={isLoading} withColumnBorders={false} withBorder={false} style={{ flex: 1 }}>
            <tbody>
                {isLoading ? (
                    [...Array(6)].map((_, index) => (
                        <tr>
                            <td>
                                <Skeleton width={100} height={20} />
                            </td>
                            <td>
                                <Skeleton width={100} height={20} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <>
                        <TableRow title="Length" value={`${data?.length} meters`} />
                        <TableRow title="Max Atmosphering Speed" value={`${data?.max_atmosphering_speed} km/h`} />
                        <TableRow title="Crew" value={data?.crew || "0"} />
                        <TableRow title="Cargo Capacity" value={`${data?.cargo_capacity || "0"} kg`} />
                        <TableRow title="Consumables" value={data?.consumables || "0"} />
                        <TableRow title="MGLT" value={data?.MGLT || "0"} />
                    </>
                )}
            </tbody>
        </Table>
    );
};

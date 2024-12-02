import { Button, Table } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { StarshipData } from "../../../types";

interface StarshipTableProps {
    data: StarshipData[];
}

export const StarshipTable: FC<StarshipTableProps> = ({ data }) => {
    return (
        <Table striped highlightOnHover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Crew</th>
                    <th>Hyperdrive Rating</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: StarshipData) => (
                    <tr key={item.url}>
                        <td>{item.name}</td>
                        <td>{item.model}</td>
                        <td>{item.crew}</td>
                        <td>{item.hyperdrive_rating}</td>
                        <td>{new Date(item.created).toLocaleDateString()}</td>
                        <td>
                            <Button variant="default" size="xs">
                                <Link to={`/starship/${item.id}`}>View</Link>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

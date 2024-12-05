import { useState, useMemo } from "react";
import { Text, Title } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getAllStarShips } from "../../services/api";
import { StarshipData } from "../../types";
import { StarshipTable } from "../../components";

const LIMIT = 10; // NOTE: Number of items per page (We can't change this value because SWAPI doesn't support pagination)

const Landing = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useCustomQuery({
        queryFn: getAllStarShips,
        queryKey: ["getAllStarShips"],
        variables: { page },
    });

    const totalPages = useMemo(() => Math.ceil((data?.data?.count || 0) / LIMIT), [data]);

    const filteredData = useMemo(() => {
        if (!data?.data?.results) return [];

        const results = data.data.results.map((item: StarshipData) => {
            const url = item.url.split("/");
            const id = url[url.length - 2];

            return {
                name: item.name,
                model: item.model,
                hyperdrive_rating: item.hyperdrive_rating === "unknown" ? "0" : item.hyperdrive_rating,
                length: item.length,
                created: item.created,
                id,
            };
        });

        return results;
    }, [data]);

    return (
        <>
            {/* Title */}
            <Title weight={700}>Starships List</Title>

            {/* Description */}
            <Text size="xs" mb="lg" c="dimmed">
                Starships are advanced spacecraft designed for interstellar travel, exploration, and combat. They play a
                critical role in the Star Wars universe, connecting distant planets, facilitating trade, and serving as
                powerful tools in galactic conflicts. Each starship comes with unique characteristics such as size, speed,
                weaponry, and hyperdrive capabilities, making them suited for various purposes.
            </Text>

            {/* StarshipTable component */}
            <StarshipTable data={filteredData} totalPages={totalPages} page={page} setPage={setPage} isLoading={isLoading} />
        </>
    );
};

export default Landing;

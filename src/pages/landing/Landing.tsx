import { useState, useMemo } from "react";
import { Input, Select, Pagination, Title, Flex, Button } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getAllStarShips } from "../../services/api";
import { StarshipData } from "../../types";
import { Loader, StarshipTable, TableSort } from "../../components";

const LIMIT = 10;

const Landing = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useCustomQuery({
        queryFn: getAllStarShips,
        queryKey: ["getAllStarShips"],
        variables: { page },
    });

    const totalPages = useMemo(() => Math.ceil((data?.data?.count || 0) / LIMIT), [data]);

    const filteredData = useMemo(() => {
        if (!data?.data?.results) return null;

        const results = data.data.results.map((item: StarshipData) => {
            const url = item.url.split("/");
            const id = url[url.length - 2];

            return {
                name: item.name,
                model: item.model,
                hyperdrive_rating: item.hyperdrive_rating,
                length: item.length,
                id,
            };
        });

        return results;
    }, [data]);

    const handleClearFilters = () => {
        setSearch("");
        setFilter("");
        setSort("");
    };

    const isFilterButtonDisabled = !search && !filter && !sort;

    // const filteredData = [
    //     {
    //         name: "CR90 corvette",
    //         model: "CR90 corvette",
    //         hyperdrive_rating: "2.0",
    //         length: "120000",
    //         id: "2",
    //         created: "2014-12-08T16:36:50.509000Z",
    //     },
    //     {
    //         name: "Star Destroyer",
    //         model: "Imperial I-class Star Destroyer",
    //         hyperdrive_rating: "2.0",
    //         length: "1,20,000",
    //         id: "2",
    //         created: "2014-01-02T16:36:50.509000Z",
    //     },
    //     {
    //         name: "Sentinel-class landing craft",
    //         model: "Sentinel-class landing craft",
    //         hyperdrive_rating: "1.0",
    //         length: "28.0",
    //         id: "2",
    //         created: "2014-12-04T16:36:50.509000Z",
    //     },
    //     {
    //         name: "Death Star",
    //         model: "DS-1 Orbital Battle Station",
    //         hyperdrive_rating: "4.0",
    //         length: "4.0",
    //         id: "2",
    //         created: "2014-12-06T16:36:50.509000Z",
    //     },
    //     {
    //         name: "Millennium Falcon",
    //         model: "YT-1300 light freighter",
    //         hyperdrive_rating: "0.5",
    //         length: "0.5",
    //         id: "2",
    //         created: "2014-09-21T16:36:50.509000Z",
    //     },
    //     {
    //         name: "Y-wing",
    //         model: "BTL Y-wing",
    //         hyperdrive_rating: "1.0",
    //         length: "1.0",
    //         id: "2",
    //         created: "2014-10-23T16:36:50.509000Z",
    //     },
    //     {
    //         name: "X-wing",
    //         model: "T-65 X-wing",
    //         hyperdrive_rating: "1.0",
    //         length: "1.0",
    //         id: "2",
    //         created: "2014-11-01T16:36:50.509000Z",
    //     },
    // ];

    return (
        <>
            <Title align="center" weight={700} mb="lg">
                Starships List
            </Title>

            <TableSort data={filteredData} totalPages={totalPages} page={page} setPage={setPage} isLoading={isLoading} />
        </>
    );
};

export default Landing;

import { useState, useMemo } from "react";
import { Input, Select, Pagination, Title, Flex, Button } from "@mantine/core";
import { useCustomQuery } from "../../hooks";
import { getAllStarShips } from "../../services/api";
import { StarshipData } from "../../types";
import { Loader, StarshipTable } from "../../components";
import s from "./Landing.module.scss";

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

        let results = data.data.results.map((item: StarshipData) => {
            const url = item.url.split("/");
            const id = url[url.length - 2];
            return { ...item, id };
        });

        // Search by name
        if (search) {
            results = results.filter((item: StarshipData) => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Filter by specific criteria
        if (filter === "hyperdrive") {
            results = results.filter((item: StarshipData) => parseFloat(item.hyperdrive_rating) <= 2.0);
        } else if (filter === "crew") {
            results = results.filter((item: StarshipData) => parseInt(item.crew, 10) > 100);
        }

        // Sort results
        if (sort === "created") {
            results.sort(
                (a: StarshipData, b: StarshipData) => new Date(a.created).getTime() - new Date(b.created).getTime(),
            );
        } else if (sort === "edited") {
            results.sort((a: StarshipData, b: StarshipData) => new Date(a.edited).getTime() - new Date(b.edited).getTime());
        } else if (sort === "A-Z") {
            results.sort((a: StarshipData, b: StarshipData) => a.name.localeCompare(b.name));
        } else if (sort === "Z-A") {
            results.sort((a: StarshipData, b: StarshipData) => b.name.localeCompare(a.name));
        }

        return results;
    }, [data, search, filter, sort]);

    const handleClearFilters = () => {
        setSearch("");
        setFilter("");
        setSort("");
    };

    const isFilterButtonDisabled = !search && !filter && !sort;

    return (
        <>
            <Title align="center" weight={700} mb="lg">
                Starships List
            </Title>

            {isLoading ? (
                <Loader text="Please wait while we fetch the data..." />
            ) : (
                <Flex gap={20} direction="column">
                    <Flex align="center" gap={10}>
                        <Input
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={s.input}
                        />
                        <Select
                            data={[
                                { value: "hyperdrive", label: "Hyperdrive Rating <= 2.0" },
                                { value: "crew", label: "Crew > 100" },
                            ]}
                            placeholder="Filter by"
                            value={filter}
                            onChange={(value) => setFilter(value || "")}
                        />
                        <Select
                            data={[
                                { value: "created", label: "Sort by Created Date" },
                                { value: "edited", label: "Sort by Edited Date" },
                                { value: "A-Z", label: "Sort A-Z" },
                                { value: "Z-A", label: "Sort Z-A" },
                            ]}
                            placeholder="Sort by"
                            value={sort}
                            onChange={(value) => setSort(value || "")}
                        />
                        <Button onClick={handleClearFilters} disabled={isFilterButtonDisabled}>
                            Clear Filters
                        </Button>
                    </Flex>
                    <StarshipTable data={filteredData} />
                    <Pagination total={totalPages} value={page} onChange={(p) => setPage(p)} align="center" />
                </Flex>
            )}
        </>
    );
};

export default Landing;

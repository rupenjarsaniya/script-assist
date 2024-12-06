import { FC, useState, useMemo, useCallback, useEffect, ChangeEvent, ReactNode } from "react";
import { IconFilter, IconFilterOff, IconSearch } from "@tabler/icons-react";
import { Center, Pagination, Table, Text, TextInput, UnstyledButton, Button, Paper, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import moment from "moment";
import { FilterInput } from "./inner/FilterInput";
import { Th } from "./inner/Th";
import classes from "./StarshipTable.module.scss";
import { StarshipTableSkeleton } from "../../../skeletons";

interface RowData {
    name: string;
    model: string;
    hyperdrive_rating: string;
    length: string;
    id: string;
    created: string;
}

function filterData(data: RowData[], filters: Record<string, string>, globalSearch: string): RowData[] {
    const query = globalSearch.toLowerCase().trim();

    return data.filter((item) => {
        const matchesSearch = Object.entries(item).some(([key, value]) => {
            // Special handling for the "created" field
            if (key === "created") {
                const formattedDate = moment(value).format("DD MMM YYYY").toLowerCase();
                return formattedDate.includes(query);
            }

            // Handle numeric fields like "length" by converting to a simple string
            if (key === "length") {
                const normalizedLength = value.toString().replace(/,/g, "").toLowerCase();
                return normalizedLength.includes(query);
            }

            // General case for other fields
            return value.toLowerCase().includes(query);
        });

        const matchesFilters = Object.entries(filters).every(([key, filterValue]) => {
            if (!filterValue) return true;
            return item[key as keyof RowData]?.toLowerCase().includes(filterValue.toLowerCase());
        });

        return matchesSearch && matchesFilters;
    });
}

function sortData(data: RowData[], sortBy: keyof RowData | null, reversed: boolean) {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
        const comparison = a[sortBy].toString().localeCompare(b[sortBy].toString());
        return reversed ? -comparison : comparison;
    });
}

function highlightText(text: string, query: string): ReactNode {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => (part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part));
}

interface StarshipTableProps {
    data: RowData[];
    isLoading: boolean;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

export const StarshipTable: FC<StarshipTableProps> = ({ data, isLoading, totalPages, page, setPage }) => {
    const [globalSearch, setGlobalSearch] = useState("");
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [displayFilters, setDisplayFilters] = useState(false);
    const [filters, setFilters] = useState<Record<string, string>>({
        name: "",
        model: "",
        hyperdrive_rating: "",
        length: "",
    });

    const filteredData = useMemo(
        () => (!data ? null : filterData(data, filters, globalSearch)),
        [data, filters, globalSearch],
    );

    const sortedData = useMemo(
        () => (!filteredData ? [] : sortData(filteredData, sortBy, reverseSortDirection)),
        [filteredData, sortBy, reverseSortDirection],
    );

    const rows = sortedData.map((row) => (
        <tr key={row.id}>
            <td width="20%">
                <Text w={200} truncate="end">
                    {highlightText(row.name, globalSearch)}
                </Text>
            </td>
            <td width="25%">
                <Text w={250} truncate="end">
                    {highlightText(row.model, globalSearch)}
                </Text>
            </td>
            <td width="15%">{highlightText(row.hyperdrive_rating, globalSearch)}</td>
            <td width="15%">{highlightText(row.length.replace(/[,]/g, ""), globalSearch)}</td>
            <td width="15%">{highlightText(moment(row.created).format("DD MMM YYYY"), globalSearch)}</td>
            <td width="10%">
                <Button
                    size="xs"
                    variant="light"
                    component={Link}
                    to={`/starship/${row.id}`}
                    classNames={{ label: classes.label }}
                >
                    View
                </Button>
            </td>
        </tr>
    ));

    const setSorting = useCallback(
        (field: keyof RowData) => {
            setReverseSortDirection((prev) => (field === sortBy ? !prev : false));
            setSortBy(field);
        },
        [sortBy],
    );

    const handleGlobalSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setGlobalSearch(event.currentTarget.value);
    }, []);

    const handleFilterChange = useCallback((key: keyof RowData, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }, []);

    const clearFilter = useCallback((key: keyof RowData) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: "" }));
    }, []);

    useEffect(() => {
        if (!displayFilters) {
            setFilters({
                name: "",
                model: "",
                hyperdrive_rating: "",
                length: "",
            });
        }
    }, [displayFilters]);

    return (
        <Paper radius="md" withBorder p="md">
            <Group align="center" position="apart" mb="md">
                <TextInput
                    placeholder="Search"
                    icon={<IconSearch size={16} stroke={1.5} />}
                    value={globalSearch}
                    onChange={handleGlobalSearchChange}
                    w={300}
                />
                <UnstyledButton onClick={() => setDisplayFilters((prev) => !prev)}>
                    {displayFilters ? <IconFilterOff size={20} stroke={1.5} /> : <IconFilter size={20} stroke={1.5} />}
                </UnstyledButton>
            </Group>

            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover={!isLoading} striped>
                <thead>
                    <tr>
                        <Th
                            sorted={sortBy === "name"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("name")}
                            width="20%"
                            text="Name"
                            filter={
                                <FilterInput
                                    placeholder="Filter by Name"
                                    value={filters.name}
                                    onChange={(value) => handleFilterChange("name", value)}
                                    onClear={() => clearFilter("name")}
                                    visible={displayFilters}
                                />
                            }
                        />
                        <Th
                            sorted={sortBy === "model"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("model")}
                            width="25%"
                            text="Model"
                            filter={
                                <FilterInput
                                    placeholder="Filter by Model"
                                    value={filters.model}
                                    onChange={(value) => handleFilterChange("model", value)}
                                    onClear={() => clearFilter("model")}
                                    visible={displayFilters}
                                />
                            }
                        />
                        <Th
                            sorted={sortBy === "hyperdrive_rating"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("hyperdrive_rating")}
                            width="15%"
                            text="Hyperdrive Rating"
                            filter={
                                <FilterInput
                                    placeholder="Filter by Rating"
                                    value={filters.hyperdrive_rating}
                                    onChange={(value) => handleFilterChange("hyperdrive_rating", value)}
                                    onClear={() => clearFilter("hyperdrive_rating")}
                                    visible={displayFilters}
                                />
                            }
                        />
                        <Th
                            sorted={sortBy === "length"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("length")}
                            width="15%"
                            text="Length"
                            filter={
                                <FilterInput
                                    placeholder="Filter by Length"
                                    value={filters.length}
                                    onChange={(value) => handleFilterChange("length", value)}
                                    onClear={() => clearFilter("length")}
                                    visible={displayFilters}
                                />
                            }
                        />
                        <Th
                            sorted={sortBy === "created"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("created")}
                            width="15%"
                            text="Created"
                        />
                        <Th width="10%" text="Actions" />
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <StarshipTableSkeleton />
                    ) : rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <Text fw={500} ta="center" c="dimmed">
                                    Nothing found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Center mt="md">
                <Pagination total={totalPages} value={page} onChange={setPage} />
            </Center>
        </Paper>
    );
};

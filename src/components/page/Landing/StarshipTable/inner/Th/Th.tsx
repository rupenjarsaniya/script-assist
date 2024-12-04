import { Center, Flex, Text, TextInput, UnstyledButton } from "@mantine/core";
import { FC, ReactNode } from "react";
import classes from "./Th.module.scss";
import { IconChevronDown, IconChevronUp, IconSelector, IconX } from "@tabler/icons-react";

interface ThProps {
    children: ReactNode;

    reversed?: boolean;
    sorted?: boolean;
    onSort?: () => void;
    width?: string;
    filter?: ReactNode;
}

export const Th: FC<ThProps> = ({ children, reversed, sorted, onSort, width, filter }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    return (
        <th className={classes.th} style={{ width }}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Flex justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    {Boolean(onSort) && (
                        <Center>
                            <Icon size={16} stroke={1.5} />
                        </Center>
                    )}
                </Flex>
            </UnstyledButton>
            {filter}
        </th>
    );
};

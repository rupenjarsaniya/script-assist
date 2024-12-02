import { Flex, Loader as MNLoader, Text } from "@mantine/core";
import { FC } from "react";

interface LoaderProps {
    text: string;
}

export const Loader: FC<LoaderProps> = ({ text }) => {
    return (
        <Flex align="center" justify="center" direction="column" mt="lg">
            <MNLoader size="lg" />
            <Text align="center">{text}</Text>
        </Flex>
    );
};

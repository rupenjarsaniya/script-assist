import { Header, Container, Text, Flex } from "@mantine/core";
import classes from "./Header.module.scss";
import { ProfileButton } from "./inner/ProfileButton";

export const AppHeader = () => {
    return (
        <Header height={70} px="md" className={classes.header}>
            <Container w={"100%"} size="xl">
                <Flex align="center" justify="space-between">
                    {/* Logo */}
                    <Text weight={700} size="xl">
                        Logo
                    </Text>

                    {/* Profile Section */}
                    <ProfileButton />
                </Flex>
            </Container>
        </Header>
    );
};

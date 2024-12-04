import { Header, Container, Text, Flex, clsx, Group } from "@mantine/core";
import classes from "./Header.module.scss";
import { ProfileButton } from "./inner/ProfileButton";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    { link: "/", label: "Home" },
    { link: "/about", label: "About" },
];

export const AppHeader = () => {
    const [active, setActive] = useState("");
    const { pathname } = useLocation();

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={clsx([classes.link, { [classes.link_active]: active === link.link }])}
        >
            <Text weight={400} size="sm" color={active === link.link ? "white" : "#3d4c7e"}>
                {link.label}
            </Text>
        </Link>
    ));

    useEffect(() => {
        if (pathname.includes("/about")) {
            setActive("/about");
        } else {
            setActive("/");
        }
    }, [pathname]);

    return (
        <Header height={56} px="md" className={classes.header} bg="white" pos="sticky" top={0} zIndex={100} display="flex">
            <Container w="100%" size="xl">
                <Flex align="center" justify="space-between">
                    {/* Logo */}
                    <Text weight={700} size="xl">
                        Logo
                    </Text>

                    {/* Menu */}
                    <Group spacing="sm">{items}</Group>

                    {/* Profile Section */}
                    <ProfileButton />
                </Flex>
            </Container>
        </Header>
    );
};

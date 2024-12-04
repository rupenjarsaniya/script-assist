import { Header, Container, Text, Flex, clsx, Skeleton } from "@mantine/core";
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
        <Header height={70} px="md" className={classes.header}>
            <Container w={"100%"} size="xl">
                <Flex align="center" justify="space-between">
                    {/* Logo */}
                    <Text weight={700} size="xl">
                        Logo
                    </Text>

                    {/* Menu */}
                    <Flex gap={5}>{items}</Flex>

                    {/* Profile Section */}
                    <ProfileButton />
                </Flex>
            </Container>
        </Header>
    );
};

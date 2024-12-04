import { Avatar, Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout2 } from "@tabler/icons-react";
import { FC, useState } from "react";
import s from "./ProfileButton.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../../store/app.store";

export const ProfileButton: FC = () => {
    const navigate = useNavigate();
    const {
        authState: { user },
        logout,
    } = useAppStore();
    const [_, setUserMenuOpened] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={s.user}>
                    <Flex gap={7} align={"center"}>
                        <Avatar
                            src={"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                            alt={user?.name}
                            radius="xl"
                            size={20}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {user?.name}
                        </Text>
                        <IconChevronDown size={12} stroke={1.5} />
                    </Flex>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item c="red" icon={<IconLogout2 size={16} stroke={1.5} />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

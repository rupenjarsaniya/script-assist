import { Header, Container, Flex, Group, Image, Badge } from "@mantine/core";
import classes from "./AppHeader.module.scss";
import { ProfileButton } from "./inner/ProfileButton";
import LogoPng from "../../../assets/logo.png";
import { useAppStore } from "../../../store/app.store";

export const AppHeader = () => {
    const user = useAppStore((state) => state.authState?.user);

    return (
        <Header height={56} px="md" className={classes.header} bg="white" pos="sticky" top={0} zIndex={100} display="flex">
            <Container w="100%" size="xl">
                <Flex align="center" justify="space-between">
                    {/* Logo */}
                    <Group>
                        <Image src={LogoPng} alt="logo" width={150} />
                        <Badge color="teal" variant="filled" size="sm">
                            Interview
                        </Badge>
                    </Group>

                    {/* Profile Section */}
                    {user && <ProfileButton />}
                </Flex>
            </Container>
        </Header>
    );
};

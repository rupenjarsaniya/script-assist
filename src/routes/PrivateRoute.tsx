import { FC, PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppHeader } from "../components";
import { Box, Container } from "@mantine/core";
import { useAppStore } from "../store/app.store";

const PrivateRoute: FC = () => {
    const { authState } = useAppStore();

    if (!authState) {
        return <Navigate to="/login" />;
    }

    return (
        <Container size="xl" my="lg">
            <Outlet />
        </Container>
    );
};

export default PrivateRoute;

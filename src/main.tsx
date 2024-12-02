import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Landing from "./pages/landing/Landing";
import ShipDetail from "./pages/shipDetail/ShipDetail";

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/",
                        element: <Landing />,
                    },
                    {
                        path: "/starship/:starshipId",
                        element: <ShipDetail />,
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);

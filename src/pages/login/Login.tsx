import { Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAppStore } from "../../store/app.store";

const Login: FC = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAppStore();

    const handleLogin = async () => {
        try {
            if (form.email === "rupen@flex.com" && form.password === "1234") {
                const mockResponse = {
                    token: "mock-token-123",
                    user: { id: 1, name: "Rupen" },
                };
                login(mockResponse.token, mockResponse.user);
                navigate("/", { replace: true });
            } else {
                notifications.show({ title: "Invalid credentials", message: "Please try again", color: "red" });
            }
        } catch (error) {
            notifications.show({ title: "Invalid credentials", message: (error as any).message, color: "red" });
        }
    };

    const handleSetValue = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const isDisabled = useMemo(() => !form.email || !form.password, [form]);

    return (
        <Container size={420} my={40}>
            <Title ta="center" weight="bolder">
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Lorem ipsum dolor sit amet.
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    name="email"
                    value={form.email}
                    label="Email"
                    placeholder="you@mantine.dev"
                    onChange={handleSetValue}
                    required
                />
                <PasswordInput
                    name="password"
                    value={form.password}
                    label="Password"
                    placeholder="Your password"
                    onChange={handleSetValue}
                    required
                    mt="md"
                />
                <Button fullWidth mt="xl" onClick={handleLogin} disabled={isDisabled}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
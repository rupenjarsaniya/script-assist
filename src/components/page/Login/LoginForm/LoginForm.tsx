import { Paper, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, ChangeEvent, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store/app.store";
import { useMutation } from "@tanstack/react-query";
import { login as mockLogin } from "../../../../services";

export const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAppStore();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => mockLogin(email, password),
        onSuccess: (data: any) => {
            login(data.token, data.user);
            navigate("/", { replace: true });
        },
        onError: (error: Error) => {
            notifications.show({ title: "Invalid credentials", message: error.message, color: "red" });
        },
    });

    const handleLogin = async () => {
        try {
            await mutateAsync({ email: form.email, password: form.password });
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error);
        }
    };

    const handleSetValue = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const isDisabled = useMemo(() => !form.email || !form.password, [form]);

    return (
        <Paper shadow="md" p={30} mt={30} radius="md" withBorder bg="#3D4C7E">
            <Stack spacing={0}>
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
                    mb="xl"
                />
                <Button mt="xl" onClick={handleLogin} disabled={isDisabled} loading={isPending}>
                    Sign in
                </Button>
            </Stack>
        </Paper>
    );
};

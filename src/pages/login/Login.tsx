import { Anchor, Container, Text, Title } from "@mantine/core";
import { FC } from "react";
import { LoginForm } from "../../components";

const Login: FC = () => {
    return (
        <Container size={420} my={40}>
            <Title ta="center">Welcome back!</Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Anchor size="sm" component="button">
                    Lorem, ipsum.
                </Anchor>
            </Text>
            <LoginForm />
        </Container>
    );
};

export default Login;

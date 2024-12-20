import { Group, Text, UnstyledButton } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const BackButton: FC = () => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <UnstyledButton onClick={handleBack}>
            <Group align="center" spacing={3}>
                <IconArrowNarrowLeft size={30} stroke={1.5} />
                <Text size="md">Back</Text>
            </Group>
        </UnstyledButton>
    );
};

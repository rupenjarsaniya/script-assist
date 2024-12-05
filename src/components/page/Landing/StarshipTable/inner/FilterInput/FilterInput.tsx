import { TextInput, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import classes from "./FilterInput.module.scss";
import { IconX } from "@tabler/icons-react";

interface FilterInputProps {
    placeholder: string;
    value: string;
    visible: boolean;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const FilterInput: FC<FilterInputProps> = ({ placeholder, value, visible, onChange, onClear }) => {
    if (!visible) return null;

    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            variant="unstyled"
            classNames={{ root: classes.root, input: classes.input }}
            rightSection={
                <UnstyledButton onClick={onClear}>
                    <IconX size={16} stroke={1.5} />
                </UnstyledButton>
            }
        />
    );
};

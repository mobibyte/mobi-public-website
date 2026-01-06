import {
    Badge,
    Box,
    Combobox,
    Field,
    HStack,
    IconButton,
    Portal,
    Wrap,
    createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { techStack as SKILLS } from "@/data/tech_stack";
import { useController, useFormContext } from "react-hook-form";

function normalizeSkill(s: string) {
    return s.trim().replace(/\s+/g, " ");
}
function sameSkill(a: string, b: string) {
    return normalizeSkill(a).toLowerCase() === normalizeSkill(b).toLowerCase();
}

export function TechStackField({
    name = "tech_stack",
    label = "Tech Stack",
}: {
    name?: string;
    label?: string;
}) {
    const { control } = useFormContext();

    const {
        field: { value, onChange },
        fieldState,
    } = useController({
        control,
        name,
        defaultValue: [], // only used if form didn't provide it
    });

    // RHF owns the array; this component only owns the search text
    const selected: string[] = Array.isArray(value) ? value : [];
    const [searchValue, setSearchValue] = useState("");

    const filteredItems = useMemo(() => {
        const q = searchValue.toLowerCase();
        return SKILLS.filter((s) => s.toLowerCase().includes(q));
    }, [searchValue]);

    const collection = useMemo(
        () => createListCollection({ items: filteredItems }),
        [filteredItems]
    );

    const removeSkill = (skill: string) => {
        onChange(selected.filter((v) => !sameSkill(v, skill)));
    };

    const commitCustom = () => {
        const next = normalizeSkill(searchValue);
        if (!next) return;

        if (selected.some((v) => sameSkill(v, next))) {
            setSearchValue("");
            return;
        }

        onChange([...selected, next]);
        setSearchValue("");
    };

    return (
        <Field.Root invalid={!!fieldState.error}>
            <Combobox.Root
                multiple
                closeOnSelect
                width="100%"
                value={selected}
                collection={collection}
                onValueChange={(details) => onChange(details.value)}
                inputValue={searchValue}
                onInputValueChange={(details) =>
                    setSearchValue(details.inputValue)
                }
            >
                <Combobox.Label>{label}</Combobox.Label>

                <Wrap gap="2" mb="2">
                    {selected.map((skill) => (
                        <Badge key={skill} px="2" py="1" borderRadius="md">
                            <HStack gap="1">
                                <Box>{skill}</Box>
                                <IconButton
                                    aria-label={`Remove ${skill}`}
                                    size="2xs"
                                    variant="ghost"
                                    onClick={() => removeSkill(skill)}
                                >
                                    <IconX size={14} />
                                </IconButton>
                            </HStack>
                        </Badge>
                    ))}
                </Wrap>

                <Combobox.Control>
                    <Combobox.Input
                        placeholder="Search skills…"
                        onKeyDown={(e) => {
                            if (e.key !== "Enter") return;
                            e.preventDefault();
                            commitCustom();
                        }}
                    />
                    <Combobox.IndicatorGroup>
                        <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                </Combobox.Control>

                <Portal>
                    <Combobox.Positioner>
                        <Combobox.Content>
                            <Combobox.ItemGroup>
                                <Combobox.ItemGroupLabel>
                                    Skills
                                </Combobox.ItemGroupLabel>

                                {filteredItems.map((item) => (
                                    <Combobox.Item key={item} item={item}>
                                        {item}
                                        <Combobox.ItemIndicator />
                                    </Combobox.Item>
                                ))}

                                <Combobox.Empty>
                                    No skills found — press Enter to add “
                                    {normalizeSkill(searchValue)}”
                                </Combobox.Empty>
                            </Combobox.ItemGroup>
                        </Combobox.Content>
                    </Combobox.Positioner>
                </Portal>
            </Combobox.Root>

            {fieldState.error && (
                <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>
            )}
        </Field.Root>
    );
}

import {
  Badge,
  Combobox,
  createListCollection,
  Field,
  Portal,
  Wrap,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useProjectFormContext } from "@/context/form-context";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "Python",
  "HTML",
  "CSS",
  "MongoDB",
  "AWS",
  "Express.js",
];

export function TechStackField() {
  const form = useProjectFormContext();
  const value = (form.getValues().tech_stack ?? []) as string[];
  const [searchValue, setSearchValue] = useState("");

  // Filter suggestions based on input text
  const filteredItems = useMemo(
    () =>
      SKILLS.filter((s) => s.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue]
  );

  // Combobox expects a collection object
  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  );

  return (
    <Field.Root>
      <Combobox.Root
        multiple
        closeOnSelect
        width="100"
        value={value}
        collection={collection}
        onValueChange={
          (details) => form.setFieldValue("tech_stack", details.value) // details.value is string[]
        }
        onInputValueChange={(details) => setSearchValue(details.inputValue)}
      >
        <Wrap gap="2" mb="2">
          {(value ?? []).map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </Wrap>

        <Combobox.Label>Tech Stack</Combobox.Label>

        <Combobox.Control>
          <Combobox.Input placeholder="Search skills…" />
          <Combobox.IndicatorGroup>
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.ItemGroup>
                <Combobox.ItemGroupLabel>Skills</Combobox.ItemGroupLabel>
                {filteredItems.map((item) => (
                  <Combobox.Item key={item} item={item}>
                    {item}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
                <Combobox.Empty>No skills found</Combobox.Empty>
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Field.Root>
  );
}

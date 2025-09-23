import { ColorPicker, Portal, HStack, parseColor } from "@chakra-ui/react";

import { useProjectFormContext } from "@/context/form-context";

export function ColorPickerField() {
  const form = useProjectFormContext();
  const value = form.getValues().bg_color ?? "#3E0D93";

  const colorObj = parseColor(value) ?? parseColor("#3E0D93")!;
  return (
    <ColorPicker.Root
      value={colorObj}
      format="hsla"
      onValueChange={(e) => {
        form.setFieldValue("bg_color", e.valueAsString);
      }}
      maxW="100%"
    >
      <ColorPicker.Label>Background Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger cursor={"pointer"} />
      </ColorPicker.Control>

      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content cursor={"pointer"}>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
}

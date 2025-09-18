import { ColorPicker, Portal, HStack, parseColor } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

export function ColorPickerInput({
  color,
  setColor,
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <ColorPicker.Root
      value={parseColor(color)}
      format="hsla"
      onValueChange={(e) => setColor(e.valueAsString)}
      maxW="200px"
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Background Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
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

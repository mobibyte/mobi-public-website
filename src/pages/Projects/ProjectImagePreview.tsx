import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProjectFormContext } from "@/context/form-context";

type Props = {
  file?: File;
};

const default_preview =
  "https://fimmkvsywsxovvhdctfn.supabase.co/storage/v1/object/public/projects/default-project-image.png";

export function ProjectImagePreview({ file }: Props) {
  const form = useProjectFormContext();
  const [preview, setPreview] = useState<string>(() => {
    const url = form.getValues().image?.trim();
    return url || default_preview;
  });

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // need tool tip

  return (
    <Box bg={form.getValues().bg_color} py={12} px={16}>
      <Image
        src={form.getValues().image || preview}
        objectFit="cover"
        rounded={"md"}
        shadow={"md"}
        aspectRatio={16 / 10}
        mx={"auto"}
      />
    </Box>
  );
}

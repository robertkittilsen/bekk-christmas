import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { urlFor } from "../../../utils/sanity/utils";
import { Space } from "../../design-system/Space";

export const ImageBlock = ({ node }: any) => {
  if (!node?.asset) {
    return null;
  }

  return (
    <Stack as="figure">
      <Image
        src={urlFor(node.asset).width(800).url()!}
        alt={node.alt}
        borderRadius={20}
      />
      {node.caption && (
        <Text as="figcaption" color="gray.500" textAlign="center">
          {node.caption}
        </Text>
      )}
    </Stack>
  );
};

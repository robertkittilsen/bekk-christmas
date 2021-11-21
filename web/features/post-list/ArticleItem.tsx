import React from "react";
import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import readingTime from "reading-time";
import { ArrowShort } from "./Arrow";
import { toDayYear } from "../../utils/date";
import { DescriptionPortableText } from "../portable-text/DescriptionPortableText";

export type ArticlePostType = {
  _type: "post";
  slug: string;
  title: string;
  plaintextContent: string;
  tags: { name: string; slug: string }[];
  availableFrom: string;
  description: unknown[];
};

type ArticleItemProps = {
  post: ArticlePostType;
  index: number;
};

export const ArticleItem = ({ post, index }: ArticleItemProps) => {
  const { year, day } = toDayYear(post.availableFrom);
  return (
    <Link href={`/post/${year}/${day}/${post.slug}`} passHref>
      <Flex
        cursor="pointer"
        position="relative"
        flexDirection="column"
        background="new.white"
        padding="32px"
        width="300px"
        height="430px"
        color="new.darkGreen"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      >
        <Text mb="12px" fontSize="14px">
          <Box
            display="inline-block"
            background="new.salmon"
            width="0.65em"
            height="0.65em"
            marginRight="0.25rem"
            borderRadius="50%"
          />
          {readingTime(post.plaintextContent || "").text} –{" "}
          {post.tags?.map((tag) => tag.name).join(", ")}
        </Text>
        <Heading
          as="h2"
          fontWeight="400"
          fontSize="32px"
          marginBottom="24px"
          title={post.title}
        >
          {post.title}
        </Heading>
        <Text noOfLines={2}>
          <DescriptionPortableText blocks={post.description} />
        </Text>

        <ArrowShort
          position="absolute"
          bottom="24px"
          right="24px"
          width="40px"
        />
      </Flex>
    </Link>
  );
};

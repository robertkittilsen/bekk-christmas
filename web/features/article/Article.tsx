import { Box } from "@chakra-ui/react";
import React from "react";
import readingTime from "reading-time";
import { toPlainText } from "../../utils/sanity/utils";
import { ArticleBody } from "./ArticleBody";
import { ArticleFooter } from "./ArticleFooter";
import { ArticleHeader } from "./ArticleHeader";

const formatter = Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

type ArticleProps = {
  /** The category shown at the top of the article, like "Article", "Podcast", "Information" etc */
  categories?: { name: string; slug: string }[];
  type?: "article" | "podcast" | "video";
  embedUrl?: string;
  title?: string;
  description?: unknown[];
  content: unknown[];
  authors?: { fullName: string }[];
  publishedAt?: Date;
  coverImage?: string;
  showReadingTime?: boolean;
  backButtonHref?: string;
  backButtonText: string;
};
export const Article = ({
  categories = [],
  type = "article",
  embedUrl,
  title = "",
  description = [],
  content,
  authors,
  publishedAt,
  coverImage,
  showReadingTime = false,
  backButtonHref,
  backButtonText,
}: ArticleProps) => {
  const publishedAtDate = publishedAt ? formatter.format(publishedAt) : null;
  const isScrolledToTop = useScrolledToTop();

  return (
    <Box
      color="brand.black"
      backgroundColor={isScrolledToTop ? "brand.pink" : "white"}
      transition="background-color .5s ease-out"
    >
      <ArticleHeader
        backButtonHref={backButtonHref}
        backButtonText={backButtonText}
      />
      <ArticleBody
        type={type}
        embedUrl={embedUrl}
        title={title}
        categories={categories}
        readingTime={
          showReadingTime ? readingTime(toPlainText(content)).text : undefined
        }
        description={description}
        authors={authors}
        publishedAt={publishedAtDate}
        content={content}
        coverImage={coverImage ?? ""}
      />
      <ArticleFooter
        backButtonHref={backButtonHref}
        backButtonText={backButtonText}
      />
    </Box>
  );
};

const useScrolledToTop = () => {
  const [isScrolledToTop, setScrolledToTop] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return isScrolledToTop;
};

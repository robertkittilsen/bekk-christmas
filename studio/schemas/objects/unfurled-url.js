import { PreviewLink } from "@opengraphninja/react";
import "@opengraphninja/react/styles.css?raw";
import React from "react";

export default {
  type: "object",
  name: "unfurledUrl",
  title: "Unfurled URL",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The URL to unfurl",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      href: "url",
    },
    component: (props) => {
      try {
        const href = props.value.href;
        new URL(href);
        return <PreviewLink href={href} />;
      } catch (e) {
        // not a valid URL, render nothing
        return null;
      }
    },
  },
};

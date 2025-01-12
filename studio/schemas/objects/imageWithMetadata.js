export default {
  name: "imageWithMetadata",
  type: "image",
  title: "Image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: "External image source",
      name: "src",
      type: "string",
    },
    {
      name: "caption",
      type: "string",
      title: "Caption",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "maxWidth",
      title: "Max width",
      description:
        'If you for some reason want to set a custom max width for the image, specify it in pixels here (ex. "500" - skip the "px").',
      type: "number",
      validation: (Rule) => Rule.min(0).max(1200),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};

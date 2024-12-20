import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: "./src/data/blog" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z
      .string()
      .optional(),
    published: z
      .boolean()
      .optional(),
    author: z
      .string()
      .optional(),
    tags: z
      .array(z.string())
      .optional()
	}),
});

export const collections = { blog };


import * as z from "zod";

// Example document schema – extend as needed
export const documentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().max(512, "Description too long").optional().nullable(),
  doc_type: z.string().min(3),
  content: z.string().optional().nullable(),
  version: z.number().positive().optional(),
  // Extend with your actual use-case
});

// Reusable helper to validate any schema
export const parseWithSchema = <T extends z.ZodTypeAny>(schema: T, data: unknown) => {
  const result = schema.safeParse(data);
  return result;
};

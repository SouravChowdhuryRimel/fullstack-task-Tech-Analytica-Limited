// src/validations/content.ts
import * as z from "zod";

export const editContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number().min(1, "Duration must be at least 1 second"),
  tags: z.array(z.string()).optional(),
});

export type EditContentFormValues = z.infer<typeof editContentSchema>;

import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(3, "Title Field Required").max(255),
  description: z.string().min(10, "Description Field Required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(3, "Title Field Required").max(255).optional(),
  description: z.string().min(10, "Description Field Required").optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assignee Field Required")
    .max(255)
    .optional()
    .nullable(),
});
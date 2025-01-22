import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(3, "Title Field Required").max(255),
  description: z.string().min(10, "Description Field Required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

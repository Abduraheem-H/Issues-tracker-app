"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE, { Options } from "easymde";
import { SimpleMdeReact } from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { issueSchema } from "../../validationSchema";
import "easymde/dist/easymde.min.css";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";



type IssueFormData = z.infer<typeof issueSchema>;

function IssueForm({ issue }: { issue?: Issue | null }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const customToolbarOptions: Options = {
    toolbar: [
      "bold",
      "italic",
      "heading",
      "unordered-list",
      "|",

      {
        name: "customLink",

        action: (editor: SimpleMDE) => {
          const link = prompt("Enter link URL:");
          if (link) {
            editor.codemirror.replaceSelection(`[Link Title](${link})`);
          }
        },
        className: "fa fa-link",
        title: "Insert Custom Link",
      },
      "|",
      "preview",
      "side-by-side",
      "fullscreen",
    ],
  };
  // (async () => {
  //   await new Promise((r) => setTimeout(r, 2000));
  // })(); // Simulate delay for loading state

  return (
    <div className="p-8 max-w-xl">
      {successMessage && (
        <Callout.Root variant="soft" className="mb-4" color="green">
          <Callout.Text>{successMessage}</Callout.Text>{" "}
        </Callout.Root>
      )}
      {error && (
        <Callout.Root variant="soft" className="mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>{" "}
        </Callout.Root>
      )}{" "}
      <form
        className=" p-4 space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            setSuccessMessage(null);
            setError(null);

            let successMsg = "";

            if (issue) {
              const updateResponse = await axios.patch(
                `/api/issues/${issue.id}`,
                data
              );
              successMsg = "Issue updated successfully.";
              console.log("Issue Updated:", updateResponse.data);
            } else {
              const response = await axios.post("/api/issues", data);
              successMsg = "Issue submitted successfully.";
              console.log("Issue created:", response.data);
            }
            setSuccessMessage(successMsg);
            setTimeout(() => {
              router.push("/issues/list");
              router.refresh();
            }, 1500);
          } catch (error) {
            setIsSubmitting(false);

            if (axios.isAxiosError(error) && error.response?.status === 400) {
              setError(
                error.response.data?.message || "Invalid data submitted."
              );
            } else {
              setError("An unexpected error occurred. Please try again.");
              console.error("Error submitting issue:", error);
            }
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p" aria-live="assertive">
            {errors.title.message}
          </Text>
        )}
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <Suspense fallback={<div>Loading editor...</div>}>
              <SimpleMdeReact
                {...field}
                value={field.value || ""}
                options={customToolbarOptions}
                placeholder="Describe your issue..."
              />
            </Suspense>
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>{" "}
      </form>
    </div>
  );
}

export default IssueForm;

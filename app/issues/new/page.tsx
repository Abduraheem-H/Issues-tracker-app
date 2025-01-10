"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Options } from "easymde";
import SimpleMDE from "easymde";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "../../validationSchema";
import { z } from "zod";
// @ts-expect-error - no types available for this CSS side-effect import
import "easymde/dist/easymde.min.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssuesSchema>;

function NewIssuesPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssuesSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const customToolbarOptions: Options = {
    toolbar: [
      "bold",
      "italic",
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

  return (
    <div className="p-8 max-w-xl">
      {error && (
        <Callout.Root variant="soft" className="mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" p-4 space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await axios.post("/api/issues", data);
            console.log("Issue created:", response.data);
            router.push("/issues");
          } catch (error) {
            setError("Failed to create issue. Please try again.");
            console.error("Error creating issue:", error);
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
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuesPage;

"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
// @ts-expect-error - no types available for this CSS side-effect import
import "easymde/dist/easymde.min.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function NewIssuesPage() {
  const [description, setDescription] = useState("");

  const customToolbarOptions = {
    toolbar: [
      "bold",
      "italic",
      "unordered-list",
      "|",

      {
        name: "customLink",
        action: (editor) => {
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
    <div className="max-w-xl p-4 space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>

      <Suspense fallback={<div>Loading editor...</div>}>
        <SimpleMdeReact
          value={description}
          onChange={setDescription}
          options={customToolbarOptions}
          placeholder="Describe your issue..."
        />
      </Suspense>

      <Button>Submit New Issue</Button>
    </div>
  );
}

export default NewIssuesPage;

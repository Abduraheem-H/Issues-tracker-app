import { TextArea, TextField } from "@radix-ui/themes";

import React from "react";

function NewIssuesPage() {
  return (
    <div className="max-w-xl  p-4 space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Describe your issue..."></TextArea>
    </div>
  );
}

export default NewIssuesPage;

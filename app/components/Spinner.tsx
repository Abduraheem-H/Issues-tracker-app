import React from "react";

function Spinner() {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-gray-700 border-e-transparent"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;

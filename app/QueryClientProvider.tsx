"use client";
import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <RQProvider client={queryClient}>{children}</RQProvider>;
};

export default QueryClientProvider;

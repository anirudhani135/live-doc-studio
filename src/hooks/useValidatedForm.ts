
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export function useValidatedForm<T extends z.ZodTypeAny>(schema: T, defaultValues: Record<string, any> = {}) {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange"
  });
}

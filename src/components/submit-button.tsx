"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends Omit<
  ComponentProps<typeof Button>,
  "type" | "children"
> {
  idleText: string;
  pendingText?: string;
}

export default function SubmitButton({
  idleText,
  pendingText = "Đang gửi...",
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending || disabled}>
      {pending ? pendingText : idleText}
    </Button>
  );
}

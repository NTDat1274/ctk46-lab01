"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
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
    <button {...props} type="submit" disabled={pending || disabled}>
      {pending ? pendingText : idleText}
    </button>
  );
}

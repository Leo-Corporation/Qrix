import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:placeholder:text-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

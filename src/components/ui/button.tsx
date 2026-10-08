import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border text-sm font-semibold transition-[background-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary px-6 text-primary-foreground hover:bg-primary/88",
        inverse: "border-hero-ink bg-hero-ink px-6 text-hero hover:bg-hero-ink/90",
        outline:
          "border-foreground/25 bg-transparent px-6 text-foreground hover:bg-foreground hover:text-background",
        ghost: "border-transparent bg-transparent px-3 text-current hover:bg-current/10",
        icon: "size-11 border-current/25 bg-transparent p-0 text-current hover:bg-current hover:text-background",
      },
      size: {
        default: "h-12",
        small: "h-10 min-h-10 px-4 text-xs",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

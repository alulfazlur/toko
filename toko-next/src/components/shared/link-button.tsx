"use client";

import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

type LinkButtonProps = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>

export const LinkButton = ({ variant, size, className, ...props }: LinkButtonProps) => (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
);

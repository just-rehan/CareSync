import * as React from "react"

import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...cleanProps}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...cleanProps}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...cleanProps}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...cleanProps}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...cleanProps} />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { asChild, aschild, ...cleanProps } = props as any;
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...cleanProps}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

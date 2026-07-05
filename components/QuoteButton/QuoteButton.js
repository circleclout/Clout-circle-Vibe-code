"use client";

import Button from "@/components/Button/Button";

export default function QuoteButton({ children, variant = "primary", size = "md", className = "", ...props }) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-quote"));
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}

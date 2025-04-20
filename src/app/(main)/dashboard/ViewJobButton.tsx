"use client";
import { Button } from "@/components/ui/button";

export default function ViewJobButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      View Job
    </Button>
  );
}

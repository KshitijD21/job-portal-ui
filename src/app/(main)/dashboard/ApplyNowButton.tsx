"use client";
import { Button } from "@/components/ui/button";

export default function ApplyNowButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button variant="secondary" size="sm" onClick={onClick}>
      Apply Now
    </Button>
  );
}

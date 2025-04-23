"use client";
import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";

export default function FilterButton() {
  return (
    <Button variant="outline" className="flex items-center space-x-1">
      <Sliders className="h-4 w-4" />
      <span>Filters</span>
    </Button>
  );
}

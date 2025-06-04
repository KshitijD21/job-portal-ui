"use client";
import { Button } from "@/components/ui/button";
import { MouseEvent } from "react";

export default function ApplyNowButton({
  onClick,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <a
      href="https://www.linkedin.com/jobs/search/?currentJobId=4187612487&keywords=amazon%20cloud%20developer%20job&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4187612487%2C4082076505%2C4190883463"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="secondary" size="sm" onClick={onClick}>
        Apply Now
      </Button>
    </a>
  );
}

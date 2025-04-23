"use client";
import { Button } from "@/components/ui/button";

export default function ApplyNowButton({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="https://www.linkedin.com/jobs/search/?currentJobId=4187612487&keywords=amazon%20cloud%20developer%20job&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4187612487%2C4082076505%2C4190883463"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="secondary" size="sm">
        Apply Now
      </Button>
    </a>
  );
}

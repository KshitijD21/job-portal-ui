// lib/api.ts
import api from "./axios";
import { Role } from "./constants/roles";

export interface Job {
  id: string;
  jobId: string;
  company: string;
  jobTitle: string;
  role: string; // this is your “Social Media Manager” field
  location: string;
  experience: string;
  salaryRange: string;
  workType: string;
  jobPostingDate: string;
  skills: string[];
}

type LoginApiResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    role: Role;
  };
  errors: any;
};

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const registerUser = async (
  email: string,
  userName: string,
  password: string,
  role: Role
) => {
  const res = await api.post("/register", {
    email,
    userName,
    password,
    role,
  });
  return res.data;
};

export const fetchGoogleOAuthUrl = async () => {
  try {
    const response = await api.get<{ authUrl: string }>("/connect/google");
    return response.data.authUrl;
  } catch (error) {
    console.error("Failed to get Google OAuth URL:", error);
    throw new Error("Could not initiate Google OAuth. Please try again later.");
  }
};
export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>("/jobs");
  return res.data;
};

/**
 * Fetch a single job by its ID.
 */
export const getJobById = async (id: string): Promise<Job> => {
  const res = await api.get<Job>(`/jobs/${id}`);
  return res.data;
};

/**
 * Create a new job posting.
 */
export const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const res = await api.post<Job>("/jobs", job);
  return res.data;
};

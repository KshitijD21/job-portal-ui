// lib/api.ts
import api from "./axios";
import { Role } from "./constants/roles";

export interface Job {
  id: string;
  jobId: string;
  company: string;
  jobTitle: string;
  role: string;
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

const TOKEN_KEY = "authToken";

/**
 * Store token in localStorage so axios interceptor
 * will pick it up on every request.
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  const res = await api.post<LoginApiResponse>("/login", { email, password });
  const token = res.data.data.token;
  // const role = res.data.data.role;
  // console.log(role);
  // persist for interceptor
  localStorage.setItem(TOKEN_KEY, token);

  return res.data;
};

/**
 * Clear the stored token.
 */
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/** Unprotected endpoints **/
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const registerUser = async (
  email: string,
  userName: string,
  password: string,
  role: Role
) => {
  const res = await api.post("/register", { email, userName, password, role });
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
}



export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/** Protected /jobs endpoints **/
export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get<Job[]>("/jobs");
  return res.data;
};

export const getJobById = async (id: string): Promise<Job> => {
  const res = await api.get<Job>(`/jobs/${id}`);
  return res.data;
};

export const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const res = await api.post<Job>("/jobs", job);
  return res.data;
};

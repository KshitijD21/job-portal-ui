// components/types.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  website: string;
  postingDate: string;
  location: string;
  country: string;
  contactPerson: string;
  contact: string;
  status: string; // we’ll use Work Type here
}

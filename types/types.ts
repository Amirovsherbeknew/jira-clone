export interface Issue {
  isDone: false;
  id: string | number;
  project: string;
  type: string;
  status: string;
  duration: string;
  summary: string;
  reporter: string;
  priority: string;
  dateStart: string;
  updated: string;
  dateTo: string;
  labels: string;
  description?: string;
  blocks: string;
  assigneeValue?: string[];
  relatedIssues: string[];
}

export interface User {
  id: string | number;
  name: string;
  job: string;
}

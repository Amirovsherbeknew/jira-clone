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
  dateTo: string;
  labels: string;
  description?: string;
  blocks: string;
  assigneeValue?: string[];
  relatedIssues: string[];
}

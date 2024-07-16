export interface Issue {
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
  description?: string;
  blocks: string;
  assigneeValue?: string[];
  relatedIssues: string[];
}

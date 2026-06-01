export interface Highlight {
  id: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface HomePageData {
  eyebrow: string;
  title: string;
  description: string;
  highlights: Highlight[];
  workflow: WorkflowStep[];
}

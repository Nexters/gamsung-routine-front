export interface RoutineCreateRs {
  id: string | null;
  profileId: string;
  title: string;
  notify: boolean;
  days: number[];
  times: string[];
  category: string | null;
  templateId: string | null;
  order: number | null;
}

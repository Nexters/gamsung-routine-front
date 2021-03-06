import { Friend } from './Friend';

export interface RoutineTaskUnit {
  id: string | null;
  code: string | null;
  profileId: string;
  title: string;
  notify: boolean;
  days: number[];
  times: string[];
  category: string | null;
  templateId: string | null;
  order: number | null;
  friends: Friend[];
}

import { useUserProfileData } from './authAPI';

import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { Task } from '~/models/Task';
import api from '~/utils/api';
import { useCommonSWR } from '~/utils/swr';

export const useMonthlyTasks = ({ year, month }: { year: string; month: string }) => {
  const { data: profile } = useUserProfileData();
  const profileId = profile?.id;
  return useCommonSWR<{
    dailyRoutines: {
      [key: string]: Task[];
    };
  }>(profileId ? `/routine/monthly/${profileId}?year=${year}&month=${month}` : null);
};

export class RoutineAPI {
  private static _instance: RoutineAPI;

  async getSingleTask(taskId: string) {
    return await api.get<RoutineTaskUnit>(`/routine/${taskId}`);
  }

  async saveTask(item: RoutineTaskUnit) {
    await api.post('/routine', item);
  }

  async updateTask(item: RoutineTaskUnit) {
    await api.put('/routine', item);
  }

  async deleteTask(taskId: string) {
    await api.delete(`/routine/${taskId}`);
  }

  async saveMultiTask(items: RoutineTaskUnit[]) {
    await api.post('/routine/multi', items);
  }

  static instance() {
    if (!this._instance) {
      this._instance = new RoutineAPI();
    }
    return this._instance;
  }
}

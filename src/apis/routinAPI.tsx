import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { Task } from '~/models/Task';
import api from '~/utils/api';
import { useCommonSWR } from '~/utils/swr';

export const useMonthlyTasks = ({ profileId, year, month }: { profileId: string; year: string; month: string }) => {
  profileId = 'testprofile';
  year = '2021';
  month = '08';
  return useCommonSWR<{
    dailyRoutines: {
      [key: string]: Task[];
    };
  }>(`/routine/weekly/${profileId}?year=${year}&month=${month}`);
};

export class RoutineAPI {
  private static _instance: RoutineAPI;

  async getSingleTask(taskId: string) {
    return await api.get<RoutineTaskUnit>(`/routine/${taskId}`);
  }

  async saveTask(item: RoutineTaskUnit) {
    await api.post('/routine', { item });
  }

  async deleteTask(taskId: string) {
    await api.delete(`/routine/${taskId}`);
  }

  static instance() {
    if (!this._instance) {
      this._instance = new RoutineAPI();
    }
    return this._instance;
  }
}

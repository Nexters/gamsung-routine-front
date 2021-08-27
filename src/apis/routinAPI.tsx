import { useUserProfileData } from './authAPI';

import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { Task } from '~/models/Task';
import api from '~/utils/api';
import { useCommonSWR, useHeaderSWR } from '~/utils/swr';

export const useMonthlyTasks = ({ year, month }: { year: string; month: string }) => {
  const { data: profile } = useUserProfileData();
  const profileId = profile?.id;
  return useCommonSWR<{
    dailyRoutines: {
      [key: string]: Task[];
    };
    // 달은 0~11이라서 1을 플러스 해줘야한다.
  }>(profileId ? `/routine/monthly/${profileId}?year=${year}&month=${Number(month) + 1}` : null);
};

export const useIsDelay = (taskId: string) => {
  return useHeaderSWR<{
    data?: boolean;
  }>(`/routine/unit/delay/check/${taskId}`);
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

  // Task 1회 완료하기
  async completeTask(unitId: string, date: string) {
    await api.patch(`/routine/unit/complete/${unitId}?date=${date}`);
  }

  // Task 1회 되돌리기
  async backTask(unitId: string, date: string) {
    await api.patch(`/routine/unit/back/${unitId}?date=${date}`);
  }

  // Task 1회 미루기
  async delayTask(unitId: string, date: string) {
    await api.patch(`/routine/unit/delay/${unitId}?date=${date}`);
  }

  async inviteRoutine(taskId: string, profileId: string) {
    await api.post(`/routine/invite/${taskId}/${profileId}`);
  }

  static instance() {
    if (!this._instance) {
      this._instance = new RoutineAPI();
    }
    return this._instance;
  }
}

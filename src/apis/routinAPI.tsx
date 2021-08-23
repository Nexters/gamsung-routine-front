import { useUserProfileData } from './authAPI';

import { RoutineTaskUnit } from '~/models/RoutineTaskUnit';
import { Task } from '~/models/Task';
import CalendarStore from '~/stores/CalendarStore';
import api from '~/utils/api';
import { useCommonSWR } from '~/utils/swr';

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

// 특정기간 Task unit 조회
export const useSpecificPeriodTask = (taskId: string) => {
  const { data: profile } = useUserProfileData();
  const profileId = profile?.id;

  const isSun = CalendarStore.focusDay.format('ddd') === 'Sun';
  const firstDay = CalendarStore.focusDay.add(isSun ? -1 : 0, 'day').day(1);

  return useCommonSWR(
    profileId
      ? `/routine/unit/day/${profileId}/${taskId}?fromDate=${firstDay.format('YYYYMMDD')}&toDate=${firstDay
          .add(6, 'day')
          .format('YYYYMMDD')}`
      : null,
  );
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

  async inviteRoutine(taskId: string, profileId: string) {
    await api.get(`/routine/invite/${taskId}/${profileId}`);
  }

  // Task 1회 미루기
  async delayTask(unitId: string, date: string) {
    await api.patch(`/routine/unit/delay/${unitId}?date=${date}`);
  }

  static instance() {
    if (!this._instance) {
      this._instance = new RoutineAPI();
    }
    return this._instance;
  }
}

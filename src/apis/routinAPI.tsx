import { RoutineCreateRq } from '~/models/RoutineCreateRq';
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

export const useCreateRoutine = (rq: RoutineCreateRq) => {
  return api.post('/routine', { rq });
};

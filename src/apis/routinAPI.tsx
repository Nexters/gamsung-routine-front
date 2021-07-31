import { Task } from '~/models/Task';
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

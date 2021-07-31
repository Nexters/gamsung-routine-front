import { useCommonSWR } from '~/utils/swr';

export const useMonthlyTasks = ({ profileId, year, month }: { profileId: string; year: string; month: string }) => {
  profileId = 'testprofile';
  year = '2021';
  month = '08';
  return useCommonSWR<{
    dailyRoutines: {
      [key: string]: {
        completeCount: number;
        completedDateList: any[];
        date: string;
        days: number[];
        friendIds: any[];
        id: string;
        profileId: string;
        taskId: string;
        times: string[];
        timesOfDay: number;
        timesOfWeek: number;
        title: string;
      }[];
    };
  }>(`/routine/weekly/${profileId}?year=${year}&month=${month}`);
};

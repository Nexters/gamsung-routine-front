import { RoutineCreateRq } from '~/models/RoutineCreateRq';
import api from '~/utils/api';

class EditTaskStore {
  private static _instance: EditTaskStore;

  saveTask(
    title: string,
    days: number[],
    times: string[],
    notify: boolean,
    id: string | null = null,
    categoryId: string | null = null,
    templateId: string | null = null,
    order: number | null = 1,
  ) {
    const item: RoutineCreateRq = {
      id,
      profileId: '1',
      title,
      notify,
      days,
      times,
      category: categoryId,
      templateId,
      order,
    };
    // lint로 인해 customHook (routinAPI에 만든 function)을 못씀
    api.post('/routine', { item });
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new EditTaskStore();
    }
    return this._instance;
  }
}

export default EditTaskStore;

import { makeObservable, observable } from 'mobx';
import { Category } from '~/models/Category';
import { Template } from '~/models/Template';

export class AddTaskVM {
  categories: Category[] = [
    { id: 1, name: '건강' },
    { id: 2, name: '학습' },
    { id: 3, name: '인플루언스' },
    { id: 4, name: '취미' },
    { id: 5, name: '흐으으으음' },
    { id: 6, name: '모르겠따' },
    { id: 7, name: '악' },
  ];

  selectedCategoryId: number | null = 1;

  templates: Template[] = [
    {
      id: 1,
      title: '살을 빼고 싶어1',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 2,
      title: '살을 빼고 싶어2',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 3,
      title: '살을 빼고 싶어3',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 4,
      title: '살을 빼고 싶어4',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 5,
      title: '살을 빼고 싶어5',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 6,
      title: '살을 빼고 싶어6',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 7,
      title: '살을 빼고 싶어7',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 8,
      title: '살을 빼고 싶어8',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 9,
      title: '살을 빼고 싶어9',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
    {
      id: 10,
      title: '살을 빼고 싶어10',
      tasks: [
        { id: 1, taskName: '물 마시기' },
        { id: 2, taskName: '물 마시기' },
        { id: 3, taskName: '물 마시기' },
        { id: 4, taskName: '물 마시기' },
        { id: 5, taskName: '물 마시기' },
        { id: 6, taskName: '물 마시기' },
        { id: 7, taskName: '물 마시기' },
      ],
      templateIconSrc: null,
    },
  ];

  selectedTemplateId: number | null = null;

  constructor() {
    makeObservable(this, {
      categories: observable.ref,
      selectedCategoryId: observable,
      templates: observable.ref,
      selectedTemplateId: observable,
    });
  }
}

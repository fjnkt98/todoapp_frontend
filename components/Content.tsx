import React from 'react';
import recoil from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Pages } from '../types/pages';
import { Todo } from '../types/todo';
import { TextInputBox } from '../components/TextInputBox';
import { ListTab } from '../components/ListTab';
import { TodoList } from '../components/TodoList';

// Type definition for this React component
interface Props {
  page: string;
}

// Index of pages
const pages: Pages = {
  index: {
    title: 'All Todo',
  },
  active: {
    title: 'Active Todo',
  },
  finished: {
    title: 'Finished Todo',
  },
};

export const todoItemsState = recoil.atom<Todo[]>({
  key: 'todoItemsState',
  default: [
    {
      id: uuidv4(),
      title: 'Create todo app interface layout using simple HTML',
      isFinished: true,
    },
    {
      id: uuidv4(),
      title: 'Decorate todo app interface using vanilla CSS',
      isFinished: true,
    },
    {
      id: uuidv4(),
      title: 'Decorate todo app interface using Tailwind CSS',
      isFinished: true,
    },
    {
      id: uuidv4(),
      title: 'Develop todo app using React',
      isFinished: false,
    },
  ],
});

export const activeTodoItemsState = recoil.selector({
  key: 'activeTodoItemsState',
  get: ({ get }) => {
    const todoItems = get(todoItemsState);
    return todoItems.filter((item) => item.isFinished === false);
  },
});

export const finishedTodoItemsState = recoil.selector({
  key: 'finishedTodoItemsState',
  get: ({ get }) => {
    const todoItems = get(todoItemsState);

    return todoItems.filter((item) => item.isFinished === true);
  },
});

export const Content: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="max-w-xs mx-auto mb-8">
          <TextInputBox />
        </div>

        <ListTab currentPage={props.page} pages={pages} />

        <TodoList page={props.page} />
      </div>
    </>
  );
};

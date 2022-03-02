import React from 'react';
import recoil from 'recoil';

import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import {
  todoItemsState,
  activeTodoItemsState,
  finishedTodoItemsState,
} from './Content';

type Props = {
  page: string;
};

/**
 * React component that denotes list of todo items
 */
export const TodoList: React.VFC<Props> = (props) => {
  let todoListView: Todo[] = [];
  switch (props.page) {
    case 'index':
      todoListView = recoil.useRecoilValue(todoItemsState);
      break;
    case 'active':
      todoListView = recoil.useRecoilValue(activeTodoItemsState);
      break;
    case 'finished':
      todoListView = recoil.useRecoilValue(finishedTodoItemsState);
      break;
    default:
      todoListView = recoil.useRecoilValue(todoItemsState);
      break;
  }

  return (
    <ul className="max-w-lg mx-auto">
      {todoListView.map((item) => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

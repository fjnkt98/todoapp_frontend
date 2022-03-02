import React from 'react';
import recoil from 'recoil';
import { Todo } from '../types/todo';
import { todoItemsState } from './Content';

// Type definition for the props which this component takes
type Props = {
  item: Todo;
};

/**
 * React component that denotes a todo item
 */
export const TodoItem: React.VFC<Props> = (props) => {
  const setTodoItems = recoil.useSetRecoilState(todoItemsState);

  /**
   * A function that toggle completion status of specified todo item
   */
  const updateTodoItem = (): void => {
    setTodoItems((prev: Todo[]) => {
      const index = prev.findIndex((item) => item.id === props.item.id);
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          isFinished: !prev[index].isFinished,
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  return (
    <li
      className="flex flex-wrap items-center py-3 border-b border-gray-200"
      key={props.item.id}
    >
      <label
        className={
          'inline-block cursor-pointer select-none ' +
          `${props.item.isFinished ? 'line-through decoration-gray-500' : ''}`
        }
      >
        <input
          type="checkbox"
          checked={props.item.isFinished}
          className="inline-block mx-4 h-6 w-6 rounded-xl border-gray-300 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 text-teal-500"
          onChange={updateTodoItem}
        />
        {props.item.title}
      </label>
    </li>
  );
};

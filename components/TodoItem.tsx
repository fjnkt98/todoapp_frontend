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
      className="flex flex-row items-center border-b border-gray-200"
      key={props.item.id}
    >
      <input
        type="checkbox"
        id={props.item.id}
        checked={props.item.isFinished}
        className="inline-block mx-4 h-6 w-6 rounded-xl border-gray-300 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 text-teal-500"
        onChange={updateTodoItem}
      />
      <label
        htmlFor={props.item.id}
        className={
          'inline-block py-3 flex-auto cursor-pointer select-none break-all  ' +
          `${props.item.isFinished ? 'line-through decoration-gray-500' : ''}`
        }
      >
        {props.item.title}
      </label>
    </li>
  );
};

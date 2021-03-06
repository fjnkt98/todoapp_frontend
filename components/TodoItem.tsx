import React from 'react';
import recoil from 'recoil';
import { Todo } from '../types/todo';
import { todoItemsState } from './Content';
import { TrashIcon } from '@heroicons/react/outline';

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

  /**
   * A function that deletes a todo item from list of todo items
   */
  const deleteTodoItem = (): void => {
    setTodoItems((prev: Todo[]) =>
      prev.filter((item) => item.id !== props.item.id)
    );
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
        className="mx-4 inline-block h-6 w-6 rounded-xl border-gray-300 text-teal-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50"
        onChange={updateTodoItem}
      />
      <label
        htmlFor={props.item.id}
        className={
          'inline-block flex-auto cursor-pointer select-none break-all py-3  ' +
          `${props.item.isFinished ? 'line-through decoration-gray-500' : ''}`
        }
      >
        {props.item.title}
      </label>
      <button onClick={() => deleteTodoItem()}>
        <TrashIcon className="h-5 w-5 text-gray-400" />
      </button>
    </li>
  );
};

import React from 'react';
import recoil from 'recoil';
import { todoItemsState } from './Content';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types/todo';

/**
 * React component of the box for text input
 */
export const TextInputBox: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const inputTextRef = React.useRef<HTMLInputElement>(null!);

  // Recoil atom setter-or-updater that update list of todo items
  const setTodoItems = recoil.useSetRecoilState(todoItemsState);

  /**
   * A function that adds a todo item into the list of todo items, and clear input field
   */
  const addNewTodoItem = (): void => {
    // Prevent to be added the todo item that have empty title
    if (inputTextRef.current.value === '') return;

    setTodoItems((prev: Todo[]) => {
      // Add new todo item into the end of list of todo items
      return [
        ...prev,
        {
          id: uuidv4(),
          title: inputTextRef.current.value,
          isFinished: false,
        },
      ];
    });

    // Clear content of text box
    inputTextRef.current.value = '';
  };

  return (
    <>
      <div className="flex flex-row items-center my-2">
        <input
          type="text"
          className="inline-block appearance-none rounded-l border border-2 border-gray-500 px-2 py-1 my-1 text-gray-700 focus:border-blue-500 focus:border-2 focus:outline-none"
          placeholder="Enter New Todo"
          ref={inputTextRef}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addNewTodoItem();
            }
          }}
        />
        <button
          type="button"
          className="inline-block px-3 py-1 bg-teal-500 border border-2 border-teal-500 text-white rounded-r "
          onClick={() => {
            addNewTodoItem();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

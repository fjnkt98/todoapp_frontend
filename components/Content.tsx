import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Pages } from '../types/pages';
import { Todo } from '../types/todo';

// Type definition for this React component
interface Props {
  page: string;
}

// Default todo items
const defaultTodos: Todo[] = [
  {
    id: uuidv4(),
    title: 'Create todo app interface layout using simple HTML',
    completed: true,
  },
  {
    id: uuidv4(),
    title: 'Decorate todo app interface using vanilla CSS',
    completed: true,
  },
  {
    id: uuidv4(),
    title: 'Decorate todo app interface using Tailwind CSS',
    completed: true,
  },
  {
    id: uuidv4(),
    title: 'Develop todo app using React',
    completed: false,
  },
];

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

// Tailwind CSS style classes for active link tab
const activeTabStyle =
  'block bg-white border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold text-center';
// Tailwind CSS style classes for passive link tab
const passiveTabStyle =
  'block bg-white rounded-t py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold text-center';

export const Content: React.VFC<Props> = (props) => {
  const [todos, setTodos] = React.useState<Todo[]>(defaultTodos);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex flex-row items-center my-2">
            <input
              type="text"
              className="inline-block appearance-none rounded-l border border-2 border-gray-500 px-2 py-1 my-1 text-gray-700 focus:border-blue-500 focus:border-2 focus:outline-none"
              placeholder="Enter New Todo"
            />
            <button
              type="button"
              className="inline-block px-3 py-1 bg-teal-500 border border-2 border-teal-500 text-white rounded-r "
            >
              GO
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <ul className="flex flex-row justify-between border-b">
            {Object.keys(pages).map((page, index) => {
              if (page === props.page) {
                return (
                  <li className="-mb-px flex-1" key={index}>
                    <Link href={`/${page === 'index' ? '' : page}`} key={index}>
                      <a className={activeTabStyle}>{pages[page].title}</a>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li className="flex-1" key={index}>
                    <Link href={`/${page === 'index' ? '' : page}`} key={index}>
                      <a className={passiveTabStyle}>{pages[page].title}</a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <ul className="max-w-lg mx-auto">
          {todos.map(({ id, title, completed }, index) => (
            <li
              className="flex flex-wrap items-center py-3 border-b border-gray-200"
              key={id}
            >
              <label className="inline-block cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={completed}
                  className="inline-block mx-4 cursor-pointer form-check"
                  onChange={() => {
                    const changedTodos = [...todos];
                    changedTodos[index].completed =
                      !changedTodos[index].completed;
                    setTodos(changedTodos);
                  }}
                />
                {title}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
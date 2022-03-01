import React from 'react';
import recoil from 'recoil';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Pages } from '../types/pages';
import { Todo } from '../types/todo';

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
  ],
});

export const activeTodoItemsState = recoil.selector({
  key: 'activeTodoItemsState',
  get: ({ get }) => {
    const todoItems = get(todoItemsState);
    return todoItems.filter((item) => item.completed === false);
  },
});

export const finishedTodoItemsState = recoil.selector({
  key: 'finishedTodoItemsState',
  get: ({ get }) => {
    const todoItems = get(todoItemsState);

    return todoItems.filter((item) => item.completed === true);
  },
});

export const Content: React.VFC<Props> = (props) => {
  const [todoItems, setTodoItems] = recoil.useRecoilState(todoItemsState);

  const [inputText, setInputText] = React.useState<string>('');
  const inputTextRef = React.useRef<HTMLInputElement>(null!);

  let todoListView: Todo[] = [];
  switch (props.page) {
    case 'index':
      todoListView = [...todoItems];
      break;
    case 'active':
      todoListView = recoil.useRecoilValue(activeTodoItemsState);
      break;
    case 'finished':
      todoListView = recoil.useRecoilValue(finishedTodoItemsState);
      break;
    default:
      todoListView = [...todoItems];
      break;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex flex-row items-center my-2">
            <input
              type="text"
              className="inline-block appearance-none rounded-l border border-2 border-gray-500 px-2 py-1 my-1 text-gray-700 focus:border-blue-500 focus:border-2 focus:outline-none"
              placeholder="Enter New Todo"
              ref={inputTextRef}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();

                  setTodoItems((prev: Todo[]) => {
                    return [
                      ...prev,
                      {
                        id: uuidv4(),
                        title: inputText,
                        completed: false,
                      },
                    ];
                  });

                  inputTextRef.current.value = '';
                }
              }}
              onChange={({ target: { value } }) => {
                setInputText(value);
              }}
            />
            <button
              type="button"
              className="inline-block px-3 py-1 bg-teal-500 border border-2 border-teal-500 text-white rounded-r "
              onClick={() => {
                if (inputText === '') return;

                setTodoItems((prev: Todo[]) => {
                  return [
                    ...prev,
                    {
                      id: uuidv4(),
                      title: inputText,
                      completed: false,
                    },
                  ];
                });

                inputTextRef.current.value = '';
                setInputText('');
              }}
            >
              GO
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <ul className="flex flex-row justify-between border-b">
            {Object.keys(pages).map((page, index) => {
              return (
                <li
                  className={`${page === 'index' ? '-mb-px flex-1' : 'flex-1'}`}
                  key={index}
                >
                  <Link href={`/${page === 'index' ? '' : page}`}>
                    <a
                      className={`${
                        page === props.page
                          ? ' block bg-white border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold text-center'
                          : 'block bg-white rounded-t py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold text-center'
                      }`}
                    >
                      {pages[page].title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="max-w-lg mx-auto">
          {todoListView.map(({ id, title, completed }) => (
            <li
              className="flex flex-wrap items-center py-3 border-b border-gray-200"
              key={id}
            >
              <label className="inline-block cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={completed}
                  className="inline-block mx-4 h-6 w-6 rounded-xl border-gray-300 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 text-teal-500"
                  onChange={() => {
                    setTodoItems((prev: Todo[]) => {
                      const index = prev.findIndex((item) => item.id === id);
                      return [
                        ...prev.slice(0, index),
                        {
                          ...prev[index],
                          completed: !prev[index].completed,
                        },
                        ...prev.slice(index + 1),
                      ];
                    });
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

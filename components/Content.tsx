import React from 'react';
import recoil from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Pages } from '../types/pages';
import { Todo } from '../types/todo';
import { TextInputBox } from '../components/TextInputBox';
import { ListTab } from '../components/ListTab';

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
  const [todoItems, setTodoItems] = recoil.useRecoilState(todoItemsState);

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
          <TextInputBox />
        </div>

        <ListTab currentPage={props.page} pages={pages} />

        <ul className="max-w-lg mx-auto">
          {todoListView.map(({ id, title, isFinished }) => (
            <li
              className="flex flex-wrap items-center py-3 border-b border-gray-200"
              key={id}
            >
              <label
                className={
                  'inline-block cursor-pointer select-none ' +
                  `${isFinished ? 'line-through decoration-gray-500' : ''}`
                }
              >
                <input
                  type="checkbox"
                  checked={isFinished}
                  className="inline-block mx-4 h-6 w-6 rounded-xl border-gray-300 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 text-teal-500"
                  onChange={() => {
                    setTodoItems((prev: Todo[]) => {
                      const index = prev.findIndex((item) => item.id === id);
                      return [
                        ...prev.slice(0, index),
                        {
                          ...prev[index],
                          isFinished: !prev[index].isFinished,
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

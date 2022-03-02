import React from 'react';
import Link from 'next/link';
import { Pages } from '../types/pages';

type Props = {
  currentPage: string;
  pages: Pages;
};

/**
 * React component of the tab of list view
 */
export const ListTab: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="max-w-lg mx-auto">
        <ul className="flex flex-row justify-between border-b">
          {Object.keys(props.pages).map((page) => (
            <li
              className={`${page === 'index' ? '-mb-px flex-1' : 'flex-1'}`}
              key={page}
            >
              <Link href={`/${page === 'index' ? '' : page}`}>
                <a
                  className={`${
                    page === props.currentPage
                      ? ' block bg-white border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold text-center'
                      : 'block bg-white rounded-t py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold text-center'
                  }`}
                >
                  {props.pages[page].title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

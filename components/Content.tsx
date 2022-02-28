import React from 'react';
import Link from 'next/link';

interface Props {
  page: string;
}

export const Content: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="container mx-auto p-4 border border-red-500">
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
          <ul className="flex flex-wrap border-b">
            <li className="-mb-px mr-1" key={1}>
              <Link href={'/'}>
                <a className="inline-block bg-white border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold">
                  All Todo
                </a>
              </Link>
            </li>
            <li className="mr-1" key={2}>
              <Link href={'/active'}>
                <a className="inline-block bg-white rounded-t py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold">
                  Active Todo
                </a>
              </Link>
            </li>
            <li className="mr-1" key={3}>
              <Link href={'/completed'}>
                <a className="inline-block bg-white rounded-t py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold">
                  Completed Todo
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

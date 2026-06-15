import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAppStore } from '../../store';

export function Header() {
  const { sidebarOpen, setSidebarOpen, user } = useAppStore();

  return (
    <header className="flex h-16 shrink-0 border-b border-slate-200 bg-white items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 z-10 relative">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-700 hover:text-slate-900"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sr-only">Toggle sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
        <form className="relative flex flex-1 max-w-md" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 pl-2"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-10 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent outline-none"
            placeholder="Search leads, properties, deals..."
            type="search"
            name="search"
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />

          {/* Profile dropdown Placeholder */}
          <div className="flex items-center gap-x-4">
            <img
              className="h-8 w-8 rounded-full bg-slate-50"
              src={user?.avatar || "https://ui-avatars.com/api/?name=User+Name"}
              alt=""
            />
            <span className="hidden lg:flex lg:items-center">
              <span className="ml-2 text-sm font-semibold leading-6 text-slate-900" aria-hidden="true">
                {user?.firstName} {user?.lastName}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

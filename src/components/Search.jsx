'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '../store';

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const setSearch = useStore((state) => state.setSearch);
  const [input, setInput] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    setSearch(input);
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set('query', input);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative flex flex-1 flex-shrink-0 mr-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
        <MagnifyingGlassIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
}

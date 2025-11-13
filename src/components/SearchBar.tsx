import type { Dispatch, SetStateAction } from "react";

type Props = {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ query, setQuery }: Props) {
    return (
        <div className="flex justify-center my-8 sticky top-0 bg-gray-950/80 backdrop-blur-sm py-4 z-10">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full max-w-md rounded-lg bg-gray-900 text-gray-200 px-4 py-2 border border-gray-700
                           focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
            />
        </div>
    );
}

import { memo } from "react";
import type { ChangeEvent } from "react";

type SearchBarProps = {
    query: string;
    onQueryChange: (value: string) => void;
    placeholder?: string;
};

const SearchBarComponent = ({
    query,
    onQueryChange,
    placeholder = "Search...",
}: SearchBarProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onQueryChange(event.target.value);
    };

    return (
        <div className="flex justify-center my-8 sticky top-0 bg-gray-950/80 backdrop-blur-sm py-4 z-10">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label="Search items"
                className="w-full max-w-md rounded-lg bg-gray-900 text-gray-200 px-4 py-2 border border-gray-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
            />
        </div>
    );
};

export default memo(SearchBarComponent);
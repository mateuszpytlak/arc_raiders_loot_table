interface SearchBarProps {
    query: string;
    setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

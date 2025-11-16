import type { MouseEventHandler } from "react";

type SettingsButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function SettingsButton({ onClick }: SettingsButtonProps) {
    return (
        <div className="group fixed top-6 right-6 z-30">
            <button
                onClick={onClick}
                aria-label="Open workbench settings"
                className="cursor-pointer bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="button"
            >
                ⚙️
            </button>

            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-200 whitespace-nowrap shadow-lg">
                Set your workbench levels
            </div>
        </div>
    );
}
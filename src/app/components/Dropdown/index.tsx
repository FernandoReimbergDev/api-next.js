import React from "react";

type DropdownProps = {
    text: string;
    children: React.ReactNode;
};

export default function Dropdown({ text, children }: DropdownProps) {
    return (
        <div className="relative group inline-block">
            <button className="text-white">
                {text}
            </button>
            <div className="absolute left-0 w-48 bg-transparent rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                <div className="pt-4">
                    <ul className="rounded bg-white py-2 flex flex-col">{children}</ul>
                </div>
            </div>
        </div>
    );
}

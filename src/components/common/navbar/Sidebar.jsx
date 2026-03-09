"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

const Sidebar = ({
    isOpen,
    setIsOpen,
    categories,
    getSubCategories,
    user,
    switchRole,
}) => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    return (
        <div
            className={`fixed inset-0 bg-black/60 z-[110] transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`fixed top-0 left-0 h-screen w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } flex flex-col`}
            >
                <div className="p-6 border-b flex justify-end items-center bg-white sticky top-0 z-10">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-secondary/5 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex flex-col gap-4 border-b pb-6">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            href="/shop"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium"
                        >
                            Shop All
                        </Link>

                        {user.role === "B2B" && (
                            <Link
                                href="/bulk"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium"
                            >
                                Bulk Order
                            </Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="flex items-center justify-between w-full text-[11px] font-bold text-primary uppercase tracking-widest"
                        >
                            Categories
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${isCategoryOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isCategoryOpen && (
                            <div className="space-y-4">
                                {categories.map((cat) => (
                                    <div key={cat} className="space-y-2">
                                        <Link
                                            href={`/shop?category=${cat.toLowerCase()}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-md font-semibold text-secondary block"
                                        >
                                            {cat}
                                        </Link>

                                        <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-secondary/5">
                                            {getSubCategories(cat).map((sub) => (
                                                <Link
                                                    key={sub}
                                                    href={`/shop?category=${cat.toLowerCase()}&sub=${sub.toLowerCase()}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-sm text-secondary/60 hover:text-primary"
                                                >
                                                    {sub}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-secondary/5 border-t">
                    <button
                        onClick={() =>
                            switchRole(user.role === "B2C" ? "B2B" : "B2C")
                        }
                        className="w-full py-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded-sm"
                    >
                        Switch to {user.role === "B2C" ? "B2B" : "B2C"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
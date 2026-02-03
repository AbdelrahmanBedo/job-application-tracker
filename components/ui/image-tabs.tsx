"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function ImageTabs(){
    const[activeTab,setActiveTab]=useState("organize"); // Initialized with a default tab
    return(
        <section className="border-t bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex gap-2 justify-center mb-8">
                        <Button onClick={()=>setActiveTab("organize")} // Removed unused 's' parameter
                                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                                    activeTab == "organize"
                                        ? "bg-primary text-white"
                                        :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Organize Applications
                        </Button>
                        <Button onClick={()=>setActiveTab("hired")} // Removed unused 's' parameter
                                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                                    activeTab == "hired"
                                        ? "bg-primary text-white"
                                        :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Get Hired
                        </Button>
                        <Button onClick={()=>setActiveTab("boards")} // Removed unused 's' parameter
                                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                                    activeTab == "boards"
                                        ? "bg-primary text-white"
                                        :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Manage Boards
                        </Button>
                    </div>
                </div>
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border">
                    {activeTab === "organize" && (
                        <Image
                            src="/hero1.png"
                            alt="Organize Applications"
                            width={1200}
                            height={800}
                        />
                    )}
                    {activeTab === "hired" && (
                        <Image
                            src="/hero2.png"
                            alt="Organize Applications"
                            width={1200}
                            height={800}
                        />
                    )}
                    {activeTab === "boards" && (
                        <Image
                            src="/hero3.png"
                            alt="Organize Applications"
                            width={1200}
                            height={800}
                        />
                    )}
                </div>
            </section>)
}
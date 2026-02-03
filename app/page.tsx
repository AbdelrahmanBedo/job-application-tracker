"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import {useState} from "react"; // Corrected import for Next.js Link component
export default function Home() {
  const[activeTab,setActiveTab]=useState("");
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/*Hero Section*/}
        <section className="container mx-auto px-4 py-32">
            <div className="mx-auto max_w-4xl text-center">
                <h1 className="text-black mb-6 text-6xl font-bold">
                    A better way to track your job application.
                </h1>
                <p className="text-muted-foreground mb-10 text-xl">
                    Capture,organize,and manage your job search in one place.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <Link href="/sign-up">
                        <Button variant="default" size="lg" className="h-12 px-8 text-lg font-medium">
                            Start for free <ArrowRight className="ml-2"/>
                        </Button>
                    </Link>
                <p>Free forever. No credit card required.</p>
                </div>
            </div>
        </section>
          {/*Hero Images Section with Tabs*/}
          <section className="border-t bg-white py-16">
              <div className="container mx-auto px-4">
                  <div className="flex gap-2 justify-center mb-8">
                      <Button onClick={(s)=>setActiveTab("organize")}
                              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                                  activeTab == "organize" 
                                      ? "bg-primary text-white"
                                      :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                      >
                          Organize Applications
                      </Button>
                      <Button onClick={(s)=>setActiveTab("hired")}
                              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                                  activeTab == "hired"
                                      ? "bg-primary text-white"
                                      :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                      >
                          Get Hired
                      </Button>
                      <Button onClick={(s)=>setActiveTab("boards")}
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
          </section>
      </main>
    </div>
  );
}

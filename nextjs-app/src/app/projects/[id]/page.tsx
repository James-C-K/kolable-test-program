import { Navbar } from "@/components/Navbar";
import { mockProjects } from "@/lib/mockData";
import { Badge, Button, Card } from "@/components/ui/core";
import { ChevronLeft, Info, Share2, Wallet } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectDetail({ params }: { params: { id: string } }) {
    const project = mockProjects.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    const progress = (project.currentAmount / project.targetAmount) * 100;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-foreground/50 hover:text-primary mb-8 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold">{project.title}</h1>
                            <p className="text-xl text-foreground/60">{project.subtitle}</p>
                        </div>

                        <div className="aspect-video w-full rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <span className="text-foreground/20 font-bold text-2xl uppercase tracking-widest">Project Media Placeholder</span>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">About the Project</h2>
                            <p className="text-foreground/70 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-foreground/70 leading-relaxed">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card className="p-6 sticky top-24">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-primary">${project.currentAmount.toLocaleString()}</div>
                                    <div className="text-sm text-foreground/50">pledged of ${project.targetAmount.toLocaleString()} goal</div>
                                </div>

                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-accent"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="text-xl font-bold">1,240</div>
                                        <div className="text-xs text-foreground/40 uppercase tracking-tighter">Backers</div>
                                    </div>
                                    <div className="space-y-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                        <div className="text-xl font-bold">14</div>
                                        <div className="text-xs text-foreground/40 uppercase tracking-tighter">Days Left</div>
                                    </div>
                                </div>

                                <Button className="w-full text-lg h-14 bg-primary hover:scale-[1.02] transition-transform">
                                    Back this Project
                                </Button>

                                <div className="flex gap-4">
                                    <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 p-3 hover:bg-white/5 transition-colors">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-sm font-medium">Share</span>
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 p-3 hover:bg-white/5 transition-colors">
                                        <Info className="h-4 w-4" />
                                        <span className="text-sm font-medium">Report</span>
                                    </button>
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg px-2">Reward Tiers</h3>
                            {project.plans.map((plan) => (
                                <Card key={plan.id} className="p-5 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold group-hover:text-primary transition-colors">{plan.title}</h4>
                                        <div className="text-lg font-bold">${plan.salePrice}</div>
                                    </div>
                                    <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
                                    <Button className="w-full bg-primary/20 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                                        Select this Tier
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

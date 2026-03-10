import { Card, Badge, Button } from "./ui/core";
import { TrendingUp, Users } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        subtitle: string;
        targetAmount: number;
        currentAmount: number;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const progress = (project.currentAmount / project.targetAmount) * 100;

    return (
        <Card className="overflow-hidden group">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                    <TrendingUp className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                    <h3 className="text-xl font-bold line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-foreground/60 line-clamp-2 mt-1">{project.subtitle}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-foreground/50">
                        <span>${project.currentAmount.toLocaleString()}</span>
                        <span>Target: ${project.targetAmount.toLocaleString()}</span>
                    </div>
                </div>
                <Link href={`/projects/${project.id}`}>
                    <Button className="w-full bg-white/5 hover:bg-white/10 text-foreground border border-white/10">
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
}

import { Card, Badge, Button } from "./ui/core";
import { Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProgramCardProps {
    program: {
        id: string;
        title: string;
        description: string;
        sale_price: number;
        cover_url: string;
        instructor_data: { name: string };
    };
}

export function ProgramCard({ program }: ProgramCardProps) {
    return (
        <Card className="overflow-hidden group">
            <div className="relative aspect-video w-full overflow-hidden">
                <img
                    src={program.cover_url}
                    alt={program.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <Badge className="bg-black/50 backdrop-blur-md border-white/10">
                        Best Seller
                    </Badge>
                </div>
            </div>
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {program.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">by {program.instructor_data.name}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold">4.9</span>
                        <span className="text-foreground/40 font-normal">(128)</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                        ${program.sale_price.toLocaleString()}
                    </div>
                </div>
                <Link href={`/programs/${program.id}`}>
                    <Button className="w-full">Enroll Now</Button>
                </Link>
            </div>
        </Card>
    );
}

import { Card, Button } from "./ui/core";
import Image from "next/image";
import Link from "next/link";
import type { ProgramSummary } from "@/lib/kolable";

export function ProgramCard({ program }: { program: ProgramSummary }) {
    const instructor = program.program_roles[0]?.member;
    const price = program.sale_price && program.sale_price > 0
        ? program.sale_price
        : program.list_price;

    return (
        <Card className="overflow-hidden group">
            <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                {program.cover_url ? (
                    <Image
                        src={program.cover_url}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                )}
            </div>
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {program.title}
                    </h3>
                    {instructor && (
                        <p className="text-sm text-foreground/60 mt-1">by {instructor.name}</p>
                    )}
                </div>
                {price != null && (
                    <div className="text-lg font-bold text-primary">
                        NT$ {price.toLocaleString()}
                    </div>
                )}
                <Link href={`/programs/${program.id}`}>
                    <Button className="w-full">立即報名</Button>
                </Link>
            </div>
        </Card>
    );
}

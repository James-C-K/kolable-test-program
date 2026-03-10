import Link from "next/link";
import { Rocket, GraduationCap, Menu } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Rocket className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Kolable
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#projects" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                        Projects
                    </Link>
                    <Link href="#programs" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                        Programs
                    </Link>
                    <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                        Connect
                    </button>
                </div>
                <button className="md:hidden">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
}

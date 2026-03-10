import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProgramCard } from "@/components/ProgramCard";
import { mockProjects } from "@/lib/mockData";
import { getPrograms } from "@/lib/kolable";
import { Rocket, GraduationCap, ChevronRight } from "lucide-react";

export default async function Home() {
  const programs = await getPrograms();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Rocket className="h-4 w-4" />
                <span>Next Generation Funding Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Empower Your <span className="bg-gradient-to-r from-primary via-accent to-rose-500 bg-clip-text text-transparent">Ideas</span> with Kolable
              </h1>
              <p className="text-xl text-foreground/60 mb-8 max-w-2xl leading-relaxed">
                Unlock the potential of your projects and programs. Connect with contributors, learners, and mentors in one unified ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Explore Projects
                </button>
                <button className="rounded-full bg-white/5 border border-white/10 px-8 py-4 text-lg font-bold hover:bg-white/10 transition-colors">
                  Join as Instructor
                </button>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 blur-[120px] bg-gradient-to-br from-primary via-accent to-rose-500 rounded-full translate-x-1/2 -translate-y-1/2" />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Rocket className="h-8 w-8 text-primary" />
                  Featured Projects
                </h2>
                <p className="text-foreground/50 mt-2">Support innovative ideas and get exclusive rewards.</p>
              </div>
              <button className="group flex items-center gap-2 text-sm font-bold text-primary">
                View All <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-20 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-accent" />
                  Popular Programs
                </h2>
                <p className="text-foreground/50 mt-2">Learn from industry experts and advance your career.</p>
              </div>
              <button className="group flex items-center gap-2 text-sm font-bold text-accent">
                View All <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-bold">Kolable</span>
          </div>
          <p className="text-sm text-foreground/40">
            © 2026 Kolable Platform. Built for the future of fundraising and learning.
          </p>
        </div>
      </footer>
    </div>
  );
}

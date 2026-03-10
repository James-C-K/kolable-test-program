import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, PlayCircle, Users, Clock, CheckCircle, Lock, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Badge, Button, Card } from '@/components/ui/core';
import {
  getProgram,
  formatDuration,
  parseDraftJsDescription,
  type ProgramContentSection,
} from '@/lib/kolable';

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = await getProgram(id);
  if (!program) notFound();

  const description = parseDraftJsDescription(program.description);
  const instructors = program.program_roles.map((r) => r.member);

  const totalSections = program.program_content_sections.length;
  const totalUnits = program.program_content_sections.reduce(
    (sum, s) => sum + s.program_contents.length,
    0
  );
  const totalSeconds = program.program_content_sections
    .flatMap((s) => s.program_contents)
    .reduce((sum, c) => sum + (c.duration ?? 0), 0);

  const displayPrice =
    program.sale_price != null && program.sale_price > 0
      ? program.sale_price
      : program.list_price;
  const hasDiscount =
    program.sale_price != null &&
    program.sale_price > 0 &&
    program.list_price != null &&
    program.list_price > program.sale_price;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-foreground/50 hover:text-accent mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Programs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Main Content ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Header */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{program.title}</h1>

              {program.abstract && (
                <p className="text-xl text-foreground/60 leading-relaxed">{program.abstract}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6">
                {program.views > 0 && (
                  <div className="flex items-center gap-1.5 text-foreground/50">
                    <Users className="h-5 w-5" />
                    <span>{program.views.toLocaleString()} 次觀看</span>
                  </div>
                )}
                {totalSeconds > 0 && (
                  <div className="flex items-center gap-1.5 text-foreground/50">
                    <Clock className="h-5 w-5" />
                    <span>共 {formatDuration(totalSeconds)}</span>
                  </div>
                )}
                {totalUnits > 0 && (
                  <div className="flex items-center gap-1.5 text-foreground/50">
                    <PlayCircle className="h-5 w-5" />
                    <span>{totalSections} 章節・{totalUnits} 單元</span>
                  </div>
                )}
              </div>

              {/* Instructors mini */}
              {instructors.length > 0 && (
                <div className="flex flex-col gap-3 py-4 border-y border-white/5">
                  {instructors.map((ins) => (
                    <div key={ins.id} className="flex items-center gap-4">
                      {ins.picture_url ? (
                        <Image
                          src={ins.picture_url}
                          alt={ins.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      )}
                      <div>
                        <div className="text-sm text-foreground/40 font-medium">講師</div>
                        <div className="font-bold flex items-center gap-1">
                          {ins.name}
                          <CheckCircle className="h-3 w-3 text-blue-400" />
                        </div>
                        {ins.title && (
                          <div className="text-sm text-foreground/50">{ins.title}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">課程介紹</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}

            {/* Curriculum */}
            {totalSections > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">課程大綱</h2>
                <p className="text-sm text-foreground/50">
                  共 {totalSections} 章節・{totalUnits} 單元
                  {totalSeconds > 0 && `・${formatDuration(totalSeconds)}`}
                </p>
                <div className="space-y-2">
                  {program.program_content_sections.map((sec: ProgramContentSection) => (
                    <CurriculumSection key={sec.id} section={sec} />
                  ))}
                </div>
              </div>
            )}

            {/* Instructors detail */}
            {instructors.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">講師介紹</h2>
                {instructors.map((ins) => (
                  <Card key={ins.id} className="p-6">
                    <div className="flex gap-5 items-start">
                      {ins.picture_url ? (
                        <Image
                          src={ins.picture_url}
                          alt={ins.name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      )}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{ins.name}</h3>
                        {ins.title && (
                          <p className="text-sm text-accent font-medium">{ins.title}</p>
                        )}
                        {ins.abstract && (
                          <p className="text-sm text-foreground/60 leading-relaxed">{ins.abstract}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <div className="space-y-8">
            <Card className="overflow-hidden sticky top-24 border-accent/20">
              {/* Cover / Preview */}
              <div className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer overflow-hidden">
                {program.cover_url ? (
                  <Image
                    src={program.cover_url}
                    alt={program.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                )}
                <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:scale-110 transition-transform relative z-10" />
                <div className="absolute bottom-4 text-white font-bold text-sm z-10">預覽課程</div>
              </div>

              <div className="p-8 space-y-6">
                {/* Price */}
                <div className="flex items-baseline gap-3">
                  {displayPrice != null ? (
                    <>
                      <div className="text-4xl font-bold text-accent">
                        NT$ {displayPrice.toLocaleString()}
                      </div>
                      {hasDiscount && (
                        <div className="text-lg text-foreground/40 line-through">
                          NT$ {program.list_price!.toLocaleString()}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-4xl font-bold text-accent">免費</div>
                  )}
                </div>

                {hasDiscount && program.list_price && displayPrice != null && (
                  <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20">
                    省 NT$ {(program.list_price - displayPrice).toLocaleString()}
                  </Badge>
                )}

                <div className="space-y-3">
                  <Button className="w-full text-lg h-14 bg-accent text-accent-foreground hover:scale-[1.02] transition-transform">
                    立即購買
                  </Button>
                  <Button className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10">
                    加入購物車
                  </Button>
                </div>

                <div className="text-center text-xs text-foreground/40">
                  30 天退款保證
                </div>

                {/* Course includes */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="text-sm font-bold">本課程包含：</div>
                  <ul className="space-y-3 text-sm text-foreground/60">
                    {totalUnits > 0 && (
                      <li className="flex items-center gap-3">
                        <PlayCircle className="h-4 w-4" />
                        {totalUnits} 個影音單元
                      </li>
                    )}
                    {totalSeconds > 0 && (
                      <li className="flex items-center gap-3">
                        <Clock className="h-4 w-4" />
                        {formatDuration(totalSeconds)} 課程內容
                      </li>
                    )}
                    <li className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      社群討論區
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Sub-component: Curriculum Section ────────────────────────────────────────

function CurriculumSection({ section }: { section: ProgramContentSection }) {
  const sectionTotalSeconds = section.program_contents.reduce(
    (sum, c) => sum + (c.duration ?? 0),
    0
  );

  return (
    <details className="group rounded-xl border border-white/10 overflow-hidden" open>
      <summary className="flex items-center justify-between p-4 bg-white/[0.03] cursor-pointer list-none hover:bg-white/[0.06] transition-colors">
        <div className="flex items-center gap-3">
          <ChevronDown className="h-4 w-4 text-foreground/50 transition-transform group-open:rotate-180" />
          <span className="font-semibold">{section.title}</span>
        </div>
        <div className="text-xs text-foreground/40 ml-4 whitespace-nowrap">
          {section.program_contents.length} 單元
          {sectionTotalSeconds > 0 && ` · ${formatDuration(sectionTotalSeconds)}`}
        </div>
      </summary>
      {section.description && (
        <p className="px-4 pt-2 pb-0 text-sm text-foreground/50">{section.description}</p>
      )}
      <ul>
        {section.program_contents.map((content) => {
          const isFree = !!content.published_at;
          return (
            <li
              key={content.id}
              className="flex items-center gap-3 px-4 py-3 border-t border-white/5 text-sm"
            >
              {isFree ? (
                <PlayCircle className="h-4 w-4 text-accent flex-shrink-0" />
              ) : (
                <Lock className="h-4 w-4 text-foreground/30 flex-shrink-0" />
              )}
              <span className={isFree ? 'text-foreground/80' : 'text-foreground/40'}>
                {content.title}
              </span>
              {content.duration != null && (
                <span className="ml-auto text-xs text-foreground/30 whitespace-nowrap">
                  {formatDuration(content.duration)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

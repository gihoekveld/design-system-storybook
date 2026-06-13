import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Code2, Copy, ExternalLink, Menu, Play, X } from "lucide-react";

export const STORYBOOK_URL = "https://gihoekveld.github.io/ignite-call-design-system";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Storybook para React — Do Caos à Produtividade" },
      { name: "description", content: "Uma jornada visual: como Design Systems e Storybook transformam caos em padronização, documentação e produtividade." },
      { property: "og:title", content: "Storybook para React — Do Caos à Produtividade" },
      { property: "og:description", content: "Storytelling visual sobre Design Systems e Storybook." },
    ],
  }),
  component: Presentation,
});

/* ---------- helpers ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 800ms cubic-bezier(.2,.7,.2,1), transform 800ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {children}
    </div>
  );
}

function ChapterLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="font-mono text-xs tracking-[0.3em] text-primary">CH · {n}</div>
      <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
      <div className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">{title}</div>
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative min-h-screen px-6 md:px-12 py-24 md:py-32 ${className}`}>
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

/* ---------- presentation ---------- */
function Presentation() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-border/40">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-cyber"
          style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
        />
      </div>

      <FloatingNav />
      <StorybookCTA />

      <Hero />
      <ChapterAcademic />
      <ChapterSummary />

      <ModuleBanner n="01" title="O Problema e o Surgimento dos Design Systems" time="10–15 min" />
      <ChapterProblem />
      <ChapterInconsistency />

      <ModuleBanner n="02" title="Design Systems e Documentação" time="10–15 min" />
      <ChapterDesignSystem />
      <ChapterDSComposition />
      <ChapterDSMotivation />
      <ChapterDSExamples />
      <ChapterAtomicDesign />
      <ChapterWhatBelongs />
      <ChapterNewProblem />
      <QuizModule2 />

      <ModuleBanner n="03" title="Introdução ao Storybook" time="10–15 min" />
      <ChapterStorybookIntro />
      <ChapterStorybookWhat />
      <ChapterHistory />
      <ChapterFrameworks />
      <ChapterCompanies />
      <ChapterReferences />
      <QuizModule3 />

      <ModuleBanner n="04" title="Storybook na Prática" time="10–15 min" />
      <ChapterInstall />
      <ChapterStructure />
      <ChapterStory />
      <AdvancedReveal>
        <ChapterArgsDecorators />
        <ChapterStoryDescriptions />
        <ChapterCanvasVsDocs />
        <ChapterUI />
        <ChapterDocs />
        <ChapterAddons />
        <ChapterRealStorybook />
      </AdvancedReveal>
      <ChapterTestsIntro />
      <ChapterPlay />
      <ChapterOtherTests />
      <ChapterCICD />
      <ChapterResolved />
      <ChapterCompare />
      <ChapterExample />
      <ChapterFlow />
      <QuizModule4 />
      <ChapterConclusion />


      <footer className="px-6 py-12 text-center text-xs font-mono text-muted-foreground border-t border-border/40">
        END · TRANSMISSION · 2026
      </footer>
    </main>
  );
}

/* ---------- permanent CTA to real Storybook ---------- */
function StorybookCTA() {
  return (
    <a
      href={STORYBOOK_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Abrir Storybook real em nova aba"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full px-4 py-3 font-mono text-[11px] uppercase tracking-widest bg-primary text-primary-foreground hover:scale-105 transition-transform"
      style={{ boxShadow: "var(--shadow-glow)" }}
    >
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      Ver Storybook Real
      <ExternalLink className="w-3.5 h-3.5" />
    </a>
  );
}


/* ---------- floating navigation ---------- */
type NavItem = { id: string; label: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Introdução",
    items: [
      { id: "ch-0", label: "Abertura" },
      { id: "ch-academic", label: "Contexto acadêmico" },
      { id: "ch-summary", label: "Sumário" },
    ],
  },
  {
    title: "Módulo 1 — O Problema",
    items: [
      { id: "ch-1", label: "O início de tudo" },
      { id: "ch-2", label: "Quatro times, um botão" },
    ],
  },
  {
    title: "Módulo 2 — Design Systems",
    items: [
      { id: "ch-3", label: "A resposta: Design System" },
      { id: "ch-ds-comp", label: "Do que é composto" },
      { id: "ch-ds-mot", label: "Motivação para adotar" },
      { id: "ch-ds-examples", label: "Exemplos reais" },
      { id: "ch-4", label: "Component-Driven Development" },
      { id: "ch-5", label: "O que pertence ao sistema" },
      { id: "ch-6", label: "Documentação: o novo problema" },
      { id: "quiz-2", label: "Quiz · Módulo 2" },
    ],
  },
  {
    title: "Módulo 3 — Storybook",
    items: [
      { id: "ch-7", label: "Storybook entra em cena" },
      { id: "ch-sb-what", label: "O que é o Storybook" },
      { id: "ch-8", label: "História" },
      { id: "ch-9", label: "Frameworks suportados" },
      { id: "ch-10", label: "Empresas que usam" },
      { id: "ch-refs", label: "Referências oficiais" },
      { id: "quiz-3", label: "Quiz · Módulo 3" },
    ],
  },
  {
    title: "Módulo 4 — Storybook na Prática",
    items: [
      { id: "ch-13", label: "Instalação" },
      { id: "ch-14", label: "Anatomia do projeto" },
      { id: "ch-15", label: "A story (Button)" },
      { id: "ch-advanced", label: "Conteúdo avançado" },
    ],
  },
  {
    title: "Testes",
    items: [
      { id: "ch-20", label: "Testes no Storybook" },
      { id: "ch-21", label: "Função play()" },
      { id: "ch-22", label: "A11y + addons" },
      { id: "ch-23", label: "CI/CD" },
      { id: "ch-11", label: "Antes / Depois" },
      { id: "ch-24", label: "Comparativo" },
    ],
  },
  {
    title: "Demonstração",
    items: [
      { id: "ch-25", label: "Exemplo real" },
      { id: "ch-26", label: "Fluxo completo" },
      { id: "quiz-4", label: "Quiz · Módulo 4" },
    ],
  },
  {
    title: "Conclusão",
    items: [{ id: "ch-27", label: "Mensagem final" }],
  },
];



function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("ch-0");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const all = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    const onScroll = () => {
      let current = all[0];
      for (const id of all) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 120 <= 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-md shadow-lg hover:border-primary/60 hover:text-primary transition-colors"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "fechar" : "menu"}</span>
      </button>

      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[55] bg-background/40 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navegação da apresentação"
        className={`fixed top-0 right-0 z-[58] h-full w-full sm:w-[420px] border-l border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/40">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
                Storybook · 2026
              </div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                Navegação da apresentação
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="mb-7">
                <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-3">
                  {group.title}
                </div>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => go(item.id)}
                          className={`group w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`h-px transition-all ${
                              isActive
                                ? "w-6 bg-primary"
                                : "w-3 bg-current group-hover:w-6"
                            }`}
                          />
                          <span className="flex-1">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="px-6 py-4 border-t border-border/40 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            ESC para fechar
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <Section id="ch-0" className="flex items-center">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "var(--gradient-glow)", animation: "pulse-glow 6s ease-in-out infinite" }} />

      <div className="relative">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.4em] text-primary mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            TRANSMISSÃO · 001 · STORYBOOK
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95] tracking-tight">
            Do <span className="text-gradient italic font-medium">caos</span>
            <br />
            à <span className="text-gradient italic font-medium">produtividade.</span>
          </h1>
        </Reveal>

        <Reveal delay={350}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Uma jornada visual sobre como times de engenharia domesticam a complexidade
            — com Design Systems e Storybook como protagonistas.
          </p>
        </Reveal>

        <Reveal delay={550}>
          <div className="mt-16 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2"><span className="text-primary">●</span> caos</div>
            <span>→</span><div>organização</div>
            <span>→</span><div>padronização</div>
            <span>→</span><div>docs</div>
            <span>→</span><div className="text-accent">storybook</div>
            <span>→</span><div className="text-neon">produtividade</div>
          </div>
        </Reveal>

        <Reveal delay={750}>
          <a href="#ch-1" className="mt-20 inline-flex items-center gap-3 text-sm font-mono tracking-widest text-primary group">
            <span className="w-12 h-px bg-primary group-hover:w-20 transition-all" />
            INICIAR JORNADA
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 01 PROBLEMA ---------- */
function ChapterProblem() {
  return (
    <Section id="ch-1">
      <ChapterLabel n="01" title="o início de tudo" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light leading-tight max-w-4xl">
          Toda empresa começa <span className="text-gradient italic">pequena.</span>
        </h2>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-8 items-start">
        <Reveal>
          <div className="glass rounded-2xl p-8">
            <div className="font-mono text-xs text-primary tracking-widest mb-6">ESTADO · INICIAL</div>
            <div className="space-y-4">
              {[["3", "desenvolvedores"], ["1", "designer"], ["1", "produto"]].map(([n, l]) => (
                <div key={l} className="flex items-baseline gap-6">
                  <div className="font-display text-5xl font-light text-primary tabular-nums">{n}</div>
                  <div className="text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border/50 text-sm text-muted-foreground">
              Tudo na cabeça. Tudo controlado. Tudo simples.
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/20 rounded-full blur-3xl" />
            <div className="font-mono text-xs text-destructive tracking-widest mb-6 relative">ESTADO · 18 MESES DEPOIS</div>
            <div className="space-y-4 relative">
              {[["47", "desenvolvedores"], ["9", "designers"], ["6", "produtos"], ["12", "times paralelos"]].map(([n, l]) => (
                <div key={l} className="flex items-baseline gap-6">
                  <div className="font-display text-5xl font-light text-destructive tabular-nums">{n}</div>
                  <div className="text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border/50 text-sm text-muted-foreground">
              Nada na cabeça. Nada controlado. Nada simples.
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["inconsistência visual", "componentes duplicados", "retrabalho", "bugs em cascata"].map((p) => (
            <div key={p} className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
              <div className="font-mono text-[10px] text-destructive tracking-widest mb-2">SINTOMA</div>
              <div className="text-sm">{p}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 02 INCONSISTÊNCIA ---------- */
function ChapterInconsistency() {
  const variants = [
    { team: "time · checkout", style: "bg-blue-500 text-white rounded px-4 py-2", label: "Salvar" },
    { team: "time · onboarding", style: "bg-emerald-600 text-white rounded-full px-6 py-3 text-sm", label: "SALVAR" },
    { team: "time · perfil", style: "bg-black text-white rounded-none px-5 py-2 border-2 border-white", label: "salvar" },
    { team: "time · admin", style: "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-5 py-2.5 shadow-lg", label: "Salvar →" },
  ];
  return (
    <Section id="ch-2">
      <ChapterLabel n="02" title="quatro times, um botão" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light max-w-4xl leading-tight">
          O mesmo componente, <span className="text-gradient italic">quatro realidades.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          Sem um repositório compartilhado, cada equipe redesenha o que o vizinho já construiu — com regras diferentes, estilos diferentes e bugs diferentes.
        </p>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-4 gap-6">
        {variants.map((v, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="glass rounded-2xl p-8 flex flex-col items-center gap-6 h-full">
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest">{v.team}</div>
              <div className="flex-1 flex items-center justify-center">
                <button className={v.style}>{v.label}</button>
              </div>
              <div className="w-full pt-4 border-t border-border/50 font-mono text-[10px] text-destructive/80 tracking-widest text-center">⚠ DIVERGE</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={500}>
        <div className="mt-12 text-center font-mono text-sm tracking-widest text-destructive">
          4× CÓDIGO · 4× MANUTENÇÃO · 4× BUGS · 1× FUNÇÃO
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 03 DESIGN SYSTEM ---------- */
function ChapterDesignSystem() {
  return (
    <Section id="ch-3">
      <ChapterLabel n="03" title="a resposta: design system" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-light leading-tight">
            Uma <span className="text-gradient italic">linguagem</span> compartilhada.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Um Design System é o vocabulário visual e funcional da sua organização.
            Define o que é fixo, o que é variável, e o que nunca deve ser reinventado.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-3xl p-8 space-y-6">
            <DSRow label="cores" >
              <div className="flex gap-2">
                {["bg-primary", "bg-accent", "bg-cyber", "bg-neon", "bg-magenta"].map(c => (
                  <div key={c} className={`w-10 h-10 rounded-lg ${c}`} />
                ))}
              </div>
            </DSRow>
            <DSRow label="tipografia">
              <div className="space-y-1">
                <div className="text-3xl font-light">Aa</div>
                <div className="text-xs font-mono text-muted-foreground">Space Grotesk · 300/500/700</div>
              </div>
            </DSRow>
            <DSRow label="espaçamento">
              <div className="flex items-end gap-2">
                {[4, 8, 16, 24, 32].map(s => (
                  <div key={s} className="bg-primary/60 rounded-sm" style={{ width: 12, height: s }} />
                ))}
              </div>
            </DSRow>
            <DSRow label="componentes">
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs">Button</button>
                <input className="px-3 py-1.5 rounded-md bg-input text-xs w-20" placeholder="Input" />
                <div className="px-3 py-1.5 rounded-full bg-accent/30 text-accent-foreground text-xs">Badge</div>
              </div>
            </DSRow>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
function DSRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-3 border-b border-border/40 last:border-0">
      <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</div>
      <div>{children}</div>
    </div>
  );
}

/* ---------- 04 ATOMIC DESIGN (NEW) ---------- */
function ChapterAtomicDesign() {
  const layers = [
    ["atoms", "Button, Input, Icon, Label", "primary"],
    ["molecules", "FormField, SearchBar, Card", "accent"],
    ["organisms", "Header, LoginForm, ProductCard", "neon"],
    ["templates", "Layout das páginas com placeholders", "cyber"],
    ["pages", "Instâncias reais com dados", "magenta"],
  ] as const;
  return (
    <Section id="ch-4">
      <ChapterLabel n="04" title="component-driven development" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-light leading-tight">
            Da <span className="text-gradient italic">molécula</span> à página.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Component-Driven Development é construir UI de baixo para cima.
            Começa pelos átomos, combina em moléculas, organisms — até as páginas.
          </p>
          <p className="mt-4 text-base text-muted-foreground">
            Esse modelo facilita testar cada peça isoladamente antes de combiná-la, e mantém
            o sistema previsível à medida que cresce.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-3">
            {layers.map(([name, desc, color], i) => (
              <div
                key={name}
                className="glass rounded-xl px-6 py-5 flex items-center gap-5"
                style={{ marginLeft: `${i * 16}px` }}
              >
                <div className={`font-display text-3xl font-light tabular-nums ${
                  color === "primary" ? "text-primary" :
                  color === "accent" ? "text-accent" :
                  color === "neon" ? "text-neon" :
                  color === "cyber" ? "text-cyber" : "text-magenta"
                }`}>0{i + 1}</div>
                <div className="flex-1">
                  <div className="font-mono text-sm uppercase tracking-widest">{name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 05 ESCOPO ---------- */
function ChapterWhatBelongs() {
  return (
    <Section id="ch-5">
      <ChapterLabel n="05" title="o que pertence ao sistema" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light max-w-4xl">Nem tudo entra.</h2>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-8">
        <Reveal>
          <div className="rounded-2xl p-8 border border-primary/40 bg-primary/5">
            <div className="font-mono text-xs tracking-widest text-primary mb-6">ENTRA · PRIMITIVOS</div>
            <div className="grid grid-cols-2 gap-3">
              {["Button", "Input", "Modal", "Tooltip", "Avatar", "Select", "Checkbox", "Toast"].map(c => (
                <div key={c} className="glass rounded-lg p-4 font-mono text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="rounded-2xl p-8 border border-muted-foreground/30 bg-muted/20">
            <div className="font-mono text-xs tracking-widest text-muted-foreground mb-6">FICA DE FORA · ESPECÍFICOS</div>
            <div className="space-y-3">
              {[
                ["Dashboard /analytics", "lógica de negócio única"],
                ["Navbar do app X", "ligada ao contexto"],
                ["Página de checkout", "fluxo proprietário"],
                ["Modal de cancelamento", "regra específica"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-border/60 p-4">
                  <div className="font-mono text-sm">{t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="mt-12 text-center text-muted-foreground italic max-w-2xl mx-auto">
          A regra: se um componente serve a <span className="text-primary not-italic">múltiplos contextos</span>, ele pertence. Se serve a apenas um, vive no produto.
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 06 NOVO PROBLEMA ---------- */
function ChapterNewProblem() {
  return (
    <Section id="ch-6">
      <ChapterLabel n="06" title="um novo problema aparece" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light leading-tight max-w-4xl">
          Temos os componentes. <br />
          E agora, <span className="text-gradient italic">como mostrar?</span>
        </h2>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          ["?", "Como visualizar componentes isolados?"],
          ["?", "Como compartilhar com designers e PMs?"],
          ["?", "Como validar todos os estados?"],
          ["?", "Como testar sem montar o app inteiro?"],
        ].map(([q, t], i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="glass rounded-2xl p-8 h-full relative overflow-hidden">
              <div className="text-7xl font-light text-gradient mb-6">{q}</div>
              <div className="text-base text-muted-foreground">{t}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 07 STORYBOOK INTRO ---------- */
function ChapterStorybookIntro() {
  return (
    <Section id="ch-7" className="flex items-center">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <div className="relative w-full">
        <ChapterLabel n="07" title="entra em cena" />
        <Reveal><div className="font-mono text-sm text-primary tracking-widest mb-6">// definição</div></Reveal>
        <Reveal delay={150}>
          <h2 className="text-5xl md:text-8xl font-light leading-[0.95] tracking-tight">
            <span className="text-gradient italic font-medium">Storybook</span>
            <br />é o estúdio
            <br />dos seus componentes.
          </h2>
        </Reveal>
        <Reveal delay={400}>
          <p className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Um ambiente isolado para <span className="text-foreground">desenvolver</span>,{" "}
            <span className="text-foreground">visualizar</span>, <span className="text-foreground">documentar</span> e{" "}
            <span className="text-foreground">testar</span> componentes de UI — fora do contexto da aplicação.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 08 HISTÓRIA (NEW) ---------- */
function ChapterHistory() {
  const timeline = [
    ["2016", "React Storybook", "Arunoda Susiripala lança a primeira versão como projeto open-source focado em React."],
    ["2017", "Storybook 3.0", "Adoção em larga escala. Suporte a Vue chega ao projeto, que muda de nome para apenas Storybook."],
    ["2019", "Addons & Docs", "Versão 5 reformula a UI, padroniza addons e introduz documentação automática."],
    ["2021", "Chromatic Inc.", "Equipe central forma a Chromatic — empresa que mantém o projeto até hoje, 100% open-source."],
    ["2023", "Storybook 7", "Reescrita com Vite, performance dramática, Component Story Format 3 e testes de interação maduros."],
    ["2024+", "Storybook 8", "Foco em performance, testes nativos com Vitest e integração profunda com Next.js, Remix e SvelteKit."],
  ];
  return (
    <Section id="ch-8">
      <ChapterLabel n="08" title="de onde veio" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light max-w-4xl leading-tight">
          Quase uma <span className="text-gradient italic">década</span> de evolução.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          Surgiu como um experimento em 2016 e cresceu para se tornar o padrão de fato
          para desenvolvimento de componentes no front-end moderno.
        </p>
      </Reveal>

      <div className="mt-20 relative">
        <div className="hidden md:block absolute left-[80px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-neon" />
        <div className="space-y-10">
          {timeline.map(([year, title, desc], i) => (
            <Reveal key={year} delay={i * 100}>
              <div className="grid md:grid-cols-[80px_1fr] gap-8 items-start">
                <div className="font-display text-3xl font-light text-primary tabular-nums">{year}</div>
                <div className="glass rounded-2xl p-6 relative">
                  <div className="hidden md:block absolute -left-[14px] top-7 w-3 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 16px oklch(0.78 0.18 195 / 0.7)" }} />
                  <div className="text-xl font-medium mb-2">{title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 09 FRAMEWORKS (NEW) ---------- */
function ChapterFrameworks() {
  const frameworks: { name: string; desc: string; url: string; primary?: boolean }[] = [
    { name: "React (com Vite)", desc: "Setup oficial mais comum hoje — rápido e moderno.", url: "https://storybook.js.org/docs/get-started/frameworks/react-vite/?renderer=react", primary: true },
    { name: "React (com Webpack)", desc: "Setup clássico para projetos React legados.", url: "https://storybook.js.org/docs/get-started/frameworks/react-webpack5/?renderer=react" },
    { name: "Next.js", desc: "Suporte oficial com builder Webpack.", url: "https://storybook.js.org/docs/get-started/frameworks/nextjs/?renderer=react" },
    { name: "Next.js (com Vite)", desc: "Alternativa Vite para projetos Next modernos.", url: "https://storybook.js.org/docs/get-started/frameworks/nextjs-vite/?renderer=react" },
    { name: "TanStack React", desc: "Integração para projetos TanStack Start / Router.", url: "https://storybook.js.org/docs/get-started/frameworks/tanstack-react/?renderer=react" },
    { name: "React Native Web (Vite)", desc: "Componentes RN rodando no browser.", url: "https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite/?renderer=react-native-web" },
    { name: "React Native (on device)", desc: "Storybook rodando no próprio dispositivo.", url: "https://github.com/storybookjs/react-native" },
    { name: "Preact (com Vite)", desc: "Alternativa leve ao React.", url: "https://storybook.js.org/docs/get-started/frameworks/preact-vite?renderer=preact" },
    { name: "Vue (com Vite)", desc: "Renderer oficial para Vue 3.", url: "https://storybook.js.org/docs/get-started/frameworks/vue3-vite/?renderer=vue" },
    { name: "Angular", desc: "Integração via Angular CLI.", url: "https://storybook.js.org/docs/get-started/frameworks/angular/?renderer=angular" },
    { name: "SvelteKit", desc: "Para projetos full-stack Svelte.", url: "https://storybook.js.org/docs/get-started/frameworks/sveltekit/?renderer=svelte" },
    { name: "Svelte (com Vite)", desc: "Setup mínimo para componentes Svelte.", url: "https://storybook.js.org/docs/get-started/frameworks/svelte-vite/?renderer=svelte" },
    { name: "Web Components (Vite)", desc: "Lit, Stencil e custom elements.", url: "https://storybook.js.org/docs/get-started/frameworks/web-components-vite/?renderer=web-components" },
  ];
  return (
    <Section id="ch-9">
      <ChapterLabel n="09" title="frameworks suportados" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Agnóstico de <span className="text-gradient italic">framework.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          O conceito de Story é universal. O Storybook tem renderers e builders
          dedicados para os principais ecossistemas do front-end.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((f, i) => (
          <Reveal key={f.name} delay={(i % 3) * 80}>
            <a
              href={f.url}
              target="_blank"
              rel="noreferrer noopener"
              className={`group block h-full rounded-xl p-5 border transition-colors ${
                f.primary ? "border-primary/60 bg-primary/10" : "border-border/60 bg-card/30 hover:border-primary/40"
              }`}
            >
              <div className={`font-mono text-[10px] tracking-widest mb-2 ${f.primary ? "text-primary" : "text-muted-foreground"}`}>
                {f.primary ? "★ NOSSO FOCO" : "RENDERER"}
              </div>
              <div className="text-lg font-medium mb-1.5">{f.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-4">{f.desc}</div>
              <div className="font-mono text-[11px] text-primary tracking-widest opacity-80 group-hover:opacity-100">
                ler documentação →
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={500}>
        <div className="mt-12 glass rounded-xl p-6 font-mono text-sm">
          <div className="text-muted-foreground text-xs mb-2">// instalação detecta seu stack:</div>
          <div><span className="text-primary">$</span> npx storybook@latest init</div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 10b REFERÊNCIAS OFICIAIS ---------- */
function ChapterReferences() {
  const refs = [
    {
      tag: "documentação oficial",
      title: "storybook.js.org/docs",
      desc: "Guias, APIs e tutoriais mantidos pela equipe principal.",
      url: "https://storybook.js.org/docs",
      cta: "ler documentação →",
    },
    {
      tag: "repositório oficial",
      title: "github.com/storybookjs/storybook",
      desc: "Código-fonte open source, issues e roadmap público.",
      url: "https://github.com/storybookjs/storybook",
      cta: "abrir repositório →",
    },
  ];
  const highlights = [
    ["Open Source", "Licença MIT, mantido pela Chromatic e pela comunidade."],
    ["+85k estrelas", "Um dos projetos front-end mais populares do GitHub."],
    ["Comunidade ativa", "Discord, Discussions e contribuições semanais."],
    ["Adoção da indústria", "Usado por Microsoft, Shopify, GitHub, BBC, IBM, Audi e muitos outros."],
  ];
  return (
    <Section id="ch-refs">
      <ChapterLabel n="10b" title="referências oficiais" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Onde a fonte da verdade <span className="text-gradient italic">mora.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          O Storybook é um projeto open source com documentação extensa e código aberto.
          Esses são os dois lugares para tirar dúvidas, abrir issues e acompanhar o roadmap.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 gap-5">
        {refs.map((r) => (
          <Reveal key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="block h-full glow-border rounded-2xl p-7 transition-transform hover:-translate-y-1"
            >
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3 uppercase">{r.tag}</div>
              <div className="text-2xl font-medium mb-3">{r.title}</div>
              <div className="text-sm md:text-base text-muted-foreground leading-relaxed">{r.desc}</div>
              <div className="mt-6 font-mono text-[11px] text-primary tracking-widest">{r.cta}</div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map(([t, d], i) => (
          <Reveal key={t} delay={i * 80}>
            <div className="rounded-xl p-5 border border-border/60 bg-card/30 h-full">
              <div className="font-mono text-[10px] tracking-widest text-accent mb-2">DESTAQUE</div>
              <div className="text-base font-medium mb-1.5">{t}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 10 EMPRESAS (NEW) ---------- */
function ChapterCompanies() {
  const companies = [
    "Airbnb", "GitHub", "Microsoft", "Shopify", "BBC", "IBM",
    "Salesforce", "Stripe", "Atlassian", "Mozilla", "Slack", "Audi",
    "Lonely Planet", "Coinbase", "Dropbox", "Adobe", "Auth0", "Twilio",
    "Nubank", "iFood", "Mercado Livre", "Globo",
  ];
  return (
    <Section id="ch-10">
      <ChapterLabel n="10" title="quem usa em produção" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Padrão da <span className="text-gradient italic">indústria.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          Mais de <span className="text-primary font-medium">85.000</span> repositórios públicos no GitHub usam Storybook.
          Times grandes e pequenos, de bancos a redes sociais, fazem do Storybook o coração do design system.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-16 flex flex-wrap gap-3">
          {companies.map((c, i) => (
            <div
              key={c}
              className="px-5 py-3 rounded-full glass font-mono text-sm tracking-wide hover:border-primary/60 transition-colors"
              style={{ animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.1}s infinite` }}
            >
              {c}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {[
          ["Airbnb", "Usa Storybook internamente como principal ferramenta de desenvolvimento e validação de UI. O Design Language System completo é privado; bibliotecas pontuais como react-dates são abertas.", "https://storybook.js.org/showcase/airbnb-react-dates/", "ver showcase →"],
          ["Shopify Polaris", "Sistema usado por milhões de lojistas — documentado publicamente em Storybook.", "https://storybook.js.org/showcase/shopify-polaris-react/", "ver showcase →"],
          ["GitHub Primer", "Design system aberto da GitHub: componentes open source com Storybook público.", "https://storybook.js.org/showcase/github-primer-react/", "ver showcase →"],
        ].map(([n, d, url, cta]) => (
          <Reveal key={n}>
            <a href={url} target="_blank" rel="noreferrer noopener" className="block h-full glow-border rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">CASE</div>
              <div className="text-xl font-medium mb-2">{n}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
              <div className="mt-5 font-mono text-[11px] text-primary tracking-widest">{cta}</div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 11 RESOLVED ---------- */
function ChapterResolved() {
  return (
    <Section id="ch-11">
      <ChapterLabel n="11" title="antes / depois" />
      <Reveal><h2 className="text-5xl md:text-6xl font-light max-w-4xl">O ciclo de feedback se comprime.</h2></Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-8">
        <Reveal>
          <div className="rounded-2xl p-8 border border-destructive/30 bg-destructive/5">
            <div className="font-mono text-xs tracking-widest text-destructive mb-8">SEM STORYBOOK</div>
            <FlowSteps steps={["criar componente", "iniciar app", "navegar até a tela", "preencher form", "ver o resultado"]} color="destructive" />
            <div className="mt-8 font-mono text-sm text-destructive">~ 90s por iteração</div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="rounded-2xl p-8 border border-primary/40 bg-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
            <div className="font-mono text-xs tracking-widest text-primary mb-8 relative">COM STORYBOOK</div>
            <FlowSteps steps={["criar componente", "ver instantaneamente"]} color="primary" />
            <div className="mt-8 font-mono text-sm text-primary relative">~ 3s por iteração</div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
function FlowSteps({ steps, color }: { steps: string[]; color: "primary" | "destructive" }) {
  const c = color === "primary" ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground";
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-4">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono ${c}`}>{i + 1}</span>
          <span className="text-base">{s}</span>
        </li>
      ))}
    </ol>
  );
}


/* ---------- 13 INSTALL ---------- */
function ChapterInstall() {
  return (
    <Section id="ch-13">
      <ChapterLabel n="13" title="início em um comando" />
      <Reveal><h2 className="text-5xl md:text-7xl font-light">Um comando. Pronto.</h2></Reveal>

      <Reveal delay={200}>
        <div className="mt-16 relative">
          <div className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60 font-mono text-[10px] tracking-widest text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3">terminal · ~/projeto</span>
            </div>
            <div className="p-8 font-mono text-lg">
              <span className="text-muted-foreground">$ </span>
              <span className="text-primary">npx</span>{" "}
              <span>storybook@latest</span>{" "}
              <span className="text-accent">init</span>
            </div>
            <div className="px-8 pb-8 font-mono text-xs text-muted-foreground space-y-1">
              <div>→ detectando framework... React + Vite</div>
              <div>→ instalando @storybook/react-vite, addons essenciais...</div>
              <div>→ gerando .storybook/, stories de exemplo...</div>
              <div className="text-primary">✓ pronto. npm run storybook → http://localhost:6006</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            ["detecta", "stack do projeto: Vite, Next, CRA, Webpack…"],
            ["instala", "dependências e addons recomendados"],
            ["gera", "configuração, stories de exemplo e scripts"],
          ].map(([t, d], i) => (
            <div key={t} className="glass rounded-xl p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-2">PASSO {i + 1}</div>
              <div className="text-xl font-medium mb-1">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 14 STRUCTURE ---------- */
function ChapterStructure() {
  return (
    <Section id="ch-14">
      <ChapterLabel n="14" title="anatomia do projeto" />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-light leading-tight">Três pastas. Três papéis.</h2>
          <div className="mt-10 space-y-6">
            {[
              [".storybook/", "configuração — main.ts, preview.ts, addons, decorators globais."],
              ["src/", "seu código de produção. componentes vivem aqui."],
              ["stories/", "arquivos *.stories.tsx que descrevem estados dos componentes."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-primary/60 pl-5">
                <div className="font-mono text-primary">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{d}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-2xl p-6 font-mono text-sm">
            <div className="text-muted-foreground text-xs mb-4">// projeto</div>
            <Tree
              nodes={[
                { name: ".storybook/", color: "accent", children: [
                  { name: "main.ts" }, { name: "preview.ts" }
                ]},
                { name: "src/", color: "primary", children: [
                  { name: "components/", children: [
                    { name: "Button.tsx" }, { name: "Input.tsx" }
                  ]},
                ]},
                { name: "stories/", color: "neon", children: [
                  { name: "Button.stories.tsx" },
                  { name: "Input.stories.tsx" },
                ]},
                { name: "package.json" },
              ]}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
type Node = { name: string; color?: "primary" | "accent" | "neon"; children?: Node[] };
const colorMap = { primary: "text-primary", accent: "text-accent", neon: "text-neon" } as const;
function Tree({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
  return (
    <ul className="space-y-1">
      {nodes.map((n) => (
        <li key={n.name} style={{ paddingLeft: depth * 18 }}>
          <span className={n.color ? colorMap[n.color] : "text-foreground"}>
            {n.children ? "▸ " : "  "}{n.name}
          </span>
          {n.children && <Tree nodes={n.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

/* ---------- 15 STORY ---------- */
function ChapterStory() {
  const code = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'phosphor-react'
import { Button, type ButtonProps } from './Button'

export default {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Send',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'inline-radio' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'inline-radio' },
    },
    disabled: { control: { type: 'boolean' } },
    onClick: { action: 'click' },
  },
} as Meta<ButtonProps>

export const Primary:   StoryObj<ButtonProps> = {}
export const Secondary: StoryObj<ButtonProps> = { args: { variant: 'secondary', children: 'Create new' } }
export const Tertiary:  StoryObj<ButtonProps> = { args: { variant: 'tertiary',  children: 'Cancel' } }
export const Small:     StoryObj<ButtonProps> = { args: { size: 'sm' } }
export const WithIcon:  StoryObj<ButtonProps> = {
  args: { children: (<>Próximo passo <ArrowRight weight="bold" /></>) },
}
export const Disabled:  StoryObj<ButtonProps> = { args: { disabled: true } }`;

  const parts: Array<[string, string, React.ReactNode]> = [
    [
      "title",
      "title: 'Form/Button'",
      <>
        Gera a hierarquia na <span className="text-primary">sidebar</span>. O caractere
        <code className="px-1 mx-1 rounded bg-muted text-primary font-mono">/</code> cria grupos:
        <div className="mt-3 font-mono text-sm text-muted-foreground">Form<br />&nbsp;&nbsp;└─ Button</div>
      </>,
    ],
    [
      "component",
      "component: Button",
      <>Define qual componente React será renderizado no <span className="text-primary">Canvas</span>. Aqui importamos localmente: <code className="px-1 rounded bg-muted text-primary font-mono">{`import { Button } from './Button'`}</code>.</>,
    ],
    [
      "tags",
      "tags: ['autodocs']",
      <>Liga o <span className="text-primary">Autodocs</span>: o Storybook gera uma página <span className="text-primary">Docs</span> com preview, tabela de props, controles e stories — exatamente como acontece com o componente <span className="text-foreground">Heading</span> no Storybook real.</>,
    ],
    [
      "args",
      "args: { children: 'Send', variant: 'primary', size: 'md', disabled: false }",
      <>Valores <span className="text-primary">padrão</span> enviados como props para o componente. Todo Story herda esses args e pode sobrescrever só o que muda.</>,
    ],
    [
      "argTypes · options",
      "options: ['primary', 'secondary', 'tertiary']",
      <>Lista de <span className="text-primary">valores permitidos</span> para uma prop. O Storybook usa para montar o seletor no painel <span className="text-primary">Controls</span>.</>,
    ],
    [
      "argTypes · control",
      "control: { type: 'inline-radio' }",
      <>Define o tipo de controle exibido. Os mais comuns:
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <li><code className="text-primary font-mono">inline-radio</code> — radio em linha</li>
          <li><code className="text-primary font-mono">radio</code> — radio empilhado</li>
          <li><code className="text-primary font-mono">select</code> — dropdown</li>
          <li><code className="text-primary font-mono">boolean</code> — switch on/off</li>
          <li><code className="text-primary font-mono">text</code> — campo de texto</li>
          <li><code className="text-primary font-mono">number</code> — campo numérico</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">Resultado: alterar props em tempo real, sem tocar código.</p>
      </>,
    ],
    [
      "actions",
      "onClick: { action: 'click' }",
      <>Registra eventos do componente na aba <span className="text-primary">Actions</span>. Substitui o <code className="px-1 rounded bg-muted text-primary font-mono">console.log</code> manual: clique no botão e veja o evento aparecer.</>,
    ],
    [
      "stories",
      "export const Primary: StoryObj<ButtonProps> = {}",
      <>Cada <code className="px-1 rounded bg-muted text-primary font-mono">export const</code> é uma <span className="text-primary">story</span> — um cenário de uso. Aqui temos seis: <span className="font-mono text-foreground">Primary</span>, <span className="font-mono text-foreground">Secondary</span>, <span className="font-mono text-foreground">Tertiary</span>, <span className="font-mono text-foreground">Small</span>, <span className="font-mono text-foreground">WithIcon</span> e <span className="font-mono text-foreground">Disabled</span>. Todas variam o mesmo componente.</>,
    ],
  ];

  return (
    <Section id="ch-15">
      <ChapterLabel n="15" title="anatomia de uma story (Button)" />
      <Reveal>
        <h2 className="text-5xl md:text-7xl font-light max-w-4xl leading-tight">
          Uma <span className="text-gradient italic">story</span>, sete decisões.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          Vamos ler o arquivo <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">Button.stories.tsx</code> linha por linha
          e mapear cada parte para o painel do Storybook real.
        </p>
      </Reveal>

      <div className="mt-12">
        <Reveal><CodeBlock filename="Button.stories.tsx" code={code} /></Reveal>
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-6">
        {parts.map(([title, snippet, desc], i) => (
          <Reveal key={title} delay={(i % 2) * 120}>
            <div className="glass rounded-2xl p-6 h-full">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-2">PARTE · {String(i + 1).padStart(2, "0")}</div>
              <div className="text-xl font-medium mb-3">{title}</div>
              <pre className="text-xs bg-muted/40 rounded-md p-3 mb-4 overflow-x-auto font-mono text-foreground">{snippet}</pre>
              <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <div className="mt-12 glass rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs tracking-widest text-primary mb-2">PRATIQUE NO STORYBOOK REAL</div>
            <p className="text-sm md:text-base text-muted-foreground">
              Abra a story <span className="text-foreground font-mono">Form / Button / Primary</span> e mexa em <span className="text-primary">variant</span>, <span className="text-primary">size</span> e <span className="text-primary">disabled</span> no painel Controls.
            </p>
          </div>
          <a href={STORYBOOK_URL} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary/60 text-primary text-sm font-mono uppercase tracking-widest hover:bg-primary/10">
            abrir <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

function renderHighlighted(code: string, highlights?: string | string[]): React.ReactNode {
  if (!highlights) return code;
  const arr = (Array.isArray(highlights) ? highlights : [highlights]).filter(Boolean);
  if (arr.length === 0) return code;
  const parts: React.ReactNode[] = [];
  let rest = code;
  let key = 0;
  while (rest.length) {
    let bestIdx = -1;
    let bestH = "";
    for (const h of arr) {
      const i = rest.indexOf(h);
      if (i !== -1 && (bestIdx === -1 || i < bestIdx)) {
        bestIdx = i;
        bestH = h;
      }
    }
    if (bestIdx === -1) {
      parts.push(<span key={key++}>{rest}</span>);
      break;
    }
    if (bestIdx > 0) parts.push(<span key={key++}>{rest.slice(0, bestIdx)}</span>);
    parts.push(
      <mark
        key={key++}
        className="bg-primary/15 text-primary rounded-md px-1 py-0.5 ring-1 ring-primary/40 shadow-[0_0_18px_-6px_oklch(0.78_0.18_195/0.6)]"
      >
        {bestH}
      </mark>
    );
    rest = rest.slice(bestIdx + bestH.length);
  }
  return <>{parts}</>;
}

function CodeBlock({
  filename,
  code,
  lang = "tsx",
  highlight,
  preview,
}: {
  filename: string;
  code: string;
  lang?: string;
  highlight?: string | string[];
  preview?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <div className="glass rounded-2xl overflow-hidden w-full">
      <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between gap-3 font-mono text-xs tracking-widest text-muted-foreground">
        <span className="truncate">{filename}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-primary uppercase">{lang}</span>
          {preview && (
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              aria-label={showPreview ? "Ver código" : "Executar preview"}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
                showPreview
                  ? "border-accent/60 text-accent hover:bg-accent/10"
                  : "border-primary/60 text-primary hover:bg-primary/10"
              }`}
            >
              {showPreview ? <Code2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="text-[10px] uppercase">{showPreview ? "código" : "run"}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copiar código"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border/60 hover:border-primary/60 hover:text-primary transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px] uppercase">{copied ? "copiado" : "copiar"}</span>
          </button>
        </div>
      </div>
      {showPreview && preview ? (
        <div className="p-6 md:p-8 bg-muted/10 border-t border-border/40">
          <div className="font-mono text-[10px] tracking-widest text-accent mb-4">PREVIEW · CANVAS</div>
          {preview}
        </div>
      ) : (
        <pre className="p-5 md:p-6 text-[0.78rem] md:text-[0.88rem] leading-[1.7] whitespace-pre-wrap break-words font-mono">
          <code>{renderHighlighted(code, highlight)}</code>
        </pre>
      )}
    </div>
  );
}


/* ---------- 16 DECORATORS (TextArea) ---------- */
function ChapterArgsDecorators() {
  const code = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea, type TextAreaProps } from './TextArea'

export default {
  title: 'Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span>Observations</span>
        <Story />
      </label>
    ),
  ],
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {
  args: { placeholder: 'Add any observations...' },
}

export const Disabled: StoryObj<TextAreaProps> = {
  args: { disabled: true },
}`;

  const usos = [
    ["Layouts", "Envelopar o componente com label, container ou grid."],
    ["Providers", "ThemeProvider, ReduxProvider, QueryClientProvider."],
    ["Temas", "Forçar dark/light em uma story específica."],
    ["Contextos", "RouterContext, AuthContext, i18n."],
    ["Containers", "Centralizar, limitar largura, adicionar padding."],
  ];

  return (
    <Section id="ch-16">
      <ChapterLabel n="16" title="decorators (TextArea)" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          <span className="text-gradient italic">Decorators</span>: wrappers ao redor da story.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          Um <span className="text-primary">decorator</span> é uma função que envolve o preview da story.
          O componente em si não muda — só a forma como aparece dentro do Storybook.
          No exemplo do <span className="text-foreground">TextArea</span>, adicionamos um <code className="px-1 rounded bg-muted text-primary font-mono">label "Observations"</code> em volta.
        </p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
        <Reveal>
          <CodeBlock
            filename="TextArea.stories.tsx"
            code={code}
            highlight={[`decorators: [
    (Story) => (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span>Observations</span>
        <Story />
      </label>
    ),
  ],`]}
            preview={
              <label className="flex flex-col gap-2 max-w-md">
                <span className="text-sm">Observations</span>
                <textarea
                  className="rounded-md p-3 bg-input border border-border text-sm"
                  placeholder="Add any observations..."
                  rows={3}
                />
                <span className="text-xs text-muted-foreground mt-2">
                  O label "Observations" vem do decorator — o componente TextArea continua puro.
                </span>
              </label>
            }
          />
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-4">CANVAS · COM DECORATOR</div>
              <label className="flex flex-col gap-2">
                <span className="text-sm">Observations</span>
                <textarea
                  className="rounded-md p-3 bg-input border border-border text-sm"
                  placeholder="Add any observations..."
                  rows={3}
                />
              </label>
              <p className="mt-4 text-xs text-muted-foreground">
                O label não está dentro do TextArea — vem do decorator. A story preserva o componente puro.
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[10px] tracking-widest text-accent mb-3">CASOS COMUNS</div>
              <ul className="space-y-2">
                {usos.map(([t, d]) => (
                  <li key={t} className="text-sm">
                    <span className="text-primary font-mono">{t}</span>
                    <span className="text-muted-foreground"> — {d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="mt-10 text-center text-sm md:text-base text-muted-foreground italic">
          Abra <span className="text-foreground font-mono not-italic">Form / TextArea</span> no Storybook real para ver o wrapper "Observations" no preview.
        </div>
      </Reveal>
    </Section>
  );
}


/* ---------- 17 UI ---------- */
function ChapterUI() {
  const panels = [
    ["Sidebar", "Árvore de componentes e stories."],
    ["Canvas", "Onde o componente vive, renderizado."],
    ["Docs", "Página de documentação gerada."],
    ["Controls", "Edite props sem recompilar."],
    ["Actions", "Eventos disparados em tempo real."],
    ["Interactions", "Reproduza fluxos passo a passo."],
  ];
  return (
    <Section id="ch-17">
      <ChapterLabel n="17" title="a interface" />
      <Reveal><h2 className="text-5xl md:text-6xl font-light max-w-3xl">Seis painéis. Um cockpit.</h2></Reveal>

      <Reveal delay={200}>
        <div className="mt-16 glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 h-[520px]">
            <div className="col-span-3 border-r border-border/60 p-4 font-mono text-xs space-y-2">
              <div className="text-muted-foreground tracking-widest text-[10px] mb-3">UI / BUTTON</div>
              {["Primary", "Secondary", "Disabled", "Danger"].map((s, i) => (
                <div key={s} className={`px-3 py-1.5 rounded ${i === 0 ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
                  ◆ {s}
                </div>
              ))}
              <div className="text-muted-foreground tracking-widest text-[10px] mt-6 mb-3">UI / INPUT</div>
              {["Default", "Error"].map(s => (
                <div key={s} className="px-3 py-1.5 rounded text-muted-foreground">◆ {s}</div>
              ))}
            </div>

            <div className="col-span-6 border-r border-border/60 p-8 flex items-center justify-center bg-background/40">
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium" style={{ boxShadow: "var(--shadow-glow)" }}>
                Salvar
              </button>
            </div>

            <div className="col-span-3 p-4 font-mono text-xs space-y-3">
              <div className="text-muted-foreground tracking-widest text-[10px] mb-3">CONTROLS</div>
              <div><div className="text-muted-foreground">variant</div><div className="mt-1 px-2 py-1 rounded bg-input">primary ▾</div></div>
              <div><div className="text-muted-foreground">label</div><div className="mt-1 px-2 py-1 rounded bg-input">Salvar</div></div>
              <div>
                <div className="text-muted-foreground">disabled</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-border relative">
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-foreground" />
                  </div>
                  <span>false</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
        {panels.map(([t, d], i) => (
          <Reveal key={t} delay={i * 80}>
            <div className="rounded-xl border border-border/60 p-5">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-2">PANEL</div>
              <div className="font-medium">{t}</div>
              <div className="text-xs text-muted-foreground mt-1">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 18 DOCS (NEW) ---------- */
function ChapterDocs() {
  const mdx = `import { Meta, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Use este componente para ações principais.

<Canvas of={ButtonStories.Primary} />

## Quando usar
- Para a ação principal da página
- Em formulários de submissão`;

  return (
    <Section id="ch-18">
      <ChapterLabel n="18" title="documentação que não envelhece" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          <span className="text-gradient italic">Autodocs</span> + <span className="text-gradient italic">MDX</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          A documentação nasce do próprio código. Para casos comuns, Autodocs gera tudo a partir dos tipos.
          Para casos ricos, MDX combina Markdown com componentes vivos.
        </p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-2 gap-8 items-start">
        <Reveal>
          <div className="space-y-6">
            <div className="glow-border rounded-2xl p-6">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">AUTODOCS</div>
              <div className="text-xl font-medium mb-2">Zero manutenção</div>
              <div className="text-sm text-muted-foreground">
                Basta adicionar <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-xs">tags: ['autodocs']</code> ao meta.
                Tabela de props, descrições e exemplos saem direto do TypeScript.
              </div>
            </div>
            <div className="glow-border rounded-2xl p-6">
              <div className="font-mono text-[10px] tracking-widest text-accent mb-3">MDX</div>
              <div className="text-xl font-medium mb-2">Documentação rica</div>
              <div className="text-sm text-muted-foreground">
                Misture Markdown com componentes React e blocos do próprio Storybook
                (<code className="px-1.5 py-0.5 rounded bg-muted text-accent font-mono text-xs">{"<Canvas />"}</code>, <code className="px-1.5 py-0.5 rounded bg-muted text-accent font-mono text-xs">{"<Meta />"}</code>) para guias completos.
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <CodeBlock filename="Button.mdx" code={mdx} />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 19 ADDONS (NEW) ---------- */
function ChapterAddons() {
  const addons = [
    ["essentials", "Pacote padrão: Controls, Actions, Docs, Backgrounds, Viewport, Toolbars.", "primary"],
    ["a11y", "Auditoria de acessibilidade com axe-core em cada story.", "neon"],
    ["interactions", "Painel para inspecionar e replayar a função play() passo a passo.", "accent"],
    ["designs", "Embute frames do Figma na aba 'Design'. Comparação direta com o mockup.", "cyber"],
    ["msw", "Mock de chamadas HTTP/GraphQL via Mock Service Worker.", "magenta"],
    ["themes", "Alternador de tema na toolbar para validar light/dark/branded.", "primary"],
    ["viewport", "Simula resoluções de mobile, tablet e desktop.", "accent"],
    ["i18n", "Trocar idiomas dentro da própria story."],
  ] as const;
  return (
    <Section id="ch-19">
      <ChapterLabel n="19" title="ecossistema de addons" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Mais de <span className="text-gradient italic">1.000</span> extensões.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          O addon-essentials já vem instalado. O resto do ecossistema cobre praticamente
          qualquer necessidade — sem precisar fork do Storybook.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {addons.map(([name, desc, color]) => (
          <Reveal key={name}>
            <div className="glass rounded-xl p-5 h-full">
              <div className={`font-mono text-xs tracking-widest mb-3 ${
                color === "primary" ? "text-primary" :
                color === "accent" ? "text-accent" :
                color === "neon" ? "text-neon" :
                color === "cyber" ? "text-cyber" :
                color === "magenta" ? "text-magenta" : "text-muted-foreground"
              }`}>@storybook/addon-{name}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 20 TESTES INTRO (NEW) ---------- */
function ChapterTestsIntro() {
  const types = [
    ["Interação", "@storybook/test + play()", "Cliques, inputs, fluxos do usuário", "primary"],
    ["Acessibilidade", "@storybook/addon-a11y", "Conformidade WCAG (axe-core)", "accent"],
    ["Unitários", "Vitest / Jest", "Lógica interna dos componentes", "neon"],
  ] as const;
  return (
    <Section id="ch-20" className="relative">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-60" style={{ background: "var(--gradient-glow)" }} />
      <ChapterLabel n="20" title="testes — o ponto alto" />
      <Reveal>
        <div className="font-mono text-sm text-primary tracking-widest mb-6">// princípio</div>
      </Reveal>
      <Reveal delay={150}>
        <h2 className="text-5xl md:text-7xl font-light max-w-4xl leading-tight">
          Write once,<br /><span className="text-gradient italic">test everywhere.</span>
        </h2>
      </Reveal>
      <Reveal delay={300}>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl">
          A mesma story que você usa para desenvolver vira base para múltiplos tipos de teste.
          Sem duplicar setup, sem manter mocks paralelos. Quatro camadas, uma fonte de verdade.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {types.map(([name, tool, desc, color]) => (
          <Reveal key={name}>
            <div className="glow-border rounded-2xl p-6 h-full">
              <div className={`font-mono text-[10px] tracking-widest mb-3 ${
                color === "primary" ? "text-primary" :
                color === "accent" ? "text-accent" :
                color === "neon" ? "text-neon" : "text-cyber"
              }`}>TIPO</div>
              <div className="text-xl font-medium mb-2">{name}</div>
              <div className="font-mono text-xs text-muted-foreground mb-3">{tool}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 21 PLAY (NEW) ---------- */
function ChapterPlay() {
  const code = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect, fn } from 'storybook/test'
import { Button, type ButtonProps } from '@hoekveld-ui/react'

export default {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Send', variant: 'primary' },
  argTypes: { onClick: { action: 'click' } },
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {
  args: {
    onClick: fn(),
    children: 'Send',
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole('button', { name: 'Send' }),
    )

    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}`;

  const lineCanvas = `const canvas = within(canvasElement)`;
  const lineClick = `await userEvent.click(
      canvas.getByRole('button', { name: 'Send' }),
    )`;
  const lineExpect = `await expect(args.onClick).toHaveBeenCalledTimes(1)`;

  return (
    <Section id="ch-21">
      <ChapterLabel n="21" title="testes de interação" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          A função <span className="text-gradient italic">play()</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          A funcionalidade mais poderosa do Storybook em testes. Roda automaticamente
          após renderizar a story e simula interações reais do usuário — tudo no navegador,
          visível e replayável no painel <span className="text-foreground">Interactions</span>.
        </p>
      </Reveal>
      <Reveal delay={250}>
        <p className="mt-4 text-base text-muted-foreground max-w-3xl">
          Boa notícia: o idioma dos testes é praticamente o mesmo do{" "}
          <span className="text-foreground">Vitest</span>. O Storybook já vem integrado a ele,
          então funções como <code className="px-1 rounded bg-muted text-primary font-mono text-xs">expect</code>,{" "}
          <code className="px-1 rounded bg-muted text-primary font-mono text-xs">userEvent</code> e{" "}
          <code className="px-1 rounded bg-muted text-primary font-mono text-xs">fn()</code> se comportam
          como você já conhece — o que você aprende aqui serve para os dois mundos.
        </p>
      </Reveal>

      <div className="mt-12">
        <Reveal>
          <CodeBlock
            filename="Button.stories.tsx"
            code={code}
            highlight={[lineCanvas, lineClick, lineExpect]}
          />
        </Reveal>
      </div>

      <Reveal delay={200}>
        <h3 className="mt-16 text-2xl md:text-3xl font-light">Dissecando o <span className="text-gradient italic">play()</span> linha por linha</h3>
      </Reveal>

      <div className="mt-8 grid md:grid-cols-3 gap-5">
        <Reveal>
          <div className="glow-border rounded-2xl p-6 h-full">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-3">PASSO 01</div>
            <div className="font-mono text-sm text-primary mb-3">within(canvasElement)</div>
            <div className="text-base font-medium mb-2">O canvas da story</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground">canvasElement</span> é o pedaço do DOM onde a story foi renderizada.
              <span className="text-foreground"> within()</span> cria queries (como{" "}
              <code className="px-1 rounded bg-muted text-primary font-mono text-xs">getByRole</code>) escopadas
              a esse pedaço — sem vazar para o resto da página.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="glow-border rounded-2xl p-6 h-full">
            <div className="font-mono text-[10px] tracking-widest text-accent mb-3">PASSO 02</div>
            <div className="font-mono text-sm text-accent mb-3">userEvent.click(...)</div>
            <div className="text-base font-medium mb-2">Simula o usuário</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground">userEvent</span> simula interações reais: clique, digitação, teclado,
              foco. Aqui pegamos o botão pelo nome acessível e clicamos nele —
              exatamente como uma pessoa faria com mouse ou teclado.
            </p>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="glow-border rounded-2xl p-6 h-full">
            <div className="font-mono text-[10px] tracking-widest text-neon mb-3">PASSO 03</div>
            <div className="font-mono text-sm text-neon mb-3">expect(args.onClick)</div>
            <div className="text-base font-medium mb-2">Verifica o resultado</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground">fn()</span> é um spy que registra cada chamada.
              <span className="text-foreground"> expect</span> confirma o comportamento — neste caso,
              que o <code className="px-1 rounded bg-muted text-primary font-mono text-xs">onClick</code> foi chamado
              exatamente uma vez.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="mt-12 glass rounded-2xl overflow-hidden max-w-2xl">
          <div className="px-5 py-3 border-b border-border/60 font-mono text-[10px] tracking-widest text-muted-foreground flex items-center justify-between">
            <span>INTERACTIONS · STORY PRIMARY</span>
            <span className="text-primary">▶ rodando</span>
          </div>
          <div className="p-5 space-y-3 font-mono text-xs">
            {[
              ["✓", "click button 'Send'"],
              ["✓", "expect(args.onClick).toHaveBeenCalledTimes(1)"],
            ].map(([s, t]) => (
              <div key={t} className="flex items-start gap-3">
                <span className="text-primary">{s}</span>
                <span className="text-foreground/90">{t}</span>
              </div>
            ))}
            <div className="pt-3 mt-2 border-t border-border/60 flex items-center gap-2 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              2 passed · 0 failed · 64ms
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}


/* ---------- 22 ADDONS via main.ts ---------- */
function ChapterOtherTests() {
  const mainConfig = `import type { StorybookConfig } from '@storybook/react-vite'
import { dirname } from "path"
import { fileURLToPath } from "url"

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(\`\${value}/package.json\`)))
}

const config: StorybookConfig = {
  stories: [
    "../src/pages/**/*.mdx",
    "../src/stories/**/*.stories.tsx"
  ],
  addons: [
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
}

export default config`;

  return (
    <Section id="ch-22">
      <ChapterLabel n="22" title="addons no main.ts" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Tudo começa no <span className="text-gradient italic">main.ts</span>.
        </h2>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          O arquivo <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-xs">.storybook/main.ts</code> é
          onde fica a configuração principal do Storybook — incluindo a lista de{" "}
          <span className="text-foreground">addons</span>. Quando instalamos o Storybook ele já adiciona
          alguns por padrão, como <span className="text-foreground">addon-vitest</span> (testes),
          {" "}<span className="text-foreground">addon-a11y</span> (acessibilidade) e{" "}
          <span className="text-foreground">addon-docs</span> (documentação).
        </p>
      </Reveal>

      <div className="mt-12">
        <Reveal>
          <CodeBlock
            filename=".storybook/main.ts"
            code={mainConfig}
            highlight={[
              "'@storybook/addon-vitest'",
              "'@storybook/addon-a11y'",
              "'@storybook/addon-docs'",
            ]}
          />
        </Reveal>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {[
          ["addon-vitest", "neon", "Executa as stories como testes — a função play() vira um caso de teste real."],
          ["addon-a11y", "accent", "Roda o axe-core em cada story e aponta violações de WCAG automaticamente."],
          ["addon-docs", "primary", "Gera páginas de documentação a partir das stories (Autodocs + MDX)."],
        ].map(([name, color, desc]) => (
          <Reveal key={name}>
            <div className="glow-border rounded-2xl p-6 h-full">
              <div className={`font-mono text-[10px] tracking-widest mb-3 ${
                color === "primary" ? "text-primary" : color === "accent" ? "text-accent" : "text-neon"
              }`}>ADDON</div>
              <div className="font-mono text-base mb-2">{name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}


/* ---------- 23 CI/CD — GitHub Pages ---------- */
function ChapterCICD() {
  const yml = `name: Publish Storybook to GitHub Pages
on:
  push:
    branches:
      - "main" # Use specific branch name

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: "24"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy storybook to GitHub Pages
        run: touch storybook-static/.nojekyll && npm run deploy-storybook -- --ci --existing-output-dir=storybook-static
        env:
          GH_TOKEN: \${{ github.actor }}:\${{ secrets.GITHUB_TOKEN }}`;

  const pkgJson = `{
  "scripts": {
    "deploy-storybook": "storybook-to-ghpages"
  }
}`;

  return (
    <Section id="ch-23">
      <ChapterLabel n="23" title="ci/cd & publicação" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          De commit a <span className="text-gradient italic">site público.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          O Storybook compila para um site estático que pode ser hospedado gratuitamente no{" "}
          <span className="text-foreground">GitHub Pages</span>. Para isso usamos o pacote oficial{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-xs">@storybook/storybook-deployer</code>
          {" "}e um workflow do GitHub Actions.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-12">
          <div className="font-mono text-xs text-accent tracking-widest mb-3">1 · SCRIPT NO PACKAGE.JSON</div>
          <CodeBlock
            filename="package.json"
            lang="json"
            code={pkgJson}
            highlight={[`"deploy-storybook": "storybook-to-ghpages"`]}
          />
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div className="mt-10">
          <div className="font-mono text-xs text-neon tracking-widest mb-3">2 · WORKFLOW DO GITHUB ACTIONS</div>
          <CodeBlock filename=".github/workflows/deploy-storybook.yml" code={yml} lang="yml" />
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-12 space-y-3">
          {[
            ["1", "Dev faz push na branch main", "primary"],
            ["2", "GitHub Actions é disparado", "accent"],
            ["3", "Build do Storybook (storybook-static)", "neon"],
            ["4", "Deploy automático no GitHub Pages", "cyber"],
          ].map(([n, t, c]) => (
            <div key={n} className="flex items-center gap-4 glass rounded-xl px-5 py-4">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm ${
                c === "primary" ? "bg-primary/20 text-primary" :
                c === "accent" ? "bg-accent/20 text-accent" :
                c === "neon" ? "bg-neon/20 text-neon" : "bg-cyber/20 text-cyber"
              }`}>{n}</div>
              <div className="text-sm">{t}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 24 COMPARATIVO (NEW) ---------- */
function ChapterCompare() {
  const rows = [
    ["Testes play()", "✓ nativo", "—", "limitado"],
    ["Acessibilidade", "✓ addon-a11y", "—", "parcial"],
    ["Addons", "1.000+", "básico", "sim"],
    ["MDX / Docs", "✓ Autodocs + MDX", "auto", "parcial"],
    ["Curva", "média", "baixa", "média"],
    ["Comunidade", "grande", "pequena", "ativa"],
    ["Gratuito", "✓ open-source", "✓", "freemium"],
  ];
  return (
    <Section id="ch-24">
      <ChapterLabel n="24" title="vs alternativas" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          Por que <span className="text-gradient italic">Storybook?</span>
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left p-4 font-mono text-[10px] tracking-widest text-muted-foreground">CRITÉRIO</th>
                <th className="text-left p-4 font-mono text-[10px] tracking-widest text-primary">STORYBOOK</th>
                <th className="text-left p-4 font-mono text-[10px] tracking-widest text-muted-foreground">STYLEGUIDIST</th>
                <th className="text-left p-4 font-mono text-[10px] tracking-widest text-muted-foreground">BIT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`p-4 ${j === 1 ? "text-primary font-medium" : j === 0 ? "text-muted-foreground" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <Reveal>
          <div className="rounded-2xl p-8 border border-primary/40 bg-primary/5">
            <div className="font-mono text-xs tracking-widest text-primary mb-6">QUANDO USAR</div>
            <ul className="space-y-3 text-sm">
              {[
                "Projetos com design system ou biblioteca de componentes",
                "Times com designers que revisam componentes",
                "Projetos com CI/CD ativos",
                "Apps React de médio a grande porte",
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <span className="text-primary mt-1">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="rounded-2xl p-8 border border-muted-foreground/30 bg-muted/20">
            <div className="font-mono text-xs tracking-widest text-muted-foreground mb-6">AVALIAR ANTES</div>
            <ul className="space-y-3 text-sm">
              {[
                "Projetos muito pequenos (1-2 devs, curto prazo)",
                "Prototipagem rápida descartável",
                "Times sem cultura de testes",
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <span className="text-muted-foreground mt-1">→</span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 25 EXAMPLE ---------- */
function ChapterExample() {
  const [state, setState] = useState<"Primary" | "Secondary" | "Danger" | "Disabled">("Primary");
  const styles: Record<string, string> = {
    Primary: "bg-primary text-primary-foreground",
    Secondary: "bg-secondary text-secondary-foreground border border-border",
    Danger: "bg-destructive text-destructive-foreground",
    Disabled: "bg-primary/30 text-primary-foreground/40 cursor-not-allowed",
  };
  return (
    <Section id="ch-25">
      <ChapterLabel n="25" title="ao vivo" />
      <Reveal><h2 className="text-5xl md:text-6xl font-light max-w-3xl">Experimente.</h2></Reveal>
      <Reveal delay={150}>
        <p className="mt-6 text-lg text-muted-foreground">Clique nos estados. Veja a story trocar — como no Storybook real.</p>
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-12 glass rounded-3xl p-12 flex flex-col items-center gap-12">
          <button
            disabled={state === "Disabled"}
            className={`px-12 py-5 rounded-xl text-lg font-medium transition-all duration-500 ${styles[state]}`}
            style={state === "Primary" ? { boxShadow: "var(--shadow-glow)" } : undefined}
          >
            Salvar
          </button>

          <div className="flex flex-wrap gap-3 justify-center">
            {(["Primary", "Secondary", "Danger", "Disabled"] as const).map(s => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-widest border transition-all ${
                  state === s
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 26 FLOW ---------- */
function ChapterFlow() {
  const steps = ["Design System", "Componentes React", "Storybook", "Documentação", "Testes", "CI/CD", "Produto final"];
  return (
    <Section id="ch-26">
      <ChapterLabel n="26" title="o fluxo completo" />
      <Reveal><h2 className="text-5xl md:text-6xl font-light max-w-3xl">A pipeline da consistência.</h2></Reveal>

      <div className="mt-20 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-neon -translate-x-1/2" />
        <div className="space-y-12">
          {steps.map((s, i) => (
            <Reveal key={s} delay={i * 120}>
              <div className={`flex items-center gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                <div className={`flex-1 flex ${i % 2 !== 0 ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="inline-block glass rounded-2xl px-8 py-5 text-left">
                    <div className="font-mono text-[10px] text-primary tracking-widest mb-1">ETAPA {String(i + 1).padStart(2, "0")}</div>
                    <div className="text-2xl font-light">{s}</div>
                  </div>
                </div>
                <div className="hidden md:flex w-12 h-12 rounded-full border-2 border-primary bg-background items-center justify-center font-mono text-sm relative z-10" style={{ boxShadow: "0 0 24px oklch(0.78 0.18 195 / 0.5)" }}>
                  {i + 1}
                </div>
                <div className="flex-1" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 27 CONCLUSION ---------- */
function ChapterConclusion() {
  return (
    <Section id="ch-27" className="flex items-center">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "var(--gradient-glow)", animation: "pulse-glow 8s ease-in-out infinite" }} />

      <div className="relative w-full">
        <ChapterLabel n="27" title="encerramento" />

        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {[
            ["Storybook ≠ React", "não substitui o framework"],
            ["Storybook ≠ Design System", "não substitui o sistema"],
            ["Storybook = Ponte", "complementa os dois"],
          ].map(([t, d]) => (
            <Reveal key={t}>
              <div className="glow-border rounded-2xl p-6">
                <div className="font-mono text-lg mb-2">{t}</div>
                <div className="text-sm text-muted-foreground">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <blockquote className="max-w-4xl">
            <div className="font-mono text-xs tracking-widest text-primary mb-6">— MENSAGEM FINAL</div>
            <p className="text-3xl md:text-5xl font-light leading-tight">
              Se o <span className="text-gradient italic">Design System</span> define os padrões,
              <br />
              o <span className="text-gradient italic">Storybook</span> é o lugar
              <br />
              onde esses padrões <span className="italic">ganham vida.</span>
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-20 font-mono text-xs tracking-widest text-muted-foreground flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            FIM · TRANSMISSÃO ENCERRADA
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- MODULE BANNER ---------- */
function ModuleBanner({ n, title, time }: { n: string; title: string; time: string }) {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="glow-border rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-40"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="font-mono text-xs md:text-sm tracking-[0.4em] text-primary mb-6">
              MÓDULO · {n}
            </div>
            <h2 className="font-display font-light leading-[1.05] tracking-tight text-[clamp(2.2rem,5.5vw,5rem)]">
              <span className="text-gradient italic">{title}</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon" />
                tempo estimado · {time}
              </span>
              <span className="hidden md:inline">·</span>
              <span>4 integrantes · IFSP Caraguatatuba</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ACADEMIC CONTEXT ---------- */
function ChapterAcademic() {
  const team = ["David Rocha", "Giselle Hoekveld", "Nicoli dos Santos", "Raissa Patrício"];
  return (
    <Section id="ch-academic">
      <ChapterLabel n="00" title="contexto acadêmico" />
      <Reveal>
        <h2 className="font-light leading-tight text-[clamp(2.5rem,6vw,5.5rem)] max-w-4xl">
          Apresentação <span className="text-gradient italic">institucional.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <Reveal>
          <div className="glow-border rounded-2xl p-8 space-y-6">
            <Field label="instituição" value="IFSP — Caraguatatuba" />
            <Field label="disciplina" value="Desenvolvimento Web 3" />
            <Field label="data" value="Junho de 2026" />
            <Field label="tema" value="Storybook para React" />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-2xl p-8">
            <div className="font-mono text-xs tracking-widest text-primary mb-6">INTEGRANTES</div>
            <ul className="space-y-4">
              {team.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  <span className="font-display text-2xl text-primary tabular-nums w-8">
                    0{i + 1}
                  </span>
                  <span className="text-lg">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/20 p-6 md:p-8">
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-3">
            OBSERVAÇÃO
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Esta apresentação foi produzida em <span className="text-foreground">Junho de 2026</span>.
            Tecnologias, bibliotecas, APIs, comandos e versões podem sofrer alterações ao longo do tempo.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 pb-4 border-b border-border/40 last:border-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <span className="text-xl md:text-2xl">{value}</span>
    </div>
  );
}

/* ---------- DESIGN SYSTEM EXAMPLES ---------- */
function ChapterDSExamples() {
  const systems = [
    {
      name: "Microsoft Fluent UI",
      desc: "Linguagem visual da Microsoft, usada no Office, Teams e Windows.",
      url: "https://developer.microsoft.com/en-us/fluentui",
      tag: "microsoft",
      color: "primary",
    },
    {
      name: "Uber Base",
      desc: "Sistema modular da Uber, com tokens, ícones e componentes React abertos.",
      url: "https://base.uber.com/6d2425e9f/p/294ab4-base-design-system",
      tag: "uber",
      color: "accent",
    },
    {
      name: "Rocketseat Andromeda",
      desc: "DS brasileiro com tokens, componentes e documentação — ótima referência didática.",
      url: "https://andromeda.rocketseat.dev",
      tag: "rocketseat",
      color: "neon",
      highlight: true,
    },
    {
      name: "Shopify Polaris",
      desc: "Sistema do Shopify para painéis administrativos e e-commerce.",
      url: "https://polaris.shopify.com",
      tag: "shopify",
      color: "cyber",
    },
    {
      name: "IBM Carbon",
      desc: "Design system corporativo da IBM, multi-framework e open-source.",
      url: "https://carbondesignsystem.com",
      tag: "ibm",
      color: "magenta",
    },
    {
      name: "Adobe Spectrum",
      desc: "Linguagem visual da Adobe, base do Creative Cloud.",
      url: "https://spectrum.adobe.com",
      tag: "adobe",
      color: "primary",
    },
  ] as const;
  return (
    <Section id="ch-ds-examples">
      <ChapterLabel n="03b" title="exemplos no mundo real" />
      <Reveal>
        <h2 className="font-light leading-tight text-[clamp(2.5rem,5.5vw,5rem)] max-w-4xl">
          Design Systems que <span className="text-gradient italic">você pode visitar.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Não é teoria — empresas mantêm DS públicos para os times usarem, contribuírem e estudarem.
          Repare como todos seguem a mesma estrutura: tokens, componentes, padrões e documentação.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {systems.map((s) => (
          <Reveal key={s.name}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className={`block h-full rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                "highlight" in s && s.highlight
                  ? "glow-border"
                  : "glass hover:border-primary/40"
              }`}
            >
              <div
                className={`font-mono text-xs tracking-widest mb-4 ${
                  s.color === "primary" ? "text-primary" :
                  s.color === "accent" ? "text-accent" :
                  s.color === "neon" ? "text-neon" :
                  s.color === "cyber" ? "text-cyber" : "text-magenta"
                }`}
              >
                {s.tag}
              </div>
              <div className="text-xl md:text-2xl font-medium mb-3">{s.name}</div>
              <div className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</div>
              <div className="mt-5 font-mono text-[11px] text-primary tracking-widest">
                abrir design system →
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- INTERACTIVE STORYBOOK PLAYGROUND ---------- */
function ChapterRealStorybook() {
  const guide = [
    ["title", "Veja a hierarquia Form / Button na sidebar."],
    ["component", "Confirme que o componente renderizado é o Button."],
    ["tags: ['autodocs']", "Abra a página Docs do Heading — gerada automaticamente."],
    ["args & argTypes", "Abra a story Primary do Button e mexa nos Controls."],
    ["Actions", "Clique no botão e veja o evento 'click' na aba Actions."],
    ["Decorators", "Abra TextArea — note o label 'Observations' envolvendo o preview."],
  ];
  return (
    <Section id="ch-real">
      <ChapterLabel n="19b" title="o storybook real" />
      <Reveal>
        <h2 className="font-light leading-tight text-[clamp(2.5rem,5.5vw,5rem)] max-w-4xl">
          Pratique no <span className="text-gradient italic">Storybook real.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Esta apresentação explica os conceitos, mostra trechos de código e ilustra a interface.
          Mas a prática acontece na instância real do Storybook que mantemos para a disciplina —
          é lá que você navega pela sidebar, mexe nos Controls, vê Actions e abre a página Docs.
        </p>
      </Reveal>

      <Reveal delay={250}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 rounded-xl px-6 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Abrir Storybook real
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="font-mono text-xs text-muted-foreground break-all">
            {STORYBOOK_URL}
          </div>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-16">
          <div className="font-mono text-xs text-primary tracking-widest mb-4">ROTEIRO SUGERIDO</div>
          <div className="grid md:grid-cols-2 gap-4">
            {guide.map(([k, v]) => (
              <div key={k} className="glass rounded-xl p-5 flex gap-4">
                <div className="font-mono text-primary text-sm shrink-0 w-40">{k}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={500}>
        <p className="mt-10 text-center text-sm md:text-base text-muted-foreground italic max-w-2xl mx-auto">
          O botão flutuante <span className="text-primary not-italic">"Ver Storybook Real"</span> está disponível em todos os módulos —
          use-o sempre que quiser ver um conceito acontecendo de verdade.
        </p>
      </Reveal>
    </Section>
  );
}




/* ============================================================
   NEW CONTENT — DS deep dive, Storybook deep dive, Quizzes
   ============================================================ */

/* ---------- DS: do que é composto ---------- */
function ChapterDSComposition() {
  const parts = [
    ["Tokens de design", "Cores, espaçamentos, tipografia, raios, sombras — em variáveis nomeadas."],
    ["Componentes reutilizáveis", "Button, Input, Modal, Toast prontos para uso."],
    ["Documentação", "Guias de uso, exemplos vivos, do's and don'ts."],
    ["Boas práticas", "Como combinar componentes sem quebrar o sistema."],
    ["Diretrizes de uso", "Quando usar cada componente — e quando não usar."],
    ["Padronização visual", "Resultado final consistente entre produtos e times."],
  ];
  return (
    <Section id="ch-ds-comp">
      <ChapterLabel n="03b" title="do que é composto" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          Mais do que <span className="text-gradient italic">componentes</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          Um Design System não é só uma biblioteca de componentes. É um conjunto coordenado
          de decisões — visuais, técnicas e organizacionais — que mantém produtos consistentes.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {parts.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 100}>
            <div className="glass rounded-2xl p-6 h-full">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">PILAR · {String(i + 1).padStart(2, "0")}</div>
              <div className="text-lg font-medium mb-2">{t}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>

    </Section>
  );
}

/* ---------- DS: motivação ---------- */
function ChapterDSMotivation() {
  const benefits = [
    ["Consistência visual", "Layouts coerentes em todas as aplicações."],
    ["Reutilização", "Menos código duplicado entre times e projetos."],
    ["Escalabilidade", "Adicionar produto novo sem reinventar a UI."],
    ["Redução de retrabalho", "Decisões já tomadas, não revisitadas a cada feature."],
    ["Melhor experiência", "Usuários reconhecem padrões, devs entregam mais rápido."],
  ];
  return (
    <Section id="ch-ds-mot">
      <ChapterLabel n="03c" title="por que adotar" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          A <span className="text-gradient italic">motivação</span> é prática.
        </h2>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 100}>
            <div className="rounded-2xl p-6 border border-primary/30 bg-primary/5 h-full">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">BENEFÍCIO · {String(i + 1).padStart(2, "0")}</div>
              <div className="text-lg font-medium mb-2">{t}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Storybook: o que é ---------- */
function ChapterStorybookWhat() {
  const items = [
    ["Desenvolvimento isolado", "Construir o componente sem precisar rodar o app inteiro."],
    ["Documentação", "Cada componente vira uma página navegável."],
    ["Exploração visual", "Designers, PMs e devs interagem com a UI sem subir o produto."],
    ["Testes de interface", "Cliques, inputs e fluxos automatizados na própria story."],
    ["Catálogo de componentes", "Fonte única de verdade para todo o time."],
  ];
  return (
    <Section id="ch-sb-what">
      <ChapterLabel n="07b" title="o que é o storybook" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-3xl leading-tight">
          Uma ferramenta para <span className="text-gradient italic">cinco coisas</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          O Storybook reúne em um só lugar tudo o que costumava ficar espalhado:
          o sandbox do componente, a doc, o catálogo e os testes visuais.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(([t, d], i) => (
          <Reveal key={t} delay={(i % 3) * 100}>
            <div className="glow-border rounded-2xl p-6 h-full">
              <div className="font-mono text-[10px] tracking-widest text-primary mb-3">USO · {String(i + 1).padStart(2, "0")}</div>
              <div className="text-lg font-medium mb-2">{t}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Canvas vs Docs ---------- */
function ChapterCanvasVsDocs() {
  const docsContents = [
    "Preview do componente",
    "Tabela de Props",
    "Controls interativos",
    "Lista de Stories disponíveis",
    "Descrições e exemplos",
  ];
  return (
    <Section id="ch-canvas-docs">
      <ChapterLabel n="07c" title="canvas vs docs" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          Dois <span className="text-gradient italic">modos</span> de ver a mesma story.
        </h2>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="glass rounded-2xl p-8 h-full">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">CANVAS</div>
            <div className="text-xl font-medium mb-3">Onde a Story é renderizada</div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Área central do Storybook. Mostra apenas o componente, isolado,
              com fundo limpo. É aqui que você mexe nos Controls e vê o efeito ao vivo.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="glass rounded-2xl p-8 h-full">
            <div className="font-mono text-[10px] tracking-widest text-accent mb-4">DOCS</div>
            <div className="text-xl font-medium mb-3">Página gerada automaticamente</div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              Habilitada por <code className="px-1 rounded bg-muted text-accent font-mono text-sm">tags: ['autodocs']</code>. Reúne tudo o que documenta o componente em uma só página:
            </p>
            <ul className="space-y-1.5 text-sm">
              {docsContents.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="mt-10 text-center text-sm md:text-base text-muted-foreground italic">
          No Storybook real, abra o <span className="text-foreground font-mono not-italic">Heading</span> para ver uma página Docs completa.
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Story descriptions ---------- */
function ChapterStoryDescriptions() {
  const code = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading, type HeadingProps } from './Heading'

export default {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: { children: 'Título da página' },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: { as: 'h1', children: 'Sou um h1' },
  parameters: {
    docs: {
      description: {
        story:
          'Por padrão o heading sempre será um h2, mas podemos alterar isso com a propriedade as.',
      },
    },
  },
}`;
  return (
    <Section id="ch-story-desc">
      <ChapterLabel n="16b" title="descrições de stories" />
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-light max-w-4xl leading-tight">
          Documentação <span className="text-gradient italic">por story</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
          Além da descrição geral do componente, podemos descrever cada Story individualmente
          usando <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">parameters.docs.description.story</code>.
          O texto aparece logo abaixo do preview daquela story específica na aba Docs.
        </p>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
        <Reveal>
          <CodeBlock
            filename="Heading.stories.tsx"
            code={code}
            highlight={[`parameters: {
    docs: {
      description: {
        story:
          'Por padrão o heading sempre será um h2, mas podemos alterar isso com a propriedade as.',
      },
    },
  },`]}
          />
        </Reveal>
        <Reveal delay={200}>
          <div className="glass rounded-2xl p-8">
            <div className="font-mono text-[10px] tracking-widest text-primary mb-4">DOCS · STORY "CUSTOM TAG"</div>
            <h1 className="text-3xl font-light mb-3">Sou um h1</h1>
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/60 pl-4">
              Por padrão o heading sempre será um h2, mas podemos alterar isso com a propriedade <code className="text-primary font-mono">as</code>.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="font-mono text-[10px] tracking-widest text-primary mb-1">DOC DO COMPONENTE</div>
                <div className="text-muted-foreground">Descrição geral, vale para todas as stories.</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="font-mono text-[10px] tracking-widest text-accent mb-1">DOC DA STORY</div>
                <div className="text-muted-foreground">Texto específico para uma variação só.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- Quiz component ---------- */
type QuizQuestion = { question: string; options: string[]; answer: number; explain?: string };

function Quiz({ id, moduleN, title, questions }: { id: string; moduleN: string; title: string; questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <Section id={id}>
      <ChapterLabel n={`Q${moduleN}`} title={`quiz · módulo ${moduleN}`} />
      <Reveal>
        <h2 className="text-4xl md:text-6xl font-light max-w-3xl leading-tight">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl">
          Selecione uma alternativa para revelar a resposta.
        </p>
      </Reveal>

      <div className="mt-12 space-y-8">
        {questions.map((q, qi) => {
          const sel = picked[qi];
          const answered = sel !== undefined;
          return (
            <Reveal key={qi} delay={qi * 80}>
              <div className="glass rounded-2xl p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-widest text-primary mb-3">PERGUNTA {qi + 1}</div>
                <div className="text-lg md:text-xl mb-6 leading-snug">{q.question}</div>
                <div className="grid gap-3">
                  {q.options.map((op, oi) => {
                    const correct = oi === q.answer;
                    const chosen = sel === oi;
                    const cls = !answered
                      ? "border-border hover:border-primary/60 hover:bg-muted/20"
                      : correct
                      ? "border-primary bg-primary/10 text-primary"
                      : chosen
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-border opacity-50";
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={answered}
                        onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                        className={`text-left px-4 py-3 rounded-lg border transition-colors text-sm md:text-base ${cls}`}
                      >
                        <span className="font-mono text-xs mr-3 text-muted-foreground">{String.fromCharCode(65 + oi)}.</span>
                        {op}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <div className={`mt-5 text-sm md:text-base ${sel === q.answer ? "text-primary" : "text-muted-foreground"}`}>
                    {sel === q.answer
                      ? "✓ Correto."
                      : `✗ Resposta correta: ${q.options[q.answer]}.`}
                    {q.explain ? ` ${q.explain}` : ""}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}


function QuizModule2() {
  return (
    <Quiz
      id="quiz-2"
      moduleN="2"
      title="Quiz do Módulo 2"
      questions={[
        {
          question: "No exemplo dos quatro times implementando o mesmo botão, qual foi o principal problema observado?",
          options: [
            "Cada time seguiu exatamente o mesmo padrão visual",
            "Cada time implementou de forma diferente, gerando inconsistência",
            "Todos usaram a mesma biblioteca pronta",
            "Nenhuma das alternativas",
          ],
          answer: 1,
          explain: "Sem padrão compartilhado, surgem variações de cor, espaçamento e comportamento entre produtos.",
        },
        {
          question: "Por que essa inconsistência impacta o produto final?",
          options: [
            "Aumenta a performance da aplicação",
            "Cria atrito para o usuário e retrabalho para o time",
            "Reduz a quantidade de código",
            "Não tem impacto real",
          ],
          answer: 1,
        },
        {
          question: "Qual abaixo é uma das motivações para utilização de design systems?",
          options: [
            "Manter layouts consistentes entre aplicações diferentes",
            "Facilitar a utilização do Flex CSS com tecnologias que criam componentes para a gente",
            "Facilitar o desenvolvimento de um MVP",
            "Nenhuma das alternativas",
          ],
          answer: 0,
        },
        {
          question: "O que é um design system?",
          options: [
            "É toda a documentação de apenas uma aplicação que iremos desenvolver",
            "É uma forma de descrever componentes estilizados no ReactJS",
            "É uma documentação dos padrões que seguimos entre os layouts das nossas aplicações",
            "Nenhuma das alternativas",
          ],
          answer: 2,
        },
      ]}
    />
  );
}

function QuizModule3() {
  return (
    <Quiz
      id="quiz-3"
      moduleN="3"
      title="Quiz do Módulo 3"
      questions={[
        {
          question: "Assinale a alternativa que melhor descreve o que é o Storybook.",
          options: [
            "É uma biblioteca que permite a gente documentar componentes do Front-end",
            "É uma biblioteca que permite a gente testar a regra de negócio dos nossos componentes",
            "É uma biblioteca de criação de Design Systems para apps mobile",
            "Nenhuma das alternativas",
          ],
          answer: 0,
        },
      ]}
    />
  );
}

function QuizModule4() {
  return (
    <Quiz
      id="quiz-4"
      moduleN="4"
      title="Quiz do Módulo 4"
      questions={[
        {
          question: "Como podemos adicionar logs aos nossos componentes do Storybook?",
          options: [
            "Adicionando uma propriedade onClick com um console.log() no nosso componente",
            "Configurando a propriedade argTypes para receber as ações que queremos que façam log",
            "Adicionando uma propriedade log dentro da propriedade argTypes",
            "Nenhuma das alternativas",
          ],
          answer: 1,
          explain: "Usamos action no argType — por exemplo: onClick: { action: 'click' } — e o evento aparece na aba Actions.",
        },
        {
          question: "Conseguimos permitir que os usuários selecionem por meio de inputs de radio as variantes dos nossos componentes através do Storybook, configurando controles dentro de argTypes.",
          options: ["Verdadeiro", "Falso"],
          answer: 0,
          explain: "Basta definir control: { type: 'inline-radio' } e listar as options.",
        },
        {
          question: "No Storybook podemos adicionar uma propriedade story nos parâmetros da Story para adicionar contexto adicional ao funcionamento do componente.",
          options: ["Verdadeiro", "Falso"],
          answer: 1,
          explain: "O correto é parameters.docs.description.story — não uma propriedade chamada apenas story no objeto principal.",
        },
      ]}
    />
  );
}

/* ---------- SUMÁRIO (TOC) ---------- */
function ChapterSummary() {
  const items = [
    ["01", "Conceito de Design System", "O que é, do que é composto, motivação e exemplos reais."],
    ["02", "O que é Storybook", "História, frameworks suportados e empresas que usam em produção."],
    ["03", "Documentação de componentes", "Stories, args, decorators, Autodocs e MDX."],
    ["04", "Testes", "Interação com play(), unitários com Vitest e acessibilidade com axe-core."],
    ["05", "Integração Contínua (CI)", "Publicação automática do Storybook no GitHub Pages."],
  ];
  return (
    <Section id="ch-summary">
      <ChapterLabel n="0b" title="sumário" />
      <Reveal>
        <h2 className="font-light leading-tight text-[clamp(2.5rem,6vw,5rem)] max-w-4xl">
          O caminho da <span className="text-gradient italic">apresentação</span>.
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
          Cinco paradas para sair do caos da inconsistência visual e chegar a um Storybook publicado, testado e integrado ao CI.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-4">
        {items.map(([n, t, d], i) => (
          <Reveal key={n} delay={i * 80}>
            <div className="glass rounded-2xl p-6 md:p-7 flex items-start gap-6">
              <div className="font-display text-4xl md:text-5xl text-primary tabular-nums leading-none">{n}</div>
              <div className="flex-1">
                <div className="text-xl md:text-2xl font-medium">{t}</div>
                <div className="text-sm md:text-base text-muted-foreground mt-1">{d}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={500}>
        <div className="mt-10 font-mono text-xs tracking-widest text-muted-foreground flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          começo · meio · fim
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- ADVANCED REVEAL (Módulo 4) ---------- */
function AdvancedReveal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // abre automaticamente se a URL tiver um hash de seção avançada
  useEffect(() => {
    const advancedIds = [
      "ch-16", "ch-story-desc", "ch-canvas-docs",
      "ch-17", "ch-18", "ch-19", "ch-real",
    ];
    const check = () => {
      const hash = window.location.hash.replace("#", "");
      if (advancedIds.includes(hash)) setOpen(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  if (open) return <>{children}</>;
  return (
    <section id="ch-advanced" className="px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border border-dashed border-primary/50 p-8 md:p-12 text-center relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-30"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="font-mono text-[10px] tracking-[0.3em] text-primary mb-4">
              CONTEÚDO AVANÇADO · MÓDULO 04
            </div>
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              Mais detalhes técnicos do <span className="text-gradient italic">Storybook</span>
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Decorators, descrições por story, Canvas vs Docs, anatomia da UI, Autodocs/MDX,
              ecossistema de addons e exploração do Storybook real.
              <br />
              Ficam <span className="text-foreground">ocultos durante a apresentação ao vivo</span> para manter o ritmo —
              mas seguem disponíveis para consulta após o encerramento.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-mono uppercase tracking-widest hover:scale-[1.02] transition-transform"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <ChevronDown className="w-4 h-4" />
              Ver mais
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

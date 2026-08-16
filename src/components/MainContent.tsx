import * as React from "react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { Dialog, IconButton } from "@mui/material";
import { PortableText } from "@portabletext/react";
import dayjs from "dayjs";
import { useAbout } from "~/hooks/useAbout";
import { useProjects } from "~/hooks/useProjects";
import { useTestimonial } from "~/hooks/useTestimonial";
import { urlFor } from "~/lib/imageBuilder";
import type { Project } from "~/types/project";
import Reveal from "./Reveal";

type SocialLink = {
  iconName: string;
  url: string;
};

type AboutData = {
  name: string;
  description: Parameters<typeof PortableText>[0]["value"];
  profilePhoto?: string;
  socialLinks?: SocialLink[];
};

const socialMeta: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  LinkedInIcon: { label: "LinkedIn", icon: <LinkedInIcon /> },
  GitHubIcon: { label: "GitHub", icon: <GitHubIcon /> },
  PeerList: { label: "Peerlist", icon: <PeopleAltRoundedIcon /> },
  MediumIcon: { label: "Writing", icon: <NewspaperRoundedIcon /> },
};

function plainText(blocks: Project["description"]) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) =>
      Array.isArray(block.children)
        ? block.children
            .map((child) => ("text" in child ? child.text : ""))
            .join("")
        : ""
    )
    .filter(Boolean)
    .join(" ");
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <p>{children}</p>
    </div>
  );
}

function LoadingScreen() {
  return (
    <main className="loading-screen" aria-live="polite" aria-label="Loading developer data">
      <div className="loader-topline">
        <strong>Rohit Madas</strong>
        <span>Portfolio system / 2026</span>
      </div>

      <div className="loader-layout">
        <section className="loader-message">
          <p><span>$</span> fetch --developer-data</p>
          <h1>Loading<br /><em>developer data.</em></h1>
        </section>

        <div className="loader-status" aria-hidden="true">
          <p><i /> Profile connected</p>
          <p><i /> Projects indexing</p>
          <p><i /> Stories preparing</p>
        </div>
      </div>

      <div className="loader-footer">
        <div className="loading-line"><i /></div>
        <div>
          <strong>Please stand by</strong>
          <span>Sanity / Live dataset</span>
        </div>
      </div>
    </main>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const hasDescription = project ? Boolean(plainText(project.description).trim()) : false;

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      aria-labelledby="project-dialog-title"
      slotProps={{ paper: { className: "project-dialog" } }}
    >
      {project && (
        <div className="project-dialog__layout">
          <div className="project-dialog__image-wrap">
            <img
              className="project-dialog__image"
              src={urlFor(project.image).width(1400).quality(90).url()}
              alt={project.title}
            />
            <span className="project-dialog__stamp">Selected work</span>
          </div>
          <div className="project-dialog__content">
            <IconButton className="project-dialog__close" onClick={onClose} aria-label="Close case study">
              <CloseRoundedIcon />
            </IconButton>
            <p className="project-dialog__eyebrow">
              {project.date ? dayjs(project.date).format("YYYY") : "Case study"}
            </p>
            <h2 id="project-dialog-title">{project.title}</h2>
            {project.shortTitle && <p className="project-dialog__subtitle">{project.shortTitle}</p>}
            {hasDescription && (
              <div className="project-dialog__body">
                <PortableText value={project.description} />
              </div>
            )}
            <div className="project-dialog__footer">
              <span>Role</span>
              <strong>{project.createdBy ? `Built by ${project.createdBy}` : "Frontend engineering"}</strong>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default function MainContent() {
  const aboutQuery = useAbout();
  const projectsQuery = useProjects();
  const testimonialsQuery = useTestimonial();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [introElapsed, setIntroElapsed] = React.useState(false);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setIntroElapsed(true), reduceMotion ? 400 : 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const about = aboutQuery.data as AboutData | undefined;
  const projects = projectsQuery.data ?? [];
  const testimonials = testimonialsQuery.data ?? [];
  const isLoading = aboutQuery.isLoading || projectsQuery.isLoading || testimonialsQuery.isLoading;
  const hasError = aboutQuery.isError || projectsQuery.isError || testimonialsQuery.isError;

  if ((isLoading && !about) || !introElapsed) return <LoadingScreen />;

  return (
    <main id="top" className="portfolio-main">
      {hasError && (
        <div className="data-notice" role="status">
          Some live content could not be loaded. Please refresh to try again.
        </div>
      )}

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero__topline hero-animate hero-animate--one">
          <p>Portfolio / 2026</p>
          <p>Pune, India</p>
        </div>

        <div className="hero__personal">
          <div className="hero__headline hero-animate hero-animate--two">
            <p className="hero__kicker">Hello, I&apos;m {about?.name ?? "Rohit Madas"}.</p>
            <h1 id="hero-title">
              A frontend engineer
              <span>who cares about the details people feel.</span>
            </h1>
            <div className="hero__intro">
              <p>
                I build thoughtful web and mobile experiences across FinTech,
                SaaS, and complex product ecosystems—always balancing clarity,
                craft, and dependable engineering.
              </p>
              <div className="hero__ctas">
                <a className="button-primary" href="#work">
                  See my work <ArrowDownwardRoundedIcon />
                </a>
                <a
                  className="button-quiet"
                  href="https://www.linkedin.com/in/rohit-madas-41328b178/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Say hello <ArrowOutwardRoundedIcon />
                </a>
              </div>
            </div>
          </div>

          <figure className="hero__portrait-wrap hero-animate hero-animate--three">
            <div className="hero__portrait-mat">
              {about?.profilePhoto ? (
                <img className="hero__portrait" src={about.profilePhoto} alt={about.name} />
              ) : (
                <div className="hero__portrait hero__portrait--empty" />
              )}
            </div>
            <figcaption>
              <span>Rohit, off-screen</span>
              <span>Pune / India</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="about" className="about section-shell">
        <Reveal className="about__label">
          <SectionLabel index="01">Perspective</SectionLabel>
        </Reveal>
        <Reveal className="about__statement" delay={80}>
          <p>
            Engineering is only half the job.
            <em> The other half is making it feel inevitable.</em>
          </p>
        </Reveal>
        <Reveal className="about__copy" delay={160}>
          {about?.description && <PortableText value={about.description} />}
        </Reveal>
        <Reveal className="about__stats" delay={240}>
          <div><strong>{projects.length || "—"}</strong><span>Projects documented</span></div>
          <div><strong>03</strong><span>Industries navigated</span></div>
          <div><strong>05</strong><span>Core disciplines</span></div>
        </Reveal>
      </section>

      <section id="work" className="work-section section-shell">
        <Reveal className="section-heading">
          <SectionLabel index="02">Selected archive</SectionLabel>
          <h2>Work that moved<br /><em>the needle.</em></h2>
          <p>A cross-section of platforms, products, and systems delivered across industries.</p>
        </Reveal>

        <div className="project-grid">
          {projects.map((project, index) => {
            const description = plainText(project.description);
            return (
              <Reveal
                as="article"
                className="project-card"
                delay={(index % 3) * 80}
                key={project._id}
              >
                <button type="button" onClick={() => setSelectedProject(project)}>
                  <div className="project-card__visual">
                    <img
                      src={urlFor(project.image).width(1200).quality(85).url()}
                      alt=""
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="project-card__content">
                    <div className="project-card__heading">
                      <div className="project-card__index">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{project.date ? dayjs(project.date).format("YYYY") : "Archive"}</span>
                      </div>
                      <p>{project.shortTitle || "Product engineering"}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <p className="project-card__excerpt">
                      {description || "A product case study from the archive."}
                    </p>
                    <span className="project-card__read">Read the story <ArrowOutwardRoundedIcon /></span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="testimonials" className="voices section-shell">
        <Reveal className="section-heading section-heading--voices">
          <SectionLabel index="03">Trusted by teams</SectionLabel>
          <h2>Good work leaves<br /><em>an echo.</em></h2>
        </Reveal>

        <div className="voices__grid">
          {testimonials.map((testimonial, index) => (
            <Reveal as="article" className="quote-card" delay={index * 90} key={testimonial._id}>
              <span className="quote-card__mark">“</span>
              <blockquote>{testimonial.testimonial}</blockquote>
              <div className="quote-card__person">
                {testimonial.profileImage ? (
                  <img src={testimonial.profileImage} alt="" loading="lazy" />
                ) : (
                  <span className="quote-card__initial">{testimonial.name.charAt(0)}</span>
                )}
                <div>
                  <strong>{testimonial.name}</strong>
                  <p>{testimonial.jobTitle}{testimonial.company ? ` · ${testimonial.company}` : ""}</p>
                </div>
                {testimonial.linkedinUrl && (
                  <a href={testimonial.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`View ${testimonial.name}'s recommendation`}>
                    <ArrowOutwardRoundedIcon />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-section section-shell">
        <Reveal className="contact-section__content">
          <p>Have an ambitious product in mind?</p>
          <a
            href="https://www.linkedin.com/in/rohit-madas-41328b178/"
            target="_blank"
            rel="noreferrer"
          >
            Let&apos;s make it real.<ArrowOutwardRoundedIcon />
          </a>
        </Reveal>

        <footer className="site-footer">
          <div className="site-footer__brand">RM<span>®</span></div>
          <p>Designed with intent. Engineered with care.</p>
          <div className="site-footer__socials">
            {about?.socialLinks?.map((link) => {
              const meta = socialMeta[link.iconName] ?? {
                label: "Social profile",
                icon: <ArrowOutwardRoundedIcon />,
              };
              return (
                <a key={`${link.iconName}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" aria-label={meta.label}>
                  {meta.icon}<span>{meta.label}</span>
                </a>
              );
            })}
          </div>
          <p>© {new Date().getFullYear()} Rohit Madas</p>
        </footer>
      </section>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

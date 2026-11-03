import Link from 'next/link';
import TechTag from './TechTag';
import TrackBadge from './TrackBadge';
import { projectLinks } from '@/lib/projectLinks';
import type { Project } from '@/lib/content';

export default function ProjectCard({
  project,
  featured = false,
  className = '',
}: {
  project: Project;
  featured?: boolean;
  className?: string;
}) {
  const links = projectLinks(project);

  return (
    <article
      className={`group flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-card p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3
          className={`font-semibold tracking-tight ${
            featured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {project.href ? (
            <Link href={project.href} className="tap transition-colors hover:text-accent">
              {project.title}
            </Link>
          ) : (
            <span>{project.title}</span>
          )}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {project.status && (
            <span className="shrink-0 rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
              {project.status}
            </span>
          )}
          <TrackBadge track={project.track} />
        </div>
      </div>

      {project.metric && (
        <div
          className={
            featured
              ? 'mt-5 flex flex-wrap items-end gap-x-3 gap-y-1'
              : 'mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1'
          }
        >
          <span
            className={
              featured
                ? 'text-4xl font-semibold tracking-tight text-accent'
                : 'font-mono text-sm font-medium text-accent'
            }
          >
            {project.metric.value}
          </span>
          <span
            className={
              featured
                ? 'pb-1 text-sm text-muted'
                : 'font-mono text-[0.625rem] text-muted'
            }
          >
            {project.metric.label}
          </span>
          {project.metric.note && (
            <span className="ml-auto font-mono text-[0.625rem] text-muted">
              {project.metric.note}
            </span>
          )}
        </div>
      )}

      <p className={`mt-3 flex-1 text-muted ${featured ? 'text-base' : 'text-sm'}`}>
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>

      {(project.href || links.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-hairline pt-4 text-sm">
          {project.href && (
            <Link
              href={project.href}
              className="tap font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {project.ctaLabel ?? 'View →'}
            </Link>
          )}
          {links.map((link) => (
            <a
              key={link.kind}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tap text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

import Link from 'next/link';
import TechTag from './TechTag';
import { projectLinks } from '@/lib/projectLinks';
import type { Project } from '@/lib/content';

export default function ProjectCard({ project }: { project: Project }) {
  const links = projectLinks(project);

  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-card p-5 transition-colors hover:border-accent/40">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.href ? (
            <Link href={project.href} className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          ) : (
            <span>{project.title}</span>
          )}
        </h3>
        {project.status && (
          <span className="shrink-0 rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
            {project.status}
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>

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
              className="font-medium text-accent transition-colors hover:text-accent-hover"
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
              className="text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

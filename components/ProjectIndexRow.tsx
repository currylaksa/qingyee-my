import Link from 'next/link';
import TechTag from './TechTag';
import TrackBadge from './TrackBadge';
import { projectLinks } from '@/lib/projectLinks';
import type { Project } from '@/lib/content';

export default function ProjectIndexRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const links = projectLinks(project);

  return (
    <article className="group border-t border-hairline">
      <div className="grid gap-4 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start">
        <span className="font-mono text-xs text-muted">
          {String(index).padStart(2, '0')}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-semibold tracking-tight">
              {project.href ? (
                <Link
                  href={project.href}
                  className="tap transition-colors group-hover:text-accent"
                >
                  {project.title}
                </Link>
              ) : (
                <span>{project.title}</span>
              )}
            </h3>
            <TrackBadge track={project.track} />
            {project.status && (
              <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] text-muted">
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-sm text-muted">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          {project.metric && (
            <p className="font-mono text-sm">
              <span className="text-lg text-accent">{project.metric.value}</span>
              <span className="ml-2 text-[0.625rem] text-muted">
                {project.metric.label}
              </span>
            </p>
          )}

          {(project.href || links.length > 0) && (
            <div className="flex flex-wrap gap-4 text-sm sm:justify-end">
              {project.href && (
                <Link
                  href={project.href}
                  className="tap font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  View →
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
        </div>
      </div>
    </article>
  );
}

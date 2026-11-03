'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectIndexRow from './ProjectIndexRow';
import type { Project, ProjectTrack } from '@/lib/content';

type Filter = 'All' | ProjectTrack;

const filters: Filter[] = [
  'All',
  'Test & automation',
  'Software',
  'Networks',
  'Security',
];

export default function ProjectDossier({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>('All');

  const count = (filter: Filter) =>
    filter === 'All'
      ? projects.length
      : projects.filter((project) => project.track === filter).length;

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((project) => project.track === active);

  const lead = filtered.slice(0, 3);
  const archive = filtered.slice(3);
  const featureLead = filtered.length >= 3;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by track">
        {filters.map((filter) => {
          const selected = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                selected
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-hairline text-muted hover:border-accent/40 hover:text-accent'
              }`}
            >
              {filter}
              <span className="ml-2 opacity-60">{count(filter)}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-xs text-muted" role="status">
        showing {filtered.length} of {projects.length}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-[var(--radius-card)] border border-hairline bg-card p-6 text-muted">
          No projects in this track yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lead.map((project, i) => {
            const isFeature = featureLead && i === 0;
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={isFeature}
                className={
                  isFeature
                    ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                    : undefined
                }
              />
            );
          })}
        </div>
      )}

      {archive.length > 0 && (
        <div className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-sm text-accent">// archive</p>
            <p className="font-mono text-xs text-muted">
              {archive.length} more
            </p>
          </div>
          <div className="mt-4 border-b border-hairline">
            {archive.map((project) => (
              <ProjectIndexRow
                key={project.slug}
                project={project}
                index={projects.findIndex((p) => p.slug === project.slug) + 1}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

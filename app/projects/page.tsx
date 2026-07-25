import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI and full-stack projects: a production ML-backed exam platform, Python automation tooling, native Swift utilities, and encrypted peer-to-peer file transfer.',
};

export default function ProjectsPage() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <Kicker>projects</Kicker>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          AI systems, built and shipped end to end
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          SecureExam pairs a machine-learning risk scorer with a hardened
          full-stack platform; the Huawei suite automates real operational
          workflows in Python. Everything here runs somewhere — deployed,
          operated, and measured.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

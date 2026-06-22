import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Security-focused projects: a production zero-trust exam platform, network automation tooling, networking labs, and encrypted peer-to-peer file transfer.',
};

export default function ProjectsPage() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <Kicker>projects</Kicker>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Application-layer zero trust meets network-layer security
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          SecureExam hardens the application layer; the networking labs and Huawei
          automation work cover the network layer. Together they make the case for
          full-stack, defense-in-depth security.
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

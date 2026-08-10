import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Network and security projects: a production zero-trust platform, a segmented enterprise network design (OSPF, VLANs, ACLs, VPN), carrier 5G deployment work and automation tooling, plus encrypted peer-to-peer file transfer and native Swift utilities.',
};

export default function ProjectsPage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>projects</Kicker>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Networks designed, secured, and shipped
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          SecureExam is a production zero-trust platform; the Sunray project
          is a segmented enterprise network built on OSPF routing, VLANs,
          and VPN; the Huawei internship was carrier-network deployment
          across 100+ teams. Designed, deployed, and measured — with what
          shipped and what stayed a design each labelled as such.
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

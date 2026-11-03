import type { Metadata } from 'next';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import ProjectDossier from '@/components/ProjectDossier';
import { projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Software and test projects: a production zero-trust platform, a test-heavy Xiangqi coach with 141 backend tests, carrier 5G automation tooling, native Swift utilities, and segmented enterprise network designs (OSPF, VLANs, ACLs, VPN).',
};

export default function ProjectsPage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>projects</Kicker>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I’ve designed, tested, and shipped
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          SecureExam is a production zero-trust platform; Xiangqi Shifu is a
          test-heavy chess coach with 141 backend tests; the Huawei internship
          shipped five automation tools on a carrier 5G rollout; the campus and
          enterprise designs apply the CCNA material end to end. Ordered by
          what sits closest to the work I do now — software, test, and data.
          What shipped and what stayed a design are each labelled as such.
        </p>

        <ProjectDossier projects={projects} />
      </Container>
    </section>
  );
}

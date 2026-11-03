import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Kicker from '@/components/Kicker';
import CareerPath from '@/components/CareerPath';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { experience } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Chan Qing Yee — Test Solutions Engineer at Micron Technology, Singapore; former Project Engineer Intern at Huawei Technologies Malaysia; B.Sc. Computer Science, UTM.',
};

export default function ExperiencePage() {
  return (
    <section>
      <Container className="py-12 sm:py-20">
        <Kicker>experience</Kicker>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Experience &amp; education
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          I’m currently a Test Solutions Engineer at Micron Technology in
          Singapore, testing memory at the wafer level. Before that: carrier
          deployment at Huawei, and a Computer Science degree from UTM,
          specialising in Networks &amp; Security.
        </p>

        <div className="mt-10">
          <p className="font-mono text-xs text-muted">// path</p>
          <CareerPath entries={experience} className="mt-4" />
        </div>

        <div className="mt-12">
          <Kicker>milestones</Kicker>
          <ExperienceTimeline entries={experience} />
        </div>

        <p className="mt-10 text-sm text-muted">
          The full project list is on{' '}
          <Link
            href="/projects"
            className="font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Projects
          </Link>
          ; certifications, skills, and education are on{' '}
          <Link
            href="/credentials"
            className="font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Credentials
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}

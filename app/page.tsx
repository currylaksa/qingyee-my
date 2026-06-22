import Container from '@/components/Container';
import { personalInfo, valueProp } from '@/lib/content';

// Milestone 1 scaffold: layout shell verification only.
// The full hero, pillars, teasers, and strips land in Milestone 2.
export default function Home() {
  return (
    <Container className="py-24">
      <p className="font-mono text-sm text-accent">// {personalInfo.tagline.toLowerCase()}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {personalInfo.fullName}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{valueProp}</p>
      <p className="mt-12 font-mono text-xs text-muted">
        scaffold · milestone 1 — layout shell, design tokens, content module
      </p>
    </Container>
  );
}

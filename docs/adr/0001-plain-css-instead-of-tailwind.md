# Plain CSS instead of Tailwind

The build spec (v2.0) recommends Astro + Tailwind, but we use **Astro + plain CSS** (the locked CSS custom properties from spec §3 plus scoped per-component styles). The design is hyper-specific — a locked token palette and exact px / letter-spacing values — which in Tailwind would become a sea of arbitrary-value utilities (`text-[10px] tracking-[2px]`) that are harder to read and maintain than CSS written directly against the tokens. Dropping Tailwind also removes a dependency. We keep Astro for its component model, which earns its place given the repeated Widget / StatRow / SkillTag patterns.

A future reader holding the spec will expect Tailwind — this records that its absence is deliberate, not an oversight.

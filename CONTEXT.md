# qingyee.my

Personal portfolio and brand site for Chan Qing Yee — a hiring-manager-facing portfolio (targeting Singapore tech roles) and a personal-brand page for the *Wilderfarer* identity. This glossary pins the project-specific language so copy stays consistent.

## Language

**Wilderfarer**:
Chan's coined personal-brand identity — an outdoors-leaning maker who is "between deployments." Used as a tagline and a section name, not a job title.
_Avoid_: nomad, wanderer, adventurer

**Selenophile / Dendrophile / Hodophile**:
The three identity traits under Wilderfarer — lover of the moon / of trees / of travel, respectively. Always use these exact three words.

**Graduand**:
Chan's status as of June 2026 — coursework and FYP complete, degree just finished/awaiting conferral. Copy uses present-perfect tense ("shipped", "built") and signals "available now".
_Avoid_: final-year student, undergraduate (these understate availability), alumni

**SecureExam UTM**:
The lead case study — a zero-trust online examination platform; FYP that won DIGITEX 2026 Silver. Live at secureexam-cqy.tech.
_Avoid_: SecureExam (always pair with UTM on first mention), "the exam app"

**Control #26 / 26 controls**:
SecureExam maps exactly **26** security controls; the AI Behavioural Risk Scoring feature is specifically Control #26. The number 26 is canonical — never round or approximate it.

**Project Dossier**:
The section/grid title for the projects showcase. Renders **7** projects (SecureExam UTM, U Mobile 5G network upgrade, Enterprise network design, DuoDrop, World Cup 2026 PWA, macOS menu-bar utilities, Free QR Code Generator).
_Avoid_: "Portfolio" as the grid name (that's the whole site)

**Enterprise network design**:
The Sunray case study — SECR 3242 Internetworking Technology coursework, a **4-person team project**. Sunray Construction & Interior Sdn Bhd is the *case-study subject*, never a client, and the site must say so. Team size is stated; individual role split is deliberately not broken out.
_Avoid_: "for Sunray Construction" (implies an engagement), "client", "consulting work", any wording implying solo authorship

**docs/reference/**:
Local-only source documents (the group report, both resume PDFs). **Gitignored** — this repo is public, so the network report's teammate names, matric numbers, photos, and lab VPN credentials must never enter git history. It is also outside `public/`, so the site never serves it. Facts may be *read* from these files into site copy; the files themselves stay local.
_Avoid_: committing the directory, moving it under `public/`, quoting its credentials or teammate details

**Network & Security Engineer**:
Chan's target role and the site's headline positioning as of August 2026. The AI/ML work (the Isolation Forest risk scorer, Control #26) is framed as the *secondary* story — evidence of automation and applied-ML depth behind the networking work — never the headline.
_Avoid_: "AI Solutions Engineer" as a title (the previous positioning), "aspiring", "junior"

**DIGITEX 2026**:
The competition where SecureExam won **Silver** (Grand Finale, 15 June 2026, Johor Bahru). Always "Silver", never "second place".

## Flagged ambiguities (resolved)

- **Project count** — the spec said 4 (§6.6), 6 (§9), and "7+" (stats widget). Resolved: **7** projects render, after adding the Sunray enterprise network (slug `sunray-network`).
- **Status/tense** — spec mixed "final-year student", "graduand", and "graduated". Resolved: **graduand**, present-perfect tense.

## Example dialogue

> **Dev:** The hero says "final-year student ships SecureExam" — is that right?
> **Chan:** No, I'm a *graduand* now — coursework and FYP are done. Use "graduand" and past/perfect tense; it tells hiring managers I'm available.
> **Dev:** And any project count in copy has to match the Dossier cards.
> **Chan:** Right — whatever number we print, it matches the cards. It's 7 now that the Sunray enterprise network is in. Never count the five Huawei automation tools separately; that's one project, not five.

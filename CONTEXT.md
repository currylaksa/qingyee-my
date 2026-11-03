# qingyee.my

Personal portfolio and brand site for Chan Qing Yee — a hiring-manager-facing portfolio for a **Test Solutions Engineer** at Micron Technology, Singapore, and a personal-brand page for the *Wilderfarer* identity. This glossary pins the project-specific language so copy stays consistent.

## Language

**Wilderfarer**:
Chan's coined personal-brand identity — an outdoors-leaning maker who is "between deployments." Used as a tagline and a section name, not a job title.
_Avoid_: nomad, wanderer, adventurer

**Selenophile / Dendrophile / Hodophile**:
The three identity traits under Wilderfarer — lover of the moon / of trees / of travel, respectively. Always use these exact three words.

**Test Solutions Engineer**:
Chan's current role at **Micron Technology, Singapore**, started **19 October 2026**. The site's headline positioning and the first line of the experience timeline.
_Avoid_: graduand, "open to Singapore roles", "aspiring", "junior", "final-year student"

**Probe (wafer sort)**:
The process step after fabrication and before assembly/packaging: die are tested while still on the wafer with a wafer-sort prober and probe card, so bad die are caught before packaging costs are spent on them. **Probe is not the team name** — describe it as a process, not an org.
_Avoid_: calling the team "the probe team"; naming specific Micron products, internal tools, or datasets (NDA — keep copy generic)

**Micron copy rule**:
Keep the role public but high-level: wafer-level/probe test, test programs, test data, remote test environments, memory products. Do not publish product families, internal tool names, yield figures, or operational datasets.

**SecureExam UTM**:
The lead case study — a zero-trust online examination platform; FYP that won DIGITEX 2026 Silver. Live at secureexam-cqy.tech.
_Avoid_: SecureExam (always pair with UTM on first mention), "the exam app"

**Control #26 / 26 controls**:
SecureExam maps exactly **26** security controls; the AI Behavioural Risk Scoring feature is specifically Control #26. The number 26 is canonical — never round or approximate it.

**Project Dossier**:
The section/grid title for the projects showcase. Renders **9** projects, ordered closest-to-current-work first: SecureExam UTM, U Mobile 5G network upgrade, Xiangqi Shifu, macOS menu-bar utilities, Enterprise network design, Two-storey campus network, DuoDrop, World Cup 2026 PWA, Free QR Code Generator.
_Avoid_: "Portfolio" as the grid name (that's the whole site)

**Enterprise network design**:
The Sunray case study — SECR 3242 Internetworking Technology coursework, a **4-person team project**. Sunray Construction & Interior Sdn Bhd is the *case-study subject*, never a client, and the site must say so. Team size is stated; individual role split is deliberately not broken out.
_Avoid_: "for Sunray Construction" (implies an engagement), "client", "consulting work", any wording implying solo authorship

**docs/reference/**:
Local-only source documents (the group reports, both resume PDFs). **Gitignored** — this repo is public, so the network report's teammate names, matric numbers, photos, and lab VPN credentials must never enter git history. It is also outside `public/`, so the site never serves it. Facts may be *read* from these files into site copy; the files themselves stay local.
_Avoid_: committing the directory, moving it under `public/`, quoting its credentials or teammate details

**Network & Security Engineer**:
Chan's *degree background only* — the "Networks & Security" specialisation in his B.Sc. Lead with **Computer Science** in prose and the experience timeline; keep the full formal degree title and the specialisation in the education/credentials detail. It is not a headline or a second positioning. Never blend it into the hero or about lede.
_Avoid_: using it as the current job title, hero tagline, or "TSE + networking" framing

**DIGITEX 2026**:
The competition where SecureExam won **Silver** (Grand Finale, 15 June 2026, Johor Bahru). Always "Silver", never "second place".

## Flagged ambiguities (resolved)

- **Project count** — the spec said 4 (§6.6), 6 (§9), and "7+" (stats widget). Resolved: **9** projects render, including the Sunray and campus network designs plus Xiangqi Shifu.
- **Status/tense** — the site used "graduand" and "open to Singapore roles" before the job search ended. Resolved: **Test Solutions Engineer at Micron, Singapore**; use present tense for the current role and past tense for UTM and Huawei.
- **CVs** — the old Network & Security and AI-engineering PDFs were removed from `public/` on 2 Nov 2026 (copies remain in `docs/reference/`). The download button stays hidden until a current CV is supplied.

## Example dialogue

> **Dev:** The hero says "Network & Security Engineer" — keep it?
> **Chan:** No, I'm a *Test Solutions Engineer* at Micron now. Lead with that; networking is just my degree, not a second headline.
> **Dev:** Should the degree say "Computer Science" or "Computer Science (Networks & Security)"?
> **Chan:** Lead with Computer Science. Keep the full title and the Networks & Security specialisation in the formal education/credentials line — it's a foundation, not the headline.
> **Dev:** And should the experience section say "the probe team"?
> **Chan:** No — probe is the process, not the team. Wafer-level test before assembly and packaging. Keep it generic; don't name products or internal tools.
> **Dev:** The old CV is still linked...
> **Chan:** Hide it until I send the new one. I don't want a stale network-only resume on a test-engineering site.

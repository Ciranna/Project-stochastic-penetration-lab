# Stochastic Penetration Lab — Homework 3 (Phase 4)

Interactive stochastic penetration-score simulation using independent attackers and i.i.d. Bernoulli or Rademacher increments. All mathematics is implemented in vanilla JavaScript ES modules; Chart.js is used only for presentation.

## Start

```bash
npm install
npm run dev
npm test
npm run build
```

## Models

- Rademacher: P(X=−1)=P(X=+1)=1/2, E[X]=0, Var(X)=1.
- Bernoulli: P(X=1)=p, P(X=0)=1−p, E[X]=p, Var(X)=p(1−p).

Each of m independent attackers generates a length-n path. The final score S_n, average S_n/n, and normalized score S_n/√n are recorded. For Bernoulli with 0<p<1 the additional centered and standardized score (S_n−np)/√(np(1−p)) is used for the normal approximation; the uncentered S_n/√n does **not** approach N(0,1) when p>0.

## Experiments

- Sample paths of up to 20 attackers.
- Empirical versus theoretical moments.
- Law of Large Numbers: mean S_n/n and P(|S_n/n−μ|>ε) across increasing n.
- Variance comparison: Var(S_n)=nσ², Var(S_n/n)=σ²/n, Var(S_n/√n)=σ².
- Central Limit Theorem: histogram versus N(0,1) and summary diagnostics.

Increasing n changes the distribution of each attacker's score; increasing m increases Monte Carlo precision, not the theoretical distribution of a single attacker. Attackers are independent; there is no strategic interaction or exploit modeling.

## Reproducibility and constraints

Mulberry32 is a deterministic pseudo-random generator, **not** a cryptographic PRNG. Each run has a configurable seed. The application caps the main simulation at 10 million increments and automatically reduces the comparison attacker count when necessary to keep all comparison sizes within a separate 10-million-increment budget. Comparison sizes: n=10,30,100,300,1000,3000,10000 up to the selected n. Simulated distributions are discrete for finite n; agreement with a continuous normal is asymptotic.

## GitHub Pages

Repository name: `Project-stochastic-penetration-lab`. The Vite `base` is already set to `/Project-stochastic-penetration-lab/`. To deploy, build with `npm run build` and publish `dist/` via GitHub Actions or the `gh-pages` workflow. No backend required.


## Phase 3 additions

- Attacker-count sensitivity experiment: repeated Monte Carlo estimates and theoretical standard errors.
- CSV export of model settings, statistics, system-size comparison and attacker-count sensitivity.
- In-app interpretation of LLN, variance normalizations and CLT.
- Additional tests for sensitivity and CSV encoding.

Run `npm test`, then `npm run build`. To publish with GitHub Pages, use the included Vite base path and deploy the `dist/` directory through a GitHub Actions workflow or another supported Pages deployment method.

## Phase 4: automated deployment and oral exam

- `.github/workflows/deploy.yml` runs tests, builds the site, and deploys it to GitHub Pages after pushes to `main`.
- `docs/DEPLOY_GUIDE_IT.md` explains publishing in Italian.
- `docs/ORAL_PRESENTATION_EN.md` contains a concise oral presentation and exam questions.
- The workflow uses `npm install` because the dependency lockfile is not bundled. Generate and commit `package-lock.json` locally for stronger reproducibility; then consider `npm ci`.

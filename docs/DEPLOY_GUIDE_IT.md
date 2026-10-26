# Pubblicazione su GitHub Pages

1. Verifica di avere Node.js 20.19+ o 22+ e npm.
2. Nella cartella del progetto esegui `npm install`, `npm test`, `npm run build`.
3. Crea su GitHub un repository pubblico chiamato **Project-stochastic-penetration-lab** (senza inizializzarlo con README).
4. Nel terminale:

```bash
git init
git add .
git commit -m "Complete stochastic penetration lab"
git branch -M main
git remote add origin https://github.com/ciranna/Project-stochastic-penetration-lab.git
git push -u origin main
```

5. Nel repository apri **Settings → Pages → Build and deployment → Source** e scegli **GitHub Actions**.
6. Apri **Actions**, verifica che il workflow *Test, build and deploy GitHub Pages* sia terminato con successo. Se necessario usa **Run workflow**.
7. Apri https://ciranna.github.io/Project-stochastic-penetration-lab/ e verifica grafici, controlli e download CSV.

Se il nome del repository è diverso, aggiorna `base` in `vite.config.js` con `/<nome-repository>/`.

Il workflow usa `npm install`. Per maggiore riproducibilità, genera e versiona `package-lock.json` con `npm install` sul tuo computer; poi puoi passare a `npm ci`.

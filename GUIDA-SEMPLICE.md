# NutriVision & Fitness Coach — Guida semplificata (versione senza build)

Questa versione non usa npm/Vite: è un unico file HTML che carica React da
internet. Molto più facile da caricare su GitHub da telefono: bastano
**2 caricamenti** invece di gestire cartelle intere.

## File in questo pacchetto

- `index.html` — l'intera app (uguale a quella vista in chat)
- `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png` — rendono l'app installabile
- `vercel.json` — dice a Vercel di non fare build (non serve)
- `api/claude.js` — funzione che chiama Claude tenendo la chiave nascosta

## Passo 1 — Ripulisci (consigliato)

Nel repository GitHub che avevi già (o creane uno nuovo):
1. Se c'è ancora `nutrivision-pwa.zip`, aprilo → tre puntini "⋯" → **Delete file** → Commit
2. Se preferisci ripartire pulito del tutto, elimina il repository da **Settings → Danger Zone → Delete this repository** e creane uno nuovo vuoto con lo stesso processo di prima ("Create repository")

## Passo 2 — Carica i file principali (un solo upload)

1. Nel repository, tocca **Add file → Upload files**
2. Seleziona insieme questi 5 file (tutti nella cartella principale del pacchetto, NON dentro `api`):
   `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`, `vercel.json`
3. In basso scrivi un messaggio (es. "primo caricamento") e tocca **Commit changes**

## Passo 3 — Carica la funzione serverless

1. Tocca di nuovo **Add file**, ma questa volta scegli **"Create new file"** (non "Upload files")
2. Nel campo del nome file scrivi esattamente: `api/claude.js` — GitHub crea la cartella `api` automaticamente
3. Apri il file `api/claude.js` di questo pacchetto sul telefono (con un editor di testo, o aprendolo e copiandone il contenuto), copia tutto il testo e incollalo nell'editor di GitHub
4. Scorri in fondo e tocca **Commit changes**

## Passo 4 — Collega/ricrea il progetto su Vercel

1. Su vercel.com, se hai già un progetto collegato a questo repository, vai su **Settings → Environment Variables** e assicurati che ci sia `ANTHROPIC_API_KEY` con la tua chiave
2. Vai su **Deployments** → tre puntini sull'ultimo tentativo → **Redeploy**
3. Se invece riparti da un progetto nuovo: **Add New → Project**, seleziona il repository, aggiungi la variabile d'ambiente `ANTHROPIC_API_KEY` prima di premere **Deploy**

Con `vercel.json` a dire "niente build", Vercel dovrebbe semplicemente servire `index.html` come sito statico e attivare `api/claude.js` come funzione — nessun errore di build possibile stavolta.

## Passo 5 — Installa sul telefono

- **Android (Chrome):** apri il sito → tre puntini → "Installa app" / "Aggiungi a schermata Home"
- **iPhone (Safari):** apri il sito → icona di condivisione → "Aggiungi a schermata Home"

## Nota sulla sicurezza

Se in passato hai incollato o mostrato la tua chiave API in uno screenshot,
vai su console.anthropic.com → API Keys, **eliminala** e creane una nuova
da usare solo qui (mai in uno screenshot o messaggio condiviso).

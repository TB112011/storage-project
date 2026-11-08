# Odlož.to MVP

Jednostránkové MVP webu pro door-to-door skladování věcí v Praze.

## Spuštění

Projekt nevyžaduje build nástroje ani závislosti. Otevřete `index.html` v prohlížeči, nebo spusťte lokální server:

```bash
python3 -m http.server 4173
```

Poté navštivte <http://localhost:4173>.

## Nasazení na Vercel

Vercel musí mít jako **Root Directory** nastavený kořen tohoto projektu, tedy adresář
obsahující `index.html`. Konfigurace v `vercel.json` zapíná čisté URL, takže stránky
fungují například na `/login`, `/dashboard` a `/box` i přesto, že jejich zdrojové soubory
se jmenují `login.html`, `dashboard.html` a `box.html`.

## Klientská zóna

Hlavní stránka odkazuje na `login.html`, odkud se po přihlášení pokračuje na `dashboard.html`.
Pro demonstrační účely funguje účet `demo@odloz.to` s heslem `demo123`. Přihlášení je v této
statické MVP verzi simulované přes `localStorage`; pro produkční použití je potřeba doplnit
serverovou autentizaci, databázi a skutečné generování faktur. Z přehledu lze otevřít detail
každého boxu na `box.html`, prohlédnout si jeho obsah a označit konkrétní věci k doručení.

## Obsah MVP

- responzivní landing page pro tři cílové segmenty,
- kalkulace měsíční ceny podle počtu boxů,
- CTA formulář s potvrzením objednávky,
- detailní přehled čtyř boxů s výběrem jednotlivých uložených věcí,
- připravený přepínač pro budoucí anglickou verzi.

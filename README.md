# Smart Web Scraper

Der Smart Web Scraper extrahiert strukturierte Informationen von Webseiten mit LLM-Unterstützung. Das Projekt enthält zwei Hauptpfade:

- Quellcode-Analyse mit Cheerio
- Screenshot-Analyse

## Voraussetzungen

- Node.js 18 oder neuer
- Git
- Ein OpenAI API Key als Umgebungsvariable `OPENAI_API_KEY`

## Installation

1. Repository klonen.
2. In den Ordner `Cheerio` wechseln.
3. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

4. Lokale Konfiguration anlegen:
   - `.env.example` nach `.env` kopieren oder eine `.env` Datei anlegen
   - `OPENAI_API_KEY` setzen

## Wichtige Konfigurationsdateien

- `startURLS/urls.txt`: Start-URLs, eine pro Zeile, ohne Leerzeilen
- `jsonRef.json`: Zielstruktur der gewünschten Felder
- `instructions/`: Anweisungen für das LLM
- `jsonPrompt.json`, `jsonRefScreenshot.json`, `jsonLeer.json`: weitere Vorlagen und Eingaben
- `token_usage_log.txt`: Protokoll der Token-Nutzung

## Quellcode-Analyse starten

1. In den Ordner `Cheerio` wechseln.
2. Den Crawler starten:

   ```bash
   node index-refactor.js
   ```

Der Ablauf liest `OPENAI_API_KEY` aus der Umgebung. Die frühere Datei `apiKey.txt` wird nicht mehr verwendet.

## Screenshot-Analyse starten

1. In den Ordner `Cheerio/my-crawler/src` wechseln.
2. Den Screenshot-Crawler starten:

   ```bash
   node startCrawler.js
   ```

## Verzeichnisse im Projekt

- `logic/`: Hilfsskripte für LLM-Anfragen und Quellcode-Reinigung
- `llama3/`: lokale Llama3-Anbindung
- `my-crawler/`: Screenshot-Crawler
- `data/`: Ergebnisse der Scrapes
- `excel/`: Export und Auswertung
- `instructions/`: editierbare LLM-Anweisungen

## Hinweis

Wenn du mit neuen Datenquellen arbeitest, zuerst die Start-URLs in `startURLS/urls.txt` pflegen und danach die passenden Felder in `jsonRef.json` anpassen.
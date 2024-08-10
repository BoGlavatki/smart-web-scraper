# Projektübersicht und Anleitung

Das ist ein **smarter Web-Scraper**, der das Ziel hat, bestimmte Informationen von Webseiten mit Hilfe von **LLM** und speziell ***ChatGPT*** zu extrahieren.

## Hier wird das Projekt mit den dazugehörigen Verzeichnissen beschrieben sowie die jeweiligen Dateien und deren Funktionen erklärt.

1. Man muss Node.js vorinstalliert haben um der Scrapper starten zu können.
2. Klonen Sie das Repository in das Verzeichnis und Gehen Sie in das Cheerio-Verzeichnis.



## Beschreibung der Dateien

1. Im Verzeichnis ***startURLs*** befindet sich die Datei ***urls.txt***, die die Domains enthält, die gescrapt werden.
2. Die Datei ***jsonRef.json*** beinhaltet das JSON-Objekt, das befüllt werden muss. Man kann zum Beispiel Felder einfügen oder löschen, um bestimmte Informationen auf der Webseite zu finden.
3. In der Datei ***token_usage_log.txt*** wird die Anzahl der Tokens gespeichert.
4. Die Datei ***fineTuning.js*** beinhaltet die Logik für das Fine-Tuning-Modell.
5. Die Datei ***jsonFineTuning.jsonl*** ist die Datei, in der die Trainingsdaten gespeichert sind.
6. Die Datei ***index-refactor.js*** beinhaltet die Logik für den Ablauf des Crawlers unter Verwendung des Quellcodes der Webseiten. Dies ist auch die Startdatei, die ausgeführt werden muss.
7. Im Verzeichnis node_modules liegen alle benötigten Bibliotheken, die für das gesamte Projekt notwendig sind, wie z.B. ***axios***, ***cheerio***, usw.
8. Im Verzeichnis ***my-crawler*** liegt der Screenshot-Crawler, also die Logik zur Analyse der Screenshots der Webseiten. Auch innerhalb dieses Verzeichnisses befindet sich die Datei zum Starten des Screenshot-Crawlers.
9. Im Verzeichnis ***logic*** liegen die Skripte für separate Funktionen, wie z.B. Kommunikation mit LLM, Reinigung des Quellcodes usw.
10. Im Verzeichnis ***llama3*** liegt die Logik für die Kommunikation mit Llama3. Man startet die Kommunikation durch den Aufruf der Datei ***index.js***. Natürlich muss Llama3 vorher installiert und gestartet werden. Hier ist ein separates Repository, das beschreibt, wie man das macht: https://github.com/ggerganov/llama.cpp
11. Im Verzeichnis instructions liegen Anweisungen an das LLM, die geändert, eingefügt oder gelöscht werden können. Man muss darauf achten, diese an der entsprechenden Stelle im Code auszulesen.
12. Im Verzeichnis ***excel*** werden die Daten, die nach dem Scraping in der JSON-Datei gesammelt wurden, konvertiert. Es war notwendig, Tabellen aufzustellen, um die Anzahl der richtigen Antworten zu bewerten.
13. Im Verzeichnis data liegen weitere Verzeichnisse mit den Namen der Webseiten, die gescrapt wurden.


## Starten des Crawlers mit Queltext analyse


1. Um den Smart Crawler zu starten, muss man die Webseiten im Verzeichnis startURLs in der Datei ***urls.txt*** definieren. Es darf keine Leerzeile zwischen den URLs und nach den URLs existieren.
2. Im Verzeichnis ***logic*** liegen die Dateien ***withSourceCode.js*** und ***analyseNextLinkWithLLM.js***. Diese Dateien senden Anweisungen und Quellcode an das LLM, um sie zu analysieren. Um dies zu ermöglichen, lesen beide die Textdatei ***apiKey.txt*** aus, in der der API-Schlüssel von OpenAI liegt. Dies ist notwendig für die Kommunikation mit der API von OpenAI. Das bedeutet, dass man den Schlüssel von OpenAI in die Datei ***apiKey.txt*** eintragen muss.
3. Danach kann man auch die JSON-Datei anpassen, falls man andere Informationen benötigt, und die Anweisungen ebenfalls, wenn nicht, dann kann man sie so lassen, wie sie sind.
4. Dann geht man in das Verzeichnis ***cheerio***, dort wo sich ***index-refactor.js*** befindet, und führt den Befehl ```bahs node index-refactor.js ``` aus. Das startet den Analyseprozess.
5. Der Prozess wird gestartet und im Verzeichnis ***data*** werden weitere Verzeichnisse erstellt, die den Namen der besuchten Webseiten tragen. Innerhalb dieser Verzeichnisse werden JSON-Dateien erstellt, in denen die gesuchten Informationen gespeichert werden.

## Starten des Crawlers mit Screenshotanalyse

1. Um den ScreenshotCrawler zu starten, muss man in das Verzeichnis ***my-crawler -> src*** wechseln und dort die Datei node ***startCrawler.js*** ausführen.
2. Hier findet man auch die Dateien ***excel, data, logicScreenshots*** und ***screenshots***, die hauptsächlich die gleiche Funktionalität wie in der Quellcodeanalyse beinhalten.
3. Im Verzeichnis ***screenshots*** befinden sich die Screenshots besuchten Webseiten, und im Verzeichnis ***logicScreenshots*** die Dateien ***analysingScreenshot.js***, ***convertImageToBase64.js*** und ***storePropertiesForDomain.js***. Die Datei ***analysingScreenshot.js*** liest die Datei apiKey.txt aus und verwendet den API-Schlüssel, um mit ChatGPT zu kommunizieren.
4. Das Verzeichnis data sammelt die Ergebnisse der Analyse.

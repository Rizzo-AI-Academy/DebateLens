# Specifica di Progetto Didattico: **DebateLens**

**Progetto a cura di:** Rizzo AI Academy  
**Data:** 20 Giugno 2025  
**Versione:** 1.0  

---

## 1. Introduzione e Visione del Progetto

**DebateLens** è un progetto didattico nato all’interno della Rizzo AI Academy per creare una web application in grado di analizzare e confrontare il modo in cui due o più soggetti si esprimono durante un dibattito — politico, scientifico, divulgativo o mediatico.  
Può essere applicato a **qualsiasi tipo di dialogo**, anche in forma testuale (come articoli) o video, grazie all’integrazione di sistemi di trascrizione e modelli linguistici avanzati.

L’idea nasce da un’intuizione di **@Craicek**, membro attivo dell’Academy, che ha creato un **radar plot comparativo tra Simone Rizzo e Raffaele Gaito** partendo da un’intervista doppia e un prompt ben strutturato.  
Da lì, è nata l’idea di un progetto più ampio e ambizioso, capace di portare questa analisi anche in **ambiti con impatto sociale e politico**.

<img src="radar-plot.webp" alt="Radar plot comparativo" width="400"/>

---

## 2. Obiettivi Didattici

Al termine del progetto, i partecipanti saranno in grado di:

- **Integrare API Esterne:** Collegare strumenti come YouTube, modelli LLM, servizi di trascrizione e database.
- **Automatizzare Workflow Compositi:** Usare **N8N** per orchestrare l’intero processo.
- **Progettare Prompt Mirati:** Costruire prompt per analizzare tono, rigore, stile, dati usati e altri elementi retorici.
- **Elaborare e Visualizzare Risultati:** Salvare le analisi e creare visualizzazioni (es. radar chart).
- **Sviluppare Software End-to-End:** Realizzare un’app funzionante da frontend a backend.
- **Collaborare su Progetti Reali:** Lavorare in team multidisciplinari su task concreti.

---

## 3. Architettura della Soluzione e Stack Tecnologico

Il sistema è progettato per essere modulare e interamente ospitato su **Railway**.

### 1. Frontend (Landing Page)
- **Tecnologie:** HTML, CSS, JS (senza framework).
- **Funzione:** Permette di caricare video o testi da confrontare.
- **Hosting:** Statico su Railway.

### 2. Backend (Workflow)
- **Tecnologia:** N8N.
- **Funzione:** Gestisce il flusso completo: input, trascrizione, analisi LLM, salvataggio, radar chart.
- **Hosting:** Container Railway.

### 3. Database
- **Tecnologia:** PostgreSQL.
- **Funzione:** Memorizza confronti, grafici e metadati.
- **Hosting:** Plugin Railway.

### 4. Moduli Python
- **Tecnologia:** Script Python richiamati da N8N.
- **Funzione:** Generazione radar chart (`matplotlib` o `plotly`).

### 5. API Esterne
- **Trascrizione:** OpenAI Whisper, AssemblyAI, YouTube.
- **LLM:** OpenAI GPT-4 / Gemini 1.5.
- **YouTube API:** Per ottenere metadati video.

---

## 4. Flusso Dati (End-to-End)

1. L’utente accede a **DebateLens.app** e inserisce video o testi.
2. I dati vengono inviati al webhook N8N.
3. N8N trascrive (se video), analizza ogni partecipante con prompt dedicati.
4. Le risposte vengono elaborate e visualizzate in un radar plot.
5. Il tutto viene salvato nel database.
6. L’utente viene reindirizzato alla pagina dei risultati.

---

## 5. Applicazioni Possibili

- **Politica:** Confronto tra candidati o talk show.
- **Divulgazione:** Analisi tra content creator.
- **Educazione:** Dibattiti accademici o simulazioni.
- **Giornalismo:** Editoriali o articoli a confronto.
- **Aziende:** Speaker interni o comunicazioni strategiche.

---

## 6. Task e Ruoli Didattici

- **Frontend Team:** UI per input e risultati.
- **Backend & N8N Team:** Workflow di analisi e orchestrazione.
- **AI Prompt Team:** Definizione metriche e prompt LLM.
- **Python & Data Viz Team:** Generazione grafici e salvataggio dati.

---

## 7. Esempio di Prompt LLM

```text
Analizza il seguente testo in base ai seguenti criteri, da 1 a 10: 
1. Rigorosità tecnica
2. Uso di dati oggettivi
3. Approccio divulgativo
4. Stile comunicativo
5. Focalizzazione sull’argomento
6. Orientamento pratico

Restituisci un JSON con questi valori e una breve spiegazione per ciascuno.


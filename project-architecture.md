# Project Architecture and Implementation Plan

**Project Name:** Intelligent System for Monitoring and Analysing Customer Feedback (FeedAnalysis)
**Use Case:** Specialty Coffee Shop, Riyadh
[cite_start]**Objective:** Automate the process of reviewing and analyzing customer feedback using AI to classify, summarize, and present data. [cite: 24]

---

## 1. Technology Stack

- **Frontend:** Next.js (React), standard CSS for styling.
- **Backend & Database:** Firebase (Firestore, Firebase Functions).
- **AI Integration:** External AI API (e.g., Gemini, OpenAI) for NLP and sentiment analysis.
- **Dashboard Libraries:** `recharts` (visualization), `@tanstack/react-table` (data tables), `lucide-react` (icons), `date-fns` (date formatting).

### Theme Colors

- **Primary 900:** `#0F2854`
- **Primary 700:** `#1C4D8D`
- **Primary 500:** `#4988C4`
- **Primary 100:** `#BDE8F5`

---

## 2. System Architecture

[cite_start]The system consists of three main components: [cite: 128, 129, 130]

1.  [cite_start]**Feedback Collection Portal:** A public-facing web interface for customers to submit text feedback. [cite: 114, 128]
2.  [cite_start]**AI Processing Engine:** A backend service (Firebase Cloud Functions or Next.js API Routes) that detects new database entries, sends text to the AI API, and returns processed JSON data (classification, summary, keywords). [cite: 116, 129]
3.  [cite_start]**Admin Dashboard:** A secured internal interface displaying aggregated data, KPIs, and individual processed feedback. [cite: 120, 130]

---

## 3. Database Schema (Firebase Firestore)

### 3.1. Collection: `feedbacks`

- **Document ID:** Auto-generated

| Field           | Type            | Description                                                                 |
| :-------------- | :-------------- | :-------------------------------------------------------------------------- |
| `original_text` | String          | The raw customer feedback text.                                             |
| `sentiment`     | String          | Classification: `positive`, `negative`, or `neutral`.                       |
| `summary`       | String          | AI-generated summary of the feedback.                                       |
| `key_strengths` | Array (Strings) | Identified positive attributes (e.g., `"Coffee Quality"`, `"Cleanliness"`). |
| `key_problems`  | Array (Strings) | Identified negative attributes (e.g., `"Late Order"`, `"High Prices"`).     |
| `createdAt`     | Timestamp       | Date and time of submission.                                                |

### 3.2. Collection: `statistics`

- **Document ID:** `Month_Year` (e.g., `March_2026`)

| Field                   | Type      | Description                                                                                               |
| :---------------------- | :-------- | :-------------------------------------------------------------------------------------------------------- |
| `total_feedbacks`       | Number    | Aggregate count of all feedback records in the selected month.                                            |
| `sentiment_counts`      | Map       | Sentiment totals with keys: `positive`, `negative`, `neutral` (all Number values).                        |
| `strengths_frequencies` | Map       | Key-value pairs for strengths and occurrence count (e.g., `{ "Coffee Quality": 45, "Cleanliness": 12 }`). |
| `problems_frequencies`  | Map       | Key-value pairs for problems and occurrence count (e.g., `{ "Late Order": 8 }`).                          |
| `lastUpdatedAt`         | Timestamp | Date and time of the most recent aggregation run.                                                         |

---

## 4. User Interface Structure

### 4.1. Customer Portal

- **Input Form:** Text area for feedback submission.
- [cite_start]**Validation:** Prevents empty submissions. [cite: 115]
- [cite_start]**Confirmation:** Displays a success message upon submission. [cite: 132]

### 4.2. Admin Dashboard

- **KPI Panel:** Total feedback count, overall satisfaction percentage.
- **Sentiment Chart:** Visual distribution (donut chart) of positive, negative, and neutral feedback.
- **Extracted Insights Panel:** Aggregated list of frequently mentioned strengths and weaknesses.
- [cite_start]**Feedback Data View:** Filterable table and list view for feedback entries. [cite: 120]

**Feedback Card Component Layout:**

- **Header:** Timestamp & Sentiment Badge (Green/Red/Grey).
- **Body:** \* **Original Feedback:** `original_text`
  - **AI Summary:** `summary`
- **Footer:** Keyword Tags (`key_strengths`, `key_problems`).

---

## 5. Development Timeline (40 Days)

Execution begins post-Eid al-Fitr.

- **Phase 1: Environment Setup and UI Construction (Days 1-10)**
  - Initialize Next.js project and configure Firebase.
  - Build static interfaces for the customer portal and admin dashboard.
- **Phase 2: Backend Logic and Database Integration (Days 11-20)**
  - Implement Next.js API routes.
  - Configure Firestore database schema.
  - Enable data submission from the portal to the database.
- **Phase 3: AI API Integration (Days 21-30)**
  - Connect the chosen AI service.
  - Structure prompt logic for text classification and summarization.
  - Handle and store the returned JSON data.
- **Phase 4: Data Visualization and System Testing (Days 31-40)**
  - Bind Firestore data to the dashboard charts and tables.
  - Implement feedback filtering.
  - Conduct system testing and fix bugs.

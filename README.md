# FeedAnalysis

> **Note:** This project is developed as a Computer Science graduation project.

FeedAnalysis is an intelligent system for monitoring and analyzing customer feedback, designed for specialty coffee shops in Riyadh. The project leverages AI to automate the review, classification, and summarization of customer feedback, providing actionable insights for business improvement.

## Features

- **Customer Feedback Portal:** Simple web interface for customers to submit feedback.
- **AI Processing Engine:** Automatically classifies sentiment, summarizes feedback, and extracts key strengths and problems using an external AI API.
- **Admin Dashboard:** Secure dashboard for viewing KPIs, sentiment charts, and detailed feedback entries with filtering and visualization.

## Technology Stack

- **Frontend:** Next.js (React), CSS
- **Backend & Database:** Firebase (Firestore, Functions)
- **AI Integration:** Gemini or OpenAI API
- **Visualization:** recharts, @tanstack/react-table, lucide-react, date-fns

## Theme Colors

The project uses the following blue palette as the core theme:

- `#0F2854` (Primary 900)
- `#1C4D8D` (Primary 700)
- `#4988C4` (Primary 500)
- `#BDE8F5` (Primary 100)

## Database Schema (Firestore)

Each feedback entry includes:

- `id`: Unique identifier
- `raw_text`: Original feedback
- `timestamp`: Submission time
- `sentiment`: positive, negative, or neutral
- `summary`: AI-generated summary
- `key_strengths`: List of positive aspects
- `key_problems`: List of issues
- `status`: Processing state

## Development Phases

1. Environment setup & UI construction
2. Backend logic & database integration
3. AI API integration
4. Data visualization & testing

---

This is a draft README. Details and instructions will be updated as the project progresses.

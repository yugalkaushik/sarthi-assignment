# Emotion Reflection Tool

A simple web app that analyzes user text reflections and returns mock emotion analysis. This project demonstrates integration between a Next.js frontend and a Python FastAPI backend.

## Project Structure

The project is divided into two main parts:

- **Frontend**: A Next.js application with TypeScript and Tailwind CSS
  - `/src/app`: Main application pages
  - `/src/components`: Reusable UI components
  - `/public`: Static assets
- **Backend**: A FastAPI application that provides keyword-based emotion analysis

## Prerequisites

- Node.js (v14 or newer)
- Python (v3.8 or newer)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Set up a Python virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - Windows:

   ```bash
   venv\Scripts\activate
   ```

   - macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:

   ```bash
   pip install fastapi uvicorn python-multipart
   ```

5. Start the backend server:

   ```bash
   python main.py
   ```

   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:3000


## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python

---

This is a demo project. While the emotion analysis uses keyword matching, it's a simplified approach and not based on comprehensive NLP or machine learning models.

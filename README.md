# Document Summary Assistant

A full-stack web application that takes any document (PDF or Image) and generates intelligent, multi-length summaries using AI. This project also features automatic language detection and translation to English for multilingual documents.

**Live Demo URL:** https://docsummaryps510-j90iisbje-uranium238s-projects.vercel.app/

---

## Features

- **File Upload:** Modern drag-and-drop interface for uploading PDF and image files.
- **Multi-Format Support:**
  - **PDF Parsing:** Extracts text directly from PDF documents.
  - **Image OCR:** Uses Tesseract OCR to extract text from images (e.g., scanned documents).
- **Multilingual Capability:**
  - **Language-Aware OCR:** Tesseract is configured with data for English, Hindi, Urdu, and Malayalam.
  - **Automatic Translation:** Text extracted in a foreign language is automatically translated to English before summarization.
- **AI-Powered Summarization:**
  - Integrates with the Google Gemini API to generate high-quality summaries.
  - Provides options for **short, medium, or long** summary lengths.
- **User-Friendly Interface:**
  - Clean, responsive UI built with React and Bootstrap.
  - Clear loading states and error handling.
  - **Copy to Clipboard** functionality for easy use of the generated summary.

## Tech Stack

| Category      | Technology / Service                                       |
| ------------- | ---------------------------------------------------------- |
| **Frontend** | React, Vite, React-Bootstrap, Axios                        |
| **Backend** | Python, FastAPI                                            |
| **OCR** | Tesseract OCR Engine (via `pytesseract`)                   |
| **AI / ML** | Google Gemini API (`gemini-1.5-flash-latest`)              |
| **Hosting** | Vercel (Frontend), Render (Backend)                        |

---

## How to Run Locally

### Prerequisites
- Node.js and npm
- Python 3.8+ and pip
- Tesseract OCR Engine installed on your system

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create a `.env` file and add your Google API key:
    ```
    GOOGLE_API_KEY="your_api_key_here"
    ```
5.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://localhost:8000`.

### Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.
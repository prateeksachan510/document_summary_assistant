# Start with an official Python base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies
# Added 'tesseract-ocr-mal' for Malayalam support
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-hin \
    tesseract-ocr-urd \
    tesseract-ocr-mal \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Render assigns a random port to the $PORT variable automatically.
# We use the "shell form" (no brackets) so $PORT is read correctly.
CMD uvicorn main:app --host 0.0.0.0 --port $PORT

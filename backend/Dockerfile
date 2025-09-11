# Start with an official Python base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# --- This is the important part ---
# Install system dependencies, including Tesseract and language packs
# This command runs as root inside the container, so it has permissions
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-hin \
    tesseract-ocr-urd \
    && rm -rf /var/lib/apt/lists/*

# Copy your Python requirements file into the container
COPY requirements.txt .

# Install your Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend application code into the container
COPY . .

# Tell Docker that your app runs on port 8000
EXPOSE 8000

# The command that will be run to start your application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
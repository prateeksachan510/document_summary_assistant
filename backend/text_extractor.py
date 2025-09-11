import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import io
import platform

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = r'E:\Tesseract\tesseract.exe'

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from a PDF file."""
    try:
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        raise

def extract_text_from_image(file_bytes: bytes) -> str:
    """Extracts text from an image file using OCR."""
    try:
        image = Image.open(io.BytesIO(file_bytes))
        
        # --- THIS IS THE UPDATED LINE ---
        # We are telling Tesseract to use the language files you downloaded:
        # English (eng), Hindi (hin), Malayalam (mal), and Urdu (urd).
        languages_to_try = 'eng+hin+mal+urd'
        text = pytesseract.image_to_string(image, lang=languages_to_try)
        # --- END OF UPDATE ---
        
        return text
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        raise
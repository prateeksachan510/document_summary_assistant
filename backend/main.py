from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from text_extractor import extract_text_from_pdf, extract_text_from_image
from summarizer import generate_summary, translate_to_english

app = FastAPI()

# THIS IS THE CRITICAL SECTION TO FIX
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/summarize")
async def summarize_document(
    file: UploadFile = File(...),
    summary_length: str = Form(...)
):
    contents = await file.read()
    
    extracted_text = ""
    try:
        if file.content_type == "application/pdf":
            extracted_text = extract_text_from_pdf(contents)
        elif file.content_type.startswith("image/"):
            extracted_text = extract_text_from_image(contents)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type.")

        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract any text from the document.")

        translated_text = translate_to_english(extracted_text)
        summary = generate_summary(translated_text, summary_length)

        return {"summary": summary, "original_text_length": len(extracted_text)}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An internal server error occurred: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Document Summary Assistant API is running."}
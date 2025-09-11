import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function App() {
  const [file, setFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyText, setCopyText] = useState('Copy');

  const handleClear = () => {
    setFile(null);
    setSummary('');
    setError('');
    setCopyText('Copy');
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  const onDrop = useCallback(acceptedFiles => {
    handleClear();
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSummary('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('summary_length', summaryLength);
    try {
      const response = await axios.post('https://doc-summary-ps510.onrender.com/api/summarize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSummary(response.data.summary);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An unexpected error occurred.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const dropzoneStyle = {
    border: '2px dashed #adb5bd',
    borderRadius: '.375rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  };

  const dropzoneActiveStyle = {
    borderColor: '#0d6efd',
    backgroundColor: '#f0f8ff'
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }} className="py-5">
      <Container className="d-flex align-items-center justify-content-center">
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <header className="text-center mb-5">
            <h1 className="fw-bold">Document Summary Assistant</h1>
            <p className="text-muted">Upload a PDF or image to get a smart summary.</p>
          </header>

          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Label className="fs-5 fw-semibold">1. Upload Document</Form.Label>
                <div {...getRootProps({ style: isDragActive ? {...dropzoneStyle, ...dropzoneActiveStyle} : dropzoneStyle })}>
                  <input {...getInputProps()} />
                  {file ? (
                    <p className="text-success fw-medium">✅ {file.name}</p>
                  ) : (
                    <p className="text-muted">Drag & drop a file here, or click to select</p>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-semibold">2. Choose Summary Length</Form.Label>
                <div className="d-flex justify-content-center">
                  <ButtonGroup>
                    {['short', 'medium', 'long'].map((len) => (
                      <Button
                        key={len}
                        variant={summaryLength === len ? 'primary' : 'outline-secondary'}
                        onClick={() => setSummaryLength(len)}
                        className="text-capitalize"
                      >
                        {len}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </Form.Group>

              <div className="d-grid mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isLoading || !file}
                >
                  {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Generate Summary'}
                  {isLoading ? ' Summarizing...' : ''}
                </Button>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              {summary && (
                <Card bg="light">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">Generated Summary</Card.Title>
                    <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                      {copyText}
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default App;
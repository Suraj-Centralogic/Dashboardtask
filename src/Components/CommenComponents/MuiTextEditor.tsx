import { useState, useEffect, useRef } from 'react';
import { Box, Paper, Button } from '@mui/material';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

type Props = {
  template: string;
};

export default function EmailTemplateEditor({ template }: Props) {
  const [value, setValue] = useState(template);
  const quillRef = useRef<any>(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ];

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
  ];

  useEffect(() => {
    const savedContent = localStorage.getItem('emailTemplate');
    if (savedContent) {
      setValue(savedContent);
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorElement = editor.root;

      editorElement.addEventListener('paste', handlePaste);

      return () => {
        editorElement.removeEventListener('paste', handlePaste);
      };
    }
  }, [quillRef]);

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') || '';
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      editor.insertText(range.index, text);
    }
  };

  const handleChange = (content: any) => {
    setValue(content);
  };

  const handleSave = () => {
    console.log('value', value);
    localStorage.setItem('emailTemplate', value);
    alert('Email template saved to localStorage!');
  };

  return (
    <Box sx={{ margin: '0 auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
        <Button
          sx={{ backgroundColor: '#000', borderRadius: 0.5, px: 3 }}
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={handleChange}
          theme="snow"
          placeholder="Start editing the email template..."
          modules={{ toolbar: toolbarOptions }}
          formats={formats}
          style={{ width: '100%', height: '100%' }}
        />
      </Paper>
    </Box>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

type Props = {
  template: string;
};

const EmailTemplateEditor = ({ template }: Props) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem('emailTemplate') || template;
  });
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

  useEffect(() => {
    localStorage.setItem('emailTemplate', value);
  }, [value]);

  return (
    <Box sx={{ margin: '0 auto' }}>
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
};

export default EmailTemplateEditor;

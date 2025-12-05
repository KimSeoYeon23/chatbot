import React, { useState, useEffect } from 'react';
import { convertMarkdownToHtml } from '../utils/parse';

const MarkdownRenderer = ({ markdown }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convert = async () => {
      const convertedHtml = await convertMarkdownToHtml(markdown);
      setHtml(convertedHtml);
    };
    convert();
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRenderer;

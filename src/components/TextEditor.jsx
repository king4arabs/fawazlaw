import React, { useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ onContentChange, initialValue }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const initializeQuill = useCallback(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
        placeholder: "Add an Article here.....",
        theme: "snow",
        direction: "ltr",
      });
    }
  }, []);

  useEffect(() => {
    initializeQuill();

    // Set the initial value as HTML
    const quill = quillRef.current;
    if (quill && initialValue) {
      quill.root.innerHTML = initialValue;
    }

    // Add an event listener for text changes
    quill.on("text-change", () => {
      const content = quill.root.innerHTML;
      onContentChange(content);
    });

    // Clean up the event listener on unmount
    return () => {
      quill.off("text-change");
    };
  }, [initializeQuill, initialValue, onContentChange]);

  return <div ref={editorRef} />;
};

export default RichTextEditor;

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface MarkDownViewerProps {
  content: string;
}

const MarkDownViewer: React.FC<MarkDownViewerProps> = ({ content }) => {
  return (
    <>
      <div>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default MarkDownViewer;

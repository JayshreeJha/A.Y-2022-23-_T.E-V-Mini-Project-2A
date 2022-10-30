import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
export const Textcontent = (props) => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(props.content)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  return (
    <div className=" w-full prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

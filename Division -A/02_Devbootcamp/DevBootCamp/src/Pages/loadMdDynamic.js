import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { md: "" };
  }

  async componentDidMount() {
    const file = await fetch(`${process.env.REACT_APP_BACKEND_API}md/1`);
    const text = await file.text();

    this.setState({
      md: text,
    });
  }

  render() {
    return (
      <div className="article">
        <ReactMarkdown
          className="prose  max-w-none"
          remarkPlugins={[remarkGfm, remarkToc]}
          rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
        >
          {this.state.md}
        </ReactMarkdown>
      </div>
    );
  }
}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import PostHeader from './post-header';
import Image from 'next/image';
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
// import un stil pentru formatarea mai interesanta a codului afisat
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

// import subliniere sintaxa doar pentru javascript
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';

// fac inregistrarea limbajelor suportate
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('CSS', css);

const PostContent = (props) => {
  const {slug, content, title, image} = props.post;
  const imagePath = `/images/posts/${slug}/${image}`;

  const customComponents = {
    code: (code) => {
      const language = 'js'; //code.className;
      const value = code.children[0];
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={value}
        />
      );
    },
    p: ({node, children, ...props}) => {
      let i = 0;
      let url1;
      for (const child of node.children) {
        if (child.tagName === 'img') {
          i++;
          url1 = child?.properties?.src;
        }
      }
      if (i > 0) {
        const url = `/images/posts/${slug}/${url1}`;
        return (
          <div className={classes.image}>
            <Image
              src={url}
              alt={node.children[0].type}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;

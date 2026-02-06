import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ inline, className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";

  const code = String(children).replace(/\n$/, "");

  if (inline) {
    return <code className="inline-code">{children}</code>;
  }

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-wrapper">
      <div className="code-header">
        <span className="code-lang">{language}</span>
        <button className="copy-btn" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        PreTag="div"
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const BlockQuote = ({ children }) => {
  return (
    <blockquote className="custom-blockquote">
      {children}
    </blockquote>
  );
};

const Image = ({ src, alt, title }) => {
  if (title) {
    return (
      <figure className="figure">
        <img 
          src={src} 
          alt={alt || ''} 
          className="figure-img img-fluid"
          loading="lazy"
        />
        <figcaption className="figure-caption text-center mt-2">{title}</figcaption>
      </figure>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt || ''} 
      className="img-fluid rounded shadow"
      loading="lazy"
    />
  );
};
const Table = ({ children }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => {
  return (
    <th className="align-middle text-nowrap">
      {children}
    </th>
  );
};

const TableCell = ({ children }) => {
  return (
    <td className="align-middle">
      {children}
    </td>
  );
};
const TableRow = ({ children, isHeader = false }) => {
  return (
    <tr className={isHeader ? 'table-dark' : ''}>
      {children}
    </tr>
  );
};

export default function BlogPost() {
  const SITE_NAME = "Padmanabh's Blog";
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Fetch markdown content from your GitHub repo
  fetch(`https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/${slug}/post.md`)
  //fetch(`/posts/${slug}/post.md`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Markdown file not found');
      }
      return res.text();
    })
    .then(text => setContent(text))
    .catch(error => {
      console.error('Error loading markdown:', error);
      setContent('# Post Not Found\n\nThis post could not be loaded.');
    });
  
   fetch('https://raw.githubusercontent.com/padmanabhpvdev/my-blog-contents/main/posts.json') 
  //fetch(`/posts/posts.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to load posts.json');
      }
      return res.json();
    })
    .then(posts => {
      const post = posts.find(p => p.slug === slug);
      setPostInfo(post);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error loading posts.json:', error);
      setLoading(false);
    });
}, [slug]);
  useEffect(() => {
    if (postInfo?.title) {
      document.title = `${postInfo.title} ● ${SITE_NAME}`;
    } else {
      document.title = SITE_NAME;
    }
    return () => {
      document.title = SITE_NAME;
    };
  }, [postInfo]);


  if (loading) return <div>Loading...</div>;
  if (!content) return <div className='fs-1'>Post not found</div>;

  return (
    <div className="container py-5">
      <Link to="/blog" className="btn btn-outline-secondary mb-4">
        ← Back to Blog
      </Link>
      
      {postInfo && (
        <div className="mb-4">
          <h2 className='fw-bold'>{postInfo.title}</h2>
          <p className="text-muted">
            {postInfo.date} • {postInfo.category}
          </p>
          <img src={postInfo.image} alt="" className='img-thumbnail rounded-0 border-0'/>
        </div>
      )}
      
      <div className="blog-content">
        <Markdown remarkPlugins={[remarkGfm]} 
            components={
              {code:CodeBlock, blockquote:BlockQuote, img:Image, table:Table,th:TableHeader,td:TableCell,tr:TableRow}
        }>
          {content}
        </Markdown>
      </div>
    </div>
  );
}

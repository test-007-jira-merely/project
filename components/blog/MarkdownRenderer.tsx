'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-teal max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 text-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-6 mb-3 text-white">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-white/80 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-white/80">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-white/80">{children}</ol>
          ),
          li: ({ children }) => <li className="text-white/80">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-teal hover:text-teal-light underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-white/10 px-2 py-0.5 rounded text-teal text-sm">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-navy-dark p-4 rounded-lg overflow-x-auto text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-navy-dark p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-teal pl-4 italic text-white/70 my-4">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            <img src={src ?? ''} alt={alt ?? ''} className="rounded-lg max-w-full h-auto my-4" />
          ),
          hr: () => <hr className="border-white/10 my-8" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

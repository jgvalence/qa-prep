// ESM-only package — stub for Jest (renders content as plain div)
const ReactMarkdown = ({ children }: { children: string }) => (
  <div data-testid="markdown-content">{children}</div>
)
export default ReactMarkdown

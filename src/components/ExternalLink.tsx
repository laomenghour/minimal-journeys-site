const ExternalLink = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`link-underline text-muted-foreground hover:text-foreground transition-colors ${className}`}
  >
    {children}
  </a>
);

export default ExternalLink;

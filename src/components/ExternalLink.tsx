const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="link-underline text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

export default ExternalLink;

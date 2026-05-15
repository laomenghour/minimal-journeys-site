import { useRef } from "react";
import gsap from "gsap";

const ExternalLink = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);

  const handleEnter = () => {
    gsap.killTweensOf([pathRef.current, svgRef.current]);
    gsap.set(svgRef.current, { opacity: 1 });
    gsap.fromTo(
      pathRef.current,
      { strokeDashoffset: 157.42 },
      { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }
    );
  };

  const handleLeave = () => {
    gsap.killTweensOf([pathRef.current, svgRef.current]);
    gsap.to(pathRef.current, { strokeDashoffset: 157.42, duration: 0.3, ease: "power2.in" });
    gsap.to(svgRef.current, { opacity: 0, duration: 0.1, delay: 0.3 });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ position: "relative", display: "inline-block", textDecoration: "none", color: "#ffffff" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 159 17"
        fill="none"
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(100% + 2px)",
          transform: "translateX(-50%)",
          width: "120%",
          color: "currentColor",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <path
          ref={pathRef}
          d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="157.42 157.42"
          strokeDashoffset="157.42"
        />
      </svg>
    </a>
  );
};

export default ExternalLink;

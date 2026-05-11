import ThemeToggle from "@/components/ThemeToggle";
import ExternalLink from "@/components/ExternalLink";
import profileImg from "@/assets/mh_profile.png";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-background px-6 py-6 md:px-12 md:py-10 lg:px-16">
      <nav className="flex items-center justify-between" aria-label="Main navigation">
        <img src={profileImg} alt="Menghour" className="w-14 h-14 rounded-full" />
        <ThemeToggle />
      </nav>

      <main className="flex flex-1 flex-col justify-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-foreground">
          Menghour builds
          <br />
          things that scale test.
        </h1>
        <p className="mt-4 text-lg md:text-xl tracking-wide text-muted-foreground font-light">
          From Cambodia to the world.
        </p>
      </main>

      {/* Bottom Grid */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-12 pb-4 font-light text-sm tracking-wide uppercase">
        {/* Hobbies */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground tracking-widest mb-4">
            Hobbies
          </h2>
          <p className="normal-case text-muted-foreground leading-relaxed text-xs tracking-normal lowercase first-letter:uppercase">
            Capturing streets 📸 ,{"\n"}writing stories sometimes ✍🏻.
          </p>
          <div className="flex flex-col gap-1.5 pt-1">
            <ExternalLink href="https://www.instagram.com/photo.bymenghour/">
              Instagram
            </ExternalLink>
            <ExternalLink href="https://medium.com/@menghour_lao">
              Medium
            </ExternalLink>
          </div>
        </div>

        {/* Portfolio */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground tracking-widest mb-4">
            Portfolio
          </h2>
          <div className="flex flex-col gap-1.5">
            <ExternalLink href="https://www.behance.net/laomenghou8e62">
              Graphic Design
            </ExternalLink>
          </div>
        </div>

        {/* Work */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground tracking-widest mb-4">
            Work
          </h2>
          <div className="flex flex-col gap-1.5 text-muted-foreground">
            <span className="text-foreground">BookMe+ <span className="text-muted-foreground text-xs">(Present)</span></span>
            <span>Hang Meas Mobile</span>
            <span>VET Airbus</span>
            <span>VDEUK</span>
            <span>VTENH</span>
            <span>GTVC Speedboat</span>
            <span>BookMeBus</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

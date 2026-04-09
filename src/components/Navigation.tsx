import { NavLink } from "@/components/NavLink";
import { Home, TrendingUp } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import iconSun from "@/assets/icon-sun.png";
import iconMoon from "@/assets/icon-moon.png";

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50 mb-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="bg-primary/10 text-primary"
            >
              <Home className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink
              to="/progress"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="bg-primary/10 text-primary"
            >
              <TrendingUp className="h-4 w-4" />
              Progress Tracker
            </NavLink>
          </div>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            <img
              src={theme === "light" ? iconMoon : iconSun}
              alt={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

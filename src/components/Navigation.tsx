import { NavLink } from "@/components/NavLink";
import { Home, TrendingUp } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50 mb-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-1 h-12">
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
      </div>
    </nav>
  );
};

export default Navigation;

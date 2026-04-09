import { Calendar } from "lucide-react";
import MotivationalQuote from "@/components/MotivationalQuote";
import VisionSection from "@/components/VisionSection";
import LifeCategories, { DEFAULT_CATEGORIES, type CategoryData } from "@/components/LifeCategories";
import TargetGoals from "@/components/TargetGoals";
import TacticsSection, { type Tactic } from "@/components/TacticsSection";
import SectionActions from "@/components/SectionActions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Index = () => {
  const [bigGoal, setBigGoal] = useLocalStorage("12wy-bigGoal", "");
  const [threeYearVision, setThreeYearVision] = useLocalStorage("12wy-threeYearVision", "");
  const [categories, setCategories] = useLocalStorage<CategoryData[]>("12wy-categories", DEFAULT_CATEGORIES);
  const [goals, setGoals] = useLocalStorage<string[]>("12wy-goals", []);
  const [tactics, setTactics] = useLocalStorage<Tactic[]>("12wy-tactics", []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Home</h1>
            <p className="text-xs text-muted-foreground">Your personal execution system</p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quote - full width */}
          <div className="md:col-span-2">
            <MotivationalQuote />
          </div>

          {/* Vision - left column */}
          <div className="glass-card rounded-2xl p-5">
            <VisionSection
              bigGoal={bigGoal}
              threeYearVision={threeYearVision}
              onBigGoalChange={setBigGoal}
              onThreeYearVisionChange={setThreeYearVision}
            />
            <SectionActions sectionName="Vision" onDelete={() => { setBigGoal(""); setThreeYearVision(""); }} />
          </div>

          {/* Target Goals - right column */}
          <div className="glass-card rounded-2xl p-5">
            <TargetGoals goals={goals} categories={categories} onGoalsChange={setGoals} />
            <SectionActions sectionName="Target Goals" onDelete={() => setGoals([])} />
          </div>

          {/* Life Categories - full width */}
          <div className="md:col-span-2 glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Life Categories</h2>
              <span className="text-xs text-muted-foreground">Drag to reorder • Rate 1–10</span>
            </div>
            <LifeCategories categories={categories} onCategoriesChange={setCategories} />
            <SectionActions sectionName="Life Categories" onDelete={() => setCategories(DEFAULT_CATEGORIES)} />
          </div>

          {/* Tactics - full width */}
          <div className="md:col-span-2 glass-card rounded-2xl p-5">
            <TacticsSection tactics={tactics} onTacticsChange={setTactics} />
            <SectionActions sectionName="Tactics" onDelete={() => setTactics([])} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

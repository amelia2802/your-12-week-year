import { Calendar } from "lucide-react";
import MotivationalQuote from "@/components/MotivationalQuote";
import VisionSection from "@/components/VisionSection";
import LifeCategories, { DEFAULT_CATEGORIES, type CategoryData } from "@/components/LifeCategories";
import TargetGoals from "@/components/TargetGoals";
import TacticsSection, { type Tactic } from "@/components/TacticsSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Index = () => {
  const [bigGoal, setBigGoal] = useLocalStorage("12wy-bigGoal", "");
  const [threeYearVision, setThreeYearVision] = useLocalStorage("12wy-threeYearVision", "");
  const [categories, setCategories] = useLocalStorage<CategoryData[]>("12wy-categories", DEFAULT_CATEGORIES);
  const [goals, setGoals] = useLocalStorage<string[]>("12wy-goals", []);
  const [tactics, setTactics] = useLocalStorage<Tactic[]>("12wy-tactics", []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-6 pb-20 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">12 Week Year</h1>
            <p className="text-xs text-muted-foreground">Your personal execution system</p>
          </div>
        </div>

        <MotivationalQuote />
        <VisionSection bigGoal={bigGoal} threeYearVision={threeYearVision} onBigGoalChange={setBigGoal} onThreeYearVisionChange={setThreeYearVision} />
        <LifeCategories categories={categories} onCategoriesChange={setCategories} />
        <TargetGoals goals={goals} categories={categories} onGoalsChange={setGoals} />
        <TacticsSection tactics={tactics} onTacticsChange={setTactics} />
      </div>
    </div>
  );
};

export default Index;

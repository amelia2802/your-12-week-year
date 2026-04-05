import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryData } from "@/components/LifeCategories";
import illTarget from "@/assets/ill-target.png";

interface TargetGoalsProps {
  goals: string[];
  categories: CategoryData[];
  onGoalsChange: (goals: string[]) => void;
}

const TargetGoals = ({ goals, categories, onGoalsChange }: TargetGoalsProps) => {
  const lowestCategories = [...categories]
    .filter((c) => c.rating > 0)
    .sort((a, b) => a.rating - b.rating)
    .slice(0, 3);

  const addGoal = () => {
    if (goals.length < 3) onGoalsChange([...goals, ""]);
  };

  const updateGoal = (idx: number, value: string) => {
    const updated = [...goals];
    updated[idx] = value;
    onGoalsChange(updated);
  };

  const removeGoal = (idx: number) => {
    onGoalsChange(goals.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={illTarget} alt="Target" className="w-10 h-10 object-contain" />
          <h2 className="text-lg font-semibold">Target Goals</h2>
        </div>
        {goals.length < 3 && (
          <Button variant="ghost" size="sm" onClick={addGoal} className="text-primary hover:text-primary/80 hover:bg-primary/10">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        )}
      </div>

      {lowestCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-muted-foreground">Focus areas:</span>
          {lowestCategories.map((c) => (
            <span key={c.id} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              {c.name} ({c.rating}/10)
            </span>
          ))}
        </div>
      )}

      {goals.length === 0 ? (
        <button onClick={addGoal} className="w-full py-8 border-2 border-dashed border-border/50 rounded-xl text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors">
          Add your first goal (max 3)
        </button>
      ) : (
        <div className="space-y-3">
          {goals.map((goal, idx) => (
            <div key={idx} className="relative">
              <span className="absolute top-2.5 left-3 text-xs font-semibold text-primary/60">#{idx + 1}</span>
              <Textarea
                value={goal}
                onChange={(e) => updateGoal(idx, e.target.value)}
                placeholder="Define a specific, measurable goal..."
                className="pl-10 pr-9 resize-none bg-background/50 border-border/50 focus:border-primary/50 min-h-[60px]"
              />
              <button onClick={() => removeGoal(idx)} className="absolute top-2.5 right-2.5 text-muted-foreground/50 hover:text-destructive transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TargetGoals;

import { ListChecks, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export interface Tactic {
  id: string;
  text: string;
  type: "daily" | "weekly";
  done: boolean;
}

const EXAMPLE_TACTICS: Tactic[] = [
  { id: "ex1", text: "Morning journaling – 10 min", type: "daily", done: false },
  { id: "ex2", text: "Exercise / movement – 30 min", type: "daily", done: false },
  { id: "ex3", text: "Weekly review & plan next week", type: "weekly", done: false },
  { id: "ex4", text: "Deep work block – 2 hours", type: "daily", done: false },
  { id: "ex5", text: "Read 20 pages", type: "daily", done: false },
  { id: "ex6", text: "Review goals & scoreboard", type: "weekly", done: false },
];

interface TacticsSectionProps {
  tactics: Tactic[];
  onTacticsChange: (tactics: Tactic[]) => void;
}

const TacticsSection = ({ tactics, onTacticsChange }: TacticsSectionProps) => {
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState<"daily" | "weekly">("daily");
  const [showExamples, setShowExamples] = useState(false);

  const addTactic = () => {
    if (!newText.trim()) return;
    onTacticsChange([...tactics, { id: Date.now().toString(), text: newText.trim(), type: newType, done: false }]);
    setNewText("");
  };

  const toggleDone = (id: string) => {
    onTacticsChange(tactics.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTactic = (id: string) => {
    onTacticsChange(tactics.filter((t) => t.id !== id));
  };

  const useTemplate = (tactic: Tactic) => {
    onTacticsChange([...tactics, { ...tactic, id: Date.now().toString(), done: false }]);
  };

  const daily = tactics.filter((t) => t.type === "daily");
  const weekly = tactics.filter((t) => t.type === "weekly");

  const TacticItem = ({ tactic }: { tactic: Tactic }) => (
    <div className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all ${tactic.done ? "opacity-50" : "hover:bg-muted/50"}`}>
      <Checkbox checked={tactic.done} onCheckedChange={() => toggleDone(tactic.id)} className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
      <span className={`text-sm flex-1 ${tactic.done ? "line-through text-muted-foreground" : ""}`}>{tactic.text}</span>
      <button onClick={() => removeTactic(tactic.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <section className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <ListChecks className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Tactics</h2>
      </div>

      <div className="flex gap-2">
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTactic()}
          placeholder="Add a tactic..."
          className="bg-background/50 border-border/50 focus:border-primary/50"
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as "daily" | "weekly")}
          className="text-xs border border-border/50 rounded-lg px-2 bg-background/50 text-foreground"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <Button onClick={addTactic} size="sm" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {tactics.length > 0 && (
        <div className="space-y-4">
          {daily.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Daily Commitments</h3>
              <div className="space-y-0.5">{daily.map((t) => <TacticItem key={t.id} tactic={t} />)}</div>
            </div>
          )}
          {weekly.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Weekly Commitments</h3>
              <div className="space-y-0.5">{weekly.map((t) => <TacticItem key={t.id} tactic={t} />)}</div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setShowExamples(!showExamples)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        {showExamples ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {showExamples ? "Hide" : "Show"} example templates
      </button>

      {showExamples && (
        <div className="space-y-1.5 bg-muted/30 rounded-xl p-3">
          {EXAMPLE_TACTICS.map((ex) => (
            <div key={ex.id} className="flex items-center justify-between py-1.5 px-2">
              <span className="text-xs text-muted-foreground">
                <span className="inline-block px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-medium mr-2 uppercase">{ex.type}</span>
                {ex.text}
              </span>
              <button onClick={() => useTemplate(ex)} className="text-xs text-primary hover:underline ml-2 shrink-0">
                Use
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TacticsSection;

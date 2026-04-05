import { Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface VisionSectionProps {
  bigGoal: string;
  threeYearVision: string;
  onBigGoalChange: (value: string) => void;
  onThreeYearVisionChange: (value: string) => void;
}

const VisionSection = ({ bigGoal, threeYearVision, onBigGoalChange, onThreeYearVisionChange }: VisionSectionProps) => (
  <section className="glass-card rounded-2xl p-5 space-y-4">
    <div className="flex items-center gap-2">
      <Eye className="h-5 w-5 text-primary" />
      <h2 className="text-lg font-semibold">Vision</h2>
    </div>
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Big Goal / Vision</label>
        <Textarea
          value={bigGoal}
          onChange={(e) => onBigGoalChange(e.target.value)}
          placeholder="What's the one big thing you're working toward?"
          className="mt-1.5 resize-none bg-background/50 border-border/50 focus:border-primary/50 min-h-[80px]"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">3-Year Vision</label>
        <Textarea
          value={threeYearVision}
          onChange={(e) => onThreeYearVisionChange(e.target.value)}
          placeholder="Where do you see yourself in 3 years?"
          className="mt-1.5 resize-none bg-background/50 border-border/50 focus:border-primary/50 min-h-[80px]"
        />
      </div>
    </div>
  </section>
);

export default VisionSection;

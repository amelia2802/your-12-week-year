import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SectionActionsProps {
  sectionName: string;
  onDelete: () => void;
}

const SectionActions = ({ sectionName, onDelete }: SectionActionsProps) => {
  const handleSave = () => {
    toast.success(`${sectionName} saved!`);
  };

  const handleDelete = () => {
    onDelete();
    toast.success(`${sectionName} cleared`);
  };

  return (
    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-border/30">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 px-2.5"
      >
        <Save className="h-3.5 w-3.5 mr-1" /> Save
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 px-2.5"
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
      </Button>
    </div>
  );
};

export default SectionActions;

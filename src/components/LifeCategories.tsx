import { GripVertical } from "lucide-react";
import { useState, useCallback } from "react";

export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  rating: number;
}

const DEFAULT_CATEGORIES: CategoryData[] = [
  { id: "spiritual", name: "Spiritual", emoji: "🙏", rating: 0 },
  { id: "spouse", name: "Spouse", emoji: "💕", rating: 0 },
  { id: "family", name: "Family", emoji: "👨‍👩‍👧‍👦", rating: 0 },
  { id: "business", name: "Business", emoji: "💼", rating: 0 },
  { id: "financial", name: "Financial", emoji: "💰", rating: 0 },
  { id: "personal", name: "Personal", emoji: "🌱", rating: 0 },
  { id: "physical", name: "Physical", emoji: "💪", rating: 0 },
];

interface LifeCategoriesProps {
  categories: CategoryData[];
  onCategoriesChange: (categories: CategoryData[]) => void;
}

const LifeCategories = ({ categories, onCategoriesChange }: LifeCategoriesProps) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const cats = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const handleRating = useCallback((id: string, rating: number) => {
    onCategoriesChange(cats.map((c) => (c.id === id ? { ...c, rating } : c)));
  }, [cats, onCategoriesChange]);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...cats];
    const [moved] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, moved);
    setDraggedIdx(idx);
    onCategoriesChange(updated);
  };

  const handleDragEnd = () => setDraggedIdx(null);

  return (
    <section className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Life Categories</h2>
        <span className="text-xs text-muted-foreground">Drag to reorder • Rate 1–10</span>
      </div>
      <div className="space-y-2">
        {cats.map((cat, idx) => (
          <div
            key={cat.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
              draggedIdx === idx ? "bg-primary/10 scale-[1.02]" : "bg-background/50 hover:bg-muted/50"
            }`}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0 cursor-grab active:cursor-grabbing" />
            <span className="text-lg">{cat.emoji}</span>
            <span className="text-sm font-medium flex-1 min-w-0">{cat.name}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleRating(cat.id, i + 1)}
                  className={`rating-dot ${i < cat.rating ? "rating-dot-active" : "rating-dot-inactive"}`}
                  aria-label={`Rate ${cat.name} ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-primary w-6 text-right">
              {cat.rating || "–"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export { DEFAULT_CATEGORIES };
export default LifeCategories;

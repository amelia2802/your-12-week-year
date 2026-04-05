import { GripVertical } from "lucide-react";
import { useState, useCallback } from "react";
import illSpiritual from "@/assets/ill-spiritual.png";
import illSpouse from "@/assets/ill-spouse.png";
import illFamily from "@/assets/ill-family.png";
import illBusiness from "@/assets/ill-business.png";
import illFinancial from "@/assets/ill-financial.png";
import illPersonal from "@/assets/ill-personal.png";
import illPhysical from "@/assets/ill-physical.png";

export interface CategoryData {
  id: string;
  name: string;
  rating: number;
}

const CATEGORY_ILLUSTRATIONS: Record<string, string> = {
  spiritual: illSpiritual,
  spouse: illSpouse,
  family: illFamily,
  business: illBusiness,
  financial: illFinancial,
  personal: illPersonal,
  physical: illPhysical,
};

const DEFAULT_CATEGORIES: CategoryData[] = [
  { id: "spiritual", name: "Spiritual", rating: 0 },
  { id: "spouse", name: "Spouse", rating: 0 },
  { id: "family", name: "Family", rating: 0 },
  { id: "business", name: "Business", rating: 0 },
  { id: "financial", name: "Financial", rating: 0 },
  { id: "personal", name: "Personal", rating: 0 },
  { id: "physical", name: "Physical", rating: 0 },
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
    <div className="space-y-2">
      {cats.map((cat, idx) => (
        <div
          key={cat.id}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
            draggedIdx === idx ? "bg-primary/10 scale-[1.02]" : "bg-background/60 hover:bg-muted/50"
          }`}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab active:cursor-grabbing" />
          <img
            src={CATEGORY_ILLUSTRATIONS[cat.id]}
            alt={cat.name}
            loading="lazy"
            className="w-8 h-8 object-contain shrink-0"
          />
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
  );
};

export { DEFAULT_CATEGORIES };
export default LifeCategories;

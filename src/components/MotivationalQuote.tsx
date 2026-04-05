import { Sparkles } from "lucide-react";
import { useMemo } from "react";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
];

const MotivationalQuote = () => {
  const quote = useMemo(() => {
    const today = new Date();
    const idx = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % quotes.length;
    return quotes[idx];
  }, []);

  return (
    <div className="flex items-start gap-3 rounded-xl bg-secondary px-5 py-4">
      <Sparkles className="h-5 w-5 text-secondary-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-secondary-foreground italic">"{quote.text}"</p>
        <p className="text-xs text-muted-foreground mt-1">— {quote.author}</p>
      </div>
    </div>
  );
};

export default MotivationalQuote;

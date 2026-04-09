import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, CalendarDays, CalendarCheck, CalendarRange } from "lucide-react";
import { format } from "date-fns";

export interface TrackerTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface WeeklyData {
  [weekNum: string]: TrackerTask[];
}

const generateId = () => crypto.randomUUID();

const calcProgress = (tasks: TrackerTask[]) =>
  tasks.length === 0 ? 0 : Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100);

const TaskItem = ({
  task,
  onToggle,
  onDelete,
}: {
  task: TrackerTask;
  onToggle: () => void;
  onDelete: () => void;
}) => (
  <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 group transition-colors">
    <Checkbox checked={task.completed} onCheckedChange={onToggle} />
    <span
      className={`flex-1 text-sm transition-all ${
        task.completed ? "line-through text-muted-foreground" : "text-foreground"
      }`}
    >
      {task.text}
    </span>
    <span className="text-xs text-muted-foreground hidden sm:inline">
      {format(new Date(task.createdAt), "MMM d")}
    </span>
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
      onClick={onDelete}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  </div>
);

const TaskSection = ({
  tasks,
  onTasksChange,
  placeholder,
}: {
  tasks: TrackerTask[];
  onTasksChange: (tasks: TrackerTask[]) => void;
  placeholder: string;
}) => {
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    onTasksChange([
      ...tasks,
      { id: generateId(), text: newTask.trim(), completed: false, createdAt: new Date().toISOString() },
    ]);
    setNewTask("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="h-9 text-sm"
        />
        <Button size="sm" onClick={addTask} className="h-9 shrink-0">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      {tasks.length > 0 && (
        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() =>
                onTasksChange(tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))
              }
              onDelete={() => onTasksChange(tasks.filter((t) => t.id !== task.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProgressTracker = () => {
  const [dailyTasks, setDailyTasks] = useLocalStorage<TrackerTask[]>("12wy-daily-tasks", []);
  const [monthlyTasks, setMonthlyTasks] = useLocalStorage<TrackerTask[]>("12wy-monthly-tasks", []);
  const [weeklyData, setWeeklyData] = useLocalStorage<WeeklyData>("12wy-weekly-data", {});
  const [activeWeek, setActiveWeek] = useState("1");

  const weekTasks = weeklyData[activeWeek] || [];
  const setWeekTasks = (tasks: TrackerTask[]) =>
    setWeeklyData((prev) => ({ ...prev, [activeWeek]: tasks }));

  const allWeeklyTasks = Object.values(weeklyData).flat();
  const dailyProgress = calcProgress(dailyTasks);
  const weeklyProgress = calcProgress(allWeeklyTasks);
  const monthlyProgress = calcProgress(monthlyTasks);
  const overallProgress =
    dailyTasks.length + allWeeklyTasks.length + monthlyTasks.length === 0
      ? 0
      : Math.round(
          ((dailyTasks.filter((t) => t.completed).length +
            allWeeklyTasks.filter((t) => t.completed).length +
            monthlyTasks.filter((t) => t.completed).length) /
            (dailyTasks.length + allWeeklyTasks.length + monthlyTasks.length)) *
            100
        );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 pb-20">
        {/* Overall Progress */}
        <div className="glass-card rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Overall Progress</h2>
            <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3 rounded-full" />
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Daily</p>
              <p className="text-sm font-semibold text-primary">{dailyProgress}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weekly</p>
              <p className="text-sm font-semibold text-primary">{weeklyProgress}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly</p>
              <p className="text-sm font-semibold text-primary">{monthlyProgress}%</p>
            </div>
          </div>
        </div>

        {/* Three Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Daily */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Daily Tasks</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {format(new Date(), "EEEE, MMM d, yyyy")}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Progress value={dailyProgress} className="h-2 flex-1 rounded-full" />
              <span className="text-sm font-semibold text-primary w-10 text-right">{dailyProgress}%</span>
            </div>
            <TaskSection tasks={dailyTasks} onTasksChange={setDailyTasks} placeholder="Add a daily task…" />
          </div>

          {/* Monthly */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <CalendarRange className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Monthly Goals</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {format(new Date(), "MMMM yyyy")}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Progress value={monthlyProgress} className="h-2 flex-1 rounded-full" />
              <span className="text-sm font-semibold text-primary w-10 text-right">{monthlyProgress}%</span>
            </div>
            <TaskSection tasks={monthlyTasks} onTasksChange={setMonthlyTasks} placeholder="Add a monthly goal…" />
          </div>

          {/* Weekly - full width */}
          <div className="md:col-span-2 glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Weekly Tasks</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">12-Week Breakdown</p>
            <div className="flex items-center gap-3 mb-4">
              <Progress value={weeklyProgress} className="h-2 flex-1 rounded-full" />
              <span className="text-sm font-semibold text-primary w-10 text-right">{weeklyProgress}%</span>
            </div>

            <Tabs value={activeWeek} onValueChange={setActiveWeek}>
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-4">
                {Array.from({ length: 12 }, (_, i) => {
                  const wNum = String(i + 1);
                  const wTasks = weeklyData[wNum] || [];
                  const wProg = calcProgress(wTasks);
                  return (
                    <TabsTrigger
                      key={wNum}
                      value={wNum}
                      className="relative px-3 py-1.5 text-xs rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border/50"
                    >
                      W{wNum}
                      {wTasks.length > 0 && (
                        <span
                          className={`ml-1 text-[10px] ${
                            wProg === 100 ? "text-green-500" : ""
                          }`}
                        >
                          {wProg}%
                        </span>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Array.from({ length: 12 }, (_, i) => {
                const wNum = String(i + 1);
                return (
                  <TabsContent key={wNum} value={wNum}>
                    <div className="pl-1">
                      <h3 className="text-sm font-medium mb-2">Week {wNum} Tasks</h3>
                      <TaskSection
                        tasks={weeklyData[wNum] || []}
                        onTasksChange={(tasks) =>
                          setWeeklyData((prev) => ({ ...prev, [wNum]: tasks }))
                        }
                        placeholder={`Add a task for Week ${wNum}…`}
                      />
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

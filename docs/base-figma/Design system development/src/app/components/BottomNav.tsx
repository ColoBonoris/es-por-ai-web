import { Home, Map, MoreHorizontal } from "lucide-react";

export function BottomNav({ activeTab, onTabChange }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "map", label: "Mapa", icon: Map },
    { id: "more", label: "Más", icon: MoreHorizontal }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-[var(--warm-accent)]" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? "text-[var(--warm-accent)]" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

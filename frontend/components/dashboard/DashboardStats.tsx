import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Package, Truck, Users, Wallet } from "lucide-react";

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: "shipments" | "deliveries" | "carriers" | "revenue";
}

export interface DashboardStatsProps {
  stats: DashboardStat[];
}

function iconFor(type: DashboardStat["icon"]) {
  switch (type) {
    case "shipments":
      return Package;
    case "deliveries":
      return Truck;
    case "carriers":
      return Users;
    case "revenue":
      return Wallet;
    default:
      return Package;
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconFor(stat.icon);
        const isUp = stat.trend === "up";
        const isDown = stat.trend === "down";

        return (
          <Card
            key={stat.label}
            className="border-border/70 bg-card/70 backdrop-blur-sm"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="flex items-center gap-1 text-[11px]">
                  {isUp && (
                    <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  )}
                  {isDown && (
                    <ArrowDownRight className="h-3 w-3 text-rose-400" />
                  )}
                  <span
                    className={
                      isUp
                        ? "text-emerald-400"
                        : isDown
                        ? "text-rose-400"
                        : "text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">vs last month</span>
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


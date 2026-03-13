import { Package, CheckCircle2, User, AlertTriangle, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    type: "pickup",
    message: "Shipment SHP-2024-007 picked up",
    location: "Nairobi, Industrial Area",
    time: "2 mins ago",
    icon: Package,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
  },
  {
    id: 2,
    type: "delivered",
    message: "Delivery completed for SHP-2024-002",
    location: "Nakuru Town",
    time: "15 mins ago",
    icon: CheckCircle2,
    iconBg: "bg-chart-3/20",
    iconColor: "text-chart-3",
  },
  {
    id: 3,
    type: "assigned",
    message: "Driver John Otieno assigned",
    location: "SHP-2024-008",
    time: "32 mins ago",
    icon: User,
    iconBg: "bg-chart-2/20",
    iconColor: "text-chart-2",
  },
  {
    id: 4,
    type: "delayed",
    message: "Shipment SHP-2024-004 delayed",
    location: "Road construction - Mombasa Rd",
    time: "1 hour ago",
    icon: AlertTriangle,
    iconBg: "bg-chart-5/20",
    iconColor: "text-chart-5",
  },
  {
    id: 5,
    type: "transit",
    message: "SHP-2024-005 now in transit",
    location: "Departed Thika",
    time: "2 hours ago",
    icon: Truck,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
  },
  {
    id: 6,
    type: "pickup",
    message: "Shipment SHP-2024-009 picked up",
    location: "Kisumu Port",
    time: "3 hours ago",
    icon: Package,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
  },
];

export function ActivityFeed() {
  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Recent Activity
          </CardTitle>
          <span className="flex h-5 items-center rounded-full bg-primary/20 px-2 text-xs font-medium text-primary">
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === activities.length - 1;
          return (
            <div
              key={activity.id}
              className={`flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50 ${
                !isLast ? "border-b border-border/50" : ""
              }`}
            >
              <div className={`rounded-lg p-2 ${activity.iconBg}`}>
                <Icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-tight text-foreground">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">{activity.location}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

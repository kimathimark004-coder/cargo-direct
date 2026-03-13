import { Package, CheckCircle2, Truck, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface AnalyticsWidgetValues {
  activeShipments: number;
  completedDeliveries: number;
  totalShipments: number;
  monthlyRevenue: string;
}

export function AnalyticsWidgets({
  values,
}: {
  values?: Partial<AnalyticsWidgetValues>;
}) {
  const widgets = [
    {
      title: "Active Shipments",
      value: String(values?.activeShipments ?? 0),
      change: "Live",
      changeType: "positive" as const,
      icon: Package,
      iconColor: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Completed Deliveries",
      value: String(values?.completedDeliveries ?? 0),
      change: "Live",
      changeType: "positive" as const,
      icon: CheckCircle2,
      iconColor: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Total Shipments",
      value: String(values?.totalShipments ?? 0),
      change: "Live",
      changeType: "positive" as const,
      icon: Truck,
      iconColor: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Monthly Revenue",
      value: values?.monthlyRevenue ?? "KES 0",
      change: "Live",
      changeType: "positive" as const,
      icon: Wallet,
      iconColor: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        return (
          <Card
            key={widget.title}
            className="border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{widget.title}</p>
                  <p className="text-3xl font-bold text-card-foreground">
                    {widget.value}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      widget.changeType === "positive"
                        ? "text-chart-3"
                        : "text-chart-5"
                    }`}
                  >
                    {widget.change}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${widget.bgColor}`}>
                  <Icon className={`h-6 w-6 ${widget.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

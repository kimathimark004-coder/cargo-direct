import {
  FileText,
  Package,
  Truck,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trackingSteps = [
  { icon: FileText, label: "Order Created", date: "Mar 7, 10:30 AM", completed: true },
  { icon: Package, label: "Picked Up", date: "Mar 8, 2:15 PM", completed: true },
  { icon: Truck, label: "In Transit", date: "Mar 8, 6:00 PM", completed: true },
  { icon: Navigation, label: "Out for Delivery", date: "Mar 9, 8:45 AM", completed: false, active: true },
  { icon: CheckCircle2, label: "Delivered", date: "Expected Mar 9", completed: false },
];

export function TrackingStatus() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Shipment Tracking
        </CardTitle>
        <p className="text-sm text-muted-foreground">SHP-2024-001 · Nairobi to Mombasa</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-[22px] top-6 h-[calc(100%-48px)] w-0.5 bg-border" />
          <div
            className="absolute left-[22px] top-6 w-0.5 bg-chart-1 transition-all"
            style={{ height: "60%" }}
          />

          {/* Steps */}
          <div className="space-y-6">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === trackingSteps.length - 1;
              return (
                <div key={step.label} className="relative flex items-start gap-4">
                  <div
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      step.completed
                        ? "border-chart-1 bg-chart-1/20"
                        : step.active
                        ? "border-chart-1 bg-chart-1/10 animate-pulse"
                        : "border-border bg-secondary"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        step.completed || step.active
                          ? "text-chart-1"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className={`pt-2 ${isLast ? "" : "pb-2"}`}>
                    <p
                      className={`text-sm font-medium ${
                        step.completed || step.active
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  </div>
                  {step.active && (
                    <span className="ml-auto mt-2 rounded-full bg-chart-1/20 px-2.5 py-0.5 text-xs font-medium text-chart-1">
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Truck, MapPin, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineStage =
  | "created"
  | "assigned"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";

export interface ShipmentTimelineItem {
  id: string;
  label: string;
  timestamp?: string;
  description?: string;
  stage: TimelineStage;
  active: boolean;
  complete: boolean;
}

export interface ShipmentTimelineProps {
  shipmentId: string;
  items: ShipmentTimelineItem[];
}

function iconForStage(stage: TimelineStage) {
  switch (stage) {
    case "created":
      return Package;
    case "assigned":
      return Truck;
    case "picked_up":
      return MapPin;
    case "in_transit":
      return Truck;
    case "out_for_delivery":
      return Truck;
    case "delivered":
      return CheckCircle2;
    default:
      return Clock;
  }
}

export function ShipmentTimeline({ shipmentId, items }: ShipmentTimelineProps) {
  return (
    <Card className="border-border/70 bg-card/70 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Delivery timeline
        </CardTitle>
        <p className="text-[11px] text-muted-foreground">
          Live status for shipment{" "}
          <span className="font-mono text-foreground">{shipmentId}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <ol className="space-y-3">
          {items.map((item, index) => {
            const Icon = iconForStage(item.stage);
            const isLast = index === items.length - 1;

            return (
              <li key={item.id} className="relative flex gap-3">
                {!isLast && (
                  <span
                    className={cn(
                      "absolute left-[11px] top-5 h-full w-px bg-border",
                      item.complete && "bg-primary/60"
                    )}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={cn(
                    "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[11px]",
                    item.complete
                      ? "border-primary/70 bg-primary/10 text-primary"
                      : item.active
                      ? "border-primary/60 bg-primary/5 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {item.complete ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={cn(
                        "font-medium",
                        item.complete || item.active
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    {item.timestamp && (
                      <span className="text-[11px] text-muted-foreground">
                        {item.timestamp}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}


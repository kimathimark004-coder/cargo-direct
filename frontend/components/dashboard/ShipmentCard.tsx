import { Package, MapPin, Truck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ShipmentStatus = "in_transit" | "delivered" | "delayed" | "pending";

export interface ShipmentCardProps {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  truckType?: string;
  eta?: string;
  status: ShipmentStatus;
}

const statusConfig: Record<
  ShipmentStatus,
  { label: string; className: string }
> = {
  in_transit: {
    label: "In transit",
    className: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  delayed: {
    label: "Delayed",
    className: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  },
  pending: {
    label: "Pending dispatch",
    className: "bg-muted text-muted-foreground border-border/60",
  },
};

export function ShipmentCard({
  id,
  origin,
  destination,
  carrier,
  truckType,
  eta,
  status,
}: ShipmentCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="border-border/70 bg-card/70 backdrop-blur-sm hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              {id}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {carrier}
              {truckType ? ` • ${truckType}` : ""}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            config.className
          )}
        >
          {config.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">{origin}</span>
          </div>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">
              {destination}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            <span>{truckType ?? "Standard trailer"}</span>
          </div>
          {eta && (
            <span className="text-right">
              ETA: <span className="font-medium text-foreground">{eta}</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


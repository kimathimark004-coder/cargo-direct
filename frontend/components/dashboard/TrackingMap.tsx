import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export interface TrackingMapProps {
  shipmentId?: string;
}

export function TrackingMap({ shipmentId }: TrackingMapProps) {
  return (
    <Card className="h-full border-border/70 bg-card/70 backdrop-blur-sm">
      <CardHeader className="flex items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4 text-primary" />
          Live map
        </CardTitle>
        {shipmentId && (
          <span className="text-[11px] text-muted-foreground">
            Shipment <span className="font-mono text-foreground">{shipmentId}</span>
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40">
          <p className="text-xs text-muted-foreground text-center px-6">
            Map placeholder. Integrate your preferred mapping provider (e.g. Mapbox,
            Google Maps) to visualize live truck locations and routes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


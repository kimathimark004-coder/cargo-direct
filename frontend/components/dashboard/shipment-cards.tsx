import { MapPin, ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardContent } from "../ui/card";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  in_transit: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};



export function ShipmentCards({ shipments }: { shipments: any[] }) {

  if (!shipments || shipments.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No shipments available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Shipments
        </h2>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shipments.map((shipment) => (
          <Card
            key={shipment.id}
            className="group border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {shipment.id}
              </span>

              <Badge
                variant="outline"
              
                className={`${statusStyles[shipment.status as keyof typeof statusStyles]} border font-medium`}
              >
                {shipment.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 text-foreground">
                  <MapPin className="h-4 w-4 text-chart-2" />
                  <span className="truncate">{shipment.origin}</span>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />

                <span className="truncate text-foreground">
                  {shipment.destination}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Cargo Type</p>
                  <p className="font-medium text-foreground">
                    {shipment.cargo_type}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="font-medium text-foreground">
                      {shipment.eta}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border pt-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium text-foreground">
                    {shipment.driver}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
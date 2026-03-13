import { Building2, Truck, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CarrierCardProps {
  name: string;
  truckType: string;
  capacity: string;
  rating: number;
  priceEstimate: string;
  onBook?: () => void;
}

export function CarrierCard({
  name,
  truckType,
  capacity,
  rating,
  priceEstimate,
  onBook,
}: CarrierCardProps) {
  return (
    <Card className="flex h-full flex-col border-border/70 bg-card/70 backdrop-blur-sm hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              {name}
            </CardTitle>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Truck className="h-3 w-3" />
              {truckType}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[11px] text-amber-300">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
          {rating.toFixed(1)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Capacity</span>
          <Badge variant="outline" className="border-border/60 text-[11px]">
            {capacity}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Est. price</span>
          <span className="font-medium text-foreground">{priceEstimate}</span>
        </div>
        <p className="text-[11px] leading-snug">
          Dynamic pricing based on lane distance, load factor, and current capacity.
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between border-t border-border/70 pt-3">
        <span className="text-[11px] text-muted-foreground">
          Typical confirmation &lt; 15 minutes
        </span>
        <Button
          size="sm"
          className="gap-1"
          variant="default"
          type="button"
          onClick={onBook}
        >
          Book shipment
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}


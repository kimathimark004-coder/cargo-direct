"use client";

import { CalendarIcon, MapPin, Package, Weight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BookingFormValues {
  customerName: string;
  pickupLocation: string;
  destination: string;
  cargoType: string;
  cargoWeight: string;
  shipmentDate: string;
  carrierId: string;
}

export interface CarrierOption {
  id: string;
  name: string;
  mode: string;
}

export interface BookingFormProps {
  carriers: CarrierOption[];
  onSubmit?: (values: BookingFormValues) => void;
  className?: string;
}

export function BookingForm({ carriers, onSubmit, className }: BookingFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const values: BookingFormValues = {
      customerName: String(formData.get("customerName") ?? ""),
      pickupLocation: String(formData.get("pickupLocation") ?? ""),
      destination: String(formData.get("destination") ?? ""),
      cargoType: String(formData.get("cargoType") ?? ""),
      cargoWeight: String(formData.get("cargoWeight") ?? ""),
      shipmentDate: String(formData.get("shipmentDate") ?? ""),
      carrierId: String(formData.get("carrierId") ?? ""),
    };

    onSubmit?.(values);
  }

  return (
    <Card className={cn("border-border/70 bg-card/70 backdrop-blur-sm", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4 text-primary" />
          New shipment booking
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Capture the core shipment details to create a new booking in Cargo Direct.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="customerName" className="flex items-center gap-1.5 text-xs">
                <Package className="h-3.5 w-3.5 text-primary" />
                Customer name
              </Label>
              <Input
                id="customerName"
                name="customerName"
                placeholder="e.g. Nairobi Fresh Exports"
                className="h-10 text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pickupLocation" className="flex items-center gap-1.5 text-xs">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Pickup location
              </Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                placeholder="e.g. Mombasa Port Gate 3"
                className="h-10 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="destination" className="flex items-center gap-1.5 text-xs">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Destination
            </Label>
            <Input
              id="destination"
              name="destination"
              placeholder="e.g. Nairobi ICD"
              className="h-10 text-sm"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cargoType" className="flex items-center gap-1.5 text-xs">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Cargo type
              </Label>
              <Input
                id="cargoType"
                name="cargoType"
                placeholder="e.g. Refrigerated containers, FMCG, bulk grain"
                className="h-10 text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cargoWeight" className="flex items-center gap-1.5 text-xs">
                <Weight className="h-3.5 w-3.5 text-primary" />
                Cargo weight (tons)
              </Label>
              <Input
                id="cargoWeight"
                name="cargoWeight"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 24"
                className="h-10 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="shipmentDate" className="flex items-center gap-1.5 text-xs">
                <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                Shipment date
              </Label>
              <div className="relative">
                <Input
                  id="shipmentDate"
                  name="shipmentDate"
                  type="date"
                  className="h-10 text-sm pr-10"
                  required
                />
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Carrier selection
              </Label>
              <Select name="carrierId" required>
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Choose a carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carriers.map((carrier) => (
                    <SelectItem key={carrier.id} value={carrier.id}>
                      <span className="flex flex-col">
                        <span className="text-sm">{carrier.name}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {carrier.mode}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-muted-foreground">
              You can assign a driver and truck after the booking is created.
            </p>
            <Button type="submit" size="sm" className="gap-2">
              Create booking
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


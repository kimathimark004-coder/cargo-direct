"use client";

import { CalendarRange, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BookingForm,
  type BookingFormValues,
} from "@/components/dashboard/BookingForm";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const MOCK_BOOKINGS = [
  {
    id: "BK-2026-001",
    customer: "Nairobi Fresh Exports",
    lane: "Mombasa Port → Nairobi ICD",
    carrier: "Trans-Kenya Hauliers",
    mode: "Road",
    date: "2026-03-09",
  },
  {
    id: "BK-2026-002",
    customer: "Rift Valley Traders",
    lane: "Nairobi ICD → Eldoret Hub",
    carrier: "Great Rift Carriers",
    mode: "Road",
    date: "2026-03-10",
  },
  {
    id: "BK-2026-003",
    customer: "Coastal Logistics",
    lane: "Kilindini Terminal → Nairobi ICD",
    carrier: "Eastline Rail Services",
    mode: "Rail",
    date: "2026-03-09",
  },
];

export default function BookingsPage() {
  const carriers = [
    {
      id: "trans-kenya",
      name: "Trans-Kenya Hauliers",
      mode: "Road • Mombasa ↔ Nairobi",
    },
    {
      id: "great-rift",
      name: "Great Rift Carriers",
      mode: "Road • Nairobi ↔ Eldoret",
    },
    {
      id: "eastline-rail",
      name: "Eastline Rail Services",
      mode: "Rail • Mombasa ↔ Nairobi ICD",
    },
  ];

  const [recentBookings, setRecentBookings] = React.useState<any[]>([]);

  // 🔹 NEW: Load bookings from Supabase
  const loadRecentBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("shipment_date", { ascending: false });

    if (!error && data) {
      setRecentBookings(data);
    }
  };

  // 🔹 NEW: Run when page loads
  React.useEffect(() => {
    loadRecentBookings();
  }, []);

  const handleCreateBooking = async (values: BookingFormValues) => {
    const {
      customerName,
      pickupLocation,
      destination,
      cargoType,
      cargoWeight,
      shipmentDate,
      carrierId,
    } = values;

    const carrierMatch = carriers.find((c) => c.id === carrierId);
    const carrier = carrierMatch?.name ?? null;

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: customerName,
          pickup_location: pickupLocation,
          delivery_location: destination,
          cargo_type: cargoType,
          cargo_weight: cargoWeight ? Number(cargoWeight) : null,
          shipment_date: new Date(shipmentDate).toISOString().split("T")[0],
          carrier,
          status: "pending",
        },
      ]);

    if (error) {
      console.log("--- DEBUG START ---");
      console.log("Error Message:", error.message);
      console.log("Error Code:", error.code);
      console.log("Raw Error:", error);
      console.dir(error);
      console.log("--- DEBUG END ---");

      alert(`Database Error: ${error.message || "Unknown Error - check console"}`);
      return;
    }

    alert("Booking created successfully");

    // 🔹 NEW: refresh table after creating booking
    loadRecentBookings();
  };

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarRange className="h-6 w-6 text-primary" />
            Bookings
          </h1>
          <p className="text-muted-foreground">
            Manage shipment bookings across your customers, lanes, and carriers.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Booking form */}
        <BookingForm carriers={carriers} onSubmit={handleCreateBooking} />

        {/* Recent bookings overview */}
        <section className="rounded-xl border border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Recent bookings
              </h2>
              <p className="text-xs text-muted-foreground">
                Last few bookings created in Cargo Direct.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {recentBookings.length} total
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Lane</TableHead>
                  <TableHead className="hidden md:table-cell">Carrier</TableHead>
                  <TableHead className="hidden md:table-cell">Mode</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>

                    <TableCell className="text-sm">
                      {booking.customer_name}
                    </TableCell>

                    <TableCell className="text-sm">
                      {booking.pickup_location} → {booking.delivery_location}
                    </TableCell>

                    <TableCell className="hidden text-xs md:table-cell text-muted-foreground">
                      {booking.carrier}
                    </TableCell>

                    <TableCell className="hidden text-xs md:table-cell text-muted-foreground">
                      {booking.status}
                    </TableCell>

                    <TableCell className="text-right text-xs text-muted-foreground">
                      {booking.shipment_date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
        </section>
      </div>
    </main>
  );
}
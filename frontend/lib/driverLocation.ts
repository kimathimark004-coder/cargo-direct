import { supabase } from "@/lib/supabase";

export type DriverLocation = {
  driver_id: string;
  latitude: number;
  longitude: number;
};

export async function updateDriverLocation({
  driver_id,
  latitude,
  longitude,
}: DriverLocation) {
  // Prefer one-row-per-driver (unique driver_id) + upsert.
  return await supabase.from("driver_locations").upsert(
    [
      {
        driver_id,
        latitude,
        longitude,
        updated_at: new Date().toISOString(),
      },
    ],
    { onConflict: "driver_id" }
  );
}

export function kenyaLatLonToPercent(lat: number, lon: number) {
  // Rough bounding box for Kenya and nearby routes.
  const minLat = -5.0;
  const maxLat = 5.5;
  const minLon = 33.5;
  const maxLon = 42.5;

  const x = ((lon - minLon) / (maxLon - minLon)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;

  return {
    x: Math.min(98, Math.max(2, x)),
    y: Math.min(95, Math.max(5, y)),
  };
}


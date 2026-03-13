import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhyChoose } from "@/components/marketing/why-choose";

export default function Home() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="border-border/70 bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60">
                <Image
                  src="/logo.png"
                  alt="Cargo Direct"
                  width={44}
                  height={44}
                  className="h-9 w-9 object-contain"
                  priority
                />
              </span>
              Cargo Direct
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Smart logistics and shipment tracking platform.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Sign in is coming next. For now, you can access the dashboard.
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/drivers/verify">Verify phone</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <WhyChoose />
      </div>
    </main>
  );
}
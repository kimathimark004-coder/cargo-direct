"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="p-6">
      <div className="mb-2 flex items-center gap-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>
      <p className="text-muted-foreground">
        Settings UI coming next. This page exists to complete navigation and routing.
      </p>
    </main>
  );
}


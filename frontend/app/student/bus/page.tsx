"use client";

import { Bus } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentBusPage() {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardShell title="Bus Tracking">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" /> Live Bus Map
            </CardTitle>
            <CardDescription>Track your campus bus in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-xl bg-muted/50">
              <p className="text-muted-foreground">Google Maps integration — Phase 3</p>
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}

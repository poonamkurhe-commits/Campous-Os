"use client";

import { QrCode } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentAttendancePage() {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardShell title="Attendance">
        <Card>
          <CardHeader>
            <CardTitle>Scan QR Code</CardTitle>
            <CardDescription>Scan the QR code displayed by your faculty to mark attendance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <div className="mb-6 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed">
              <QrCode className="h-24 w-24 text-muted-foreground" />
            </div>
            <Button disabled variant="tenant">
              Open Scanner (Phase 2)
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">GPS-verified check-in coming in Phase 2</p>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}

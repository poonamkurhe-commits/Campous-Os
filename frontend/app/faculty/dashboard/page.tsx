"use client";

import { QrCode, Upload, Users } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacultyDashboard() {
  return (
    <AuthGuard allowedRoles={["faculty"]}>
      <DashboardShell title="Faculty Dashboard">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <QrCode className="h-5 w-5" /> Start Attendance
              </CardTitle>
              <CardDescription>Generate QR session for your class</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="tenant" disabled className="w-full">
                Start Session (Phase 2)
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="h-5 w-5" /> Upload Notes
              </CardTitle>
              <CardDescription>Share study material with students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled className="w-full">
                Upload (Phase 2)
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5" /> My Classes
              </CardTitle>
              <CardDescription>View enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">—</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}

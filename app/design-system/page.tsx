import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ColorPalette from "@/components/design-system/ColorPalette";
import Typography from "@/components/design-system/Typography";
import ButtonShowcase from "@/components/design-system/ButtonShowcase";
import StatCardShowcase from "@/components/design-system/StatCardShowcase";

import PageHeader from "@/components/common/PageHeader";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl space-y-10">

        <PageHeader
          title="AMS Design System"
          description="Living Design System for An-Nahl Management System."
        />

        <Card>
          <CardHeader>
            <CardTitle>🎨 Color Palette</CardTitle>
          </CardHeader>

          <CardContent>
            <ColorPalette />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>

          <CardContent>
            <Typography />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>

          <CardContent>
            <ButtonShowcase />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistic Cards</CardTitle>
          </CardHeader>

          <CardContent>
            <StatCardShowcase />
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
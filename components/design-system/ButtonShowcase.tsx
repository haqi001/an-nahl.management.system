import { Button } from "@/components/ui/button";

export default function ButtonShowcase() {
  return (
    <div className="space-y-8">
      {/* Variants */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Variants</h3>

        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="outline">
            Outline
          </Button>

          <Button variant="ghost">
            Ghost
          </Button>

          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Sizes</h3>

        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>

          <Button>Medium</Button>

          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">States</h3>

        <div className="flex flex-wrap gap-4">
          <Button disabled>
            Disabled
          </Button>

          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </div>
      </div>
    </div>
  );
}
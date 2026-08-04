const colors = [
  {
    name: "Primary",
    hex: "#1a4a3b",
    className: "bg-emerald-900",
    usage: "Button, Link, Active State",
  },
  {
    name: "Secondary",
    hex: "#ff9500",
    className: "bg-amber-500",
    usage: "Highlight",
  },
  {
    name: "Background",
    hex: "#F8FAFC",
    className: "bg-slate-50",
    usage: "Page Background",
  },
  {
    name: "Surface",
    hex: "#FFFFFF",
    className: "bg-white border",
    usage: "Card",
  },
  {
    name: "Text",
    hex: "#0F172A",
    className: "bg-slate-900",
    usage: "Heading",
  },
  {
    name: "Muted",
    hex: "#64748B",
    className: "bg-slate-500",
    usage: "Description",
  },
];

export default function ColorPalette() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {colors.map((color) => (
        <div
          key={color.name}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <div
            className={`h-20 rounded-lg ${color.className}`}
          />

          <h3 className="mt-4 text-lg font-semibold">
            {color.name}
          </h3>

          <p className="text-sm text-slate-500">
            {color.hex}
          </p>

          <p className="mt-2 text-sm">
            {color.usage}
          </p>
        </div>
      ))}
    </div>
  );
}
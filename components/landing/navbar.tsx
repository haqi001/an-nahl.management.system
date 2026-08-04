import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-xl font-bold text-emerald-800">
            AMS
          </h1>
        </div>

        <div className="hidden md:flex gap-6 text-sm">
          <a href="#">Tentang</a>
          <a href="#">Timeline</a>
          <a href="#">Sayembara</a>
          <a href="#">Dokumentasi</a>
        </div>

        <Button>
          Login
        </Button>

      </div>
    </nav>
  );
}
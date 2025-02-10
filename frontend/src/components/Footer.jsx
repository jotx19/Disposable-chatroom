import { Link } from "react-router-dom";
import { ArrowRight, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <section className="flex flex-row justify-end gap-4 items-center m-1 md:h-[8vh] w-auto text-white bg-[#1C1C1C] rounded-2xl p-4">
        <h1 className="font-custom hidden md:block text-xl md:text-xl">Developed by </h1>
        <Link
          to="https://github.com/jotx19"
          className="relative bg-[#1C0037] w-38 border border-white rounded-2xl flex flex-row p-1 group items-center"
        >
          <Github size={35} className="mr-2" />
          jotx19 <ArrowRight className="inline ml-1 -rotate-45" />
        </Link>
      </section>
    </div>
  );
}

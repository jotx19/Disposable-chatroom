import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <section className="flex flex-col m-1 md:h-[20vh] w-auto text-white bg-[#1C1C1C] rounded-2xl">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="font-custom text-3xl text-white md:text-4xl">
            Social
          </h1>
          <span className="border border-b-[0.1px] border-white"></span>
          <div className="flex gap-2 mt-2 flex-col">
            <Link
              to="https://www.instagram.com/skiptraces"
              className="relative bg-[#1C0037] w-40 border border-white rounded-2xl flex flex-row p-1 group items-center"
            >
              <Instagram size={35} className="mr-2" />
              skiptraces <ArrowRight className="inline ml-1 -rotate-45" />
            </Link>
          {/* <p class Name="text-xs item-end text-[#bdbdbd] font-medium">©️ Skiptraces design 2025. Legally made</p> */}
          </div>
        </div>
      </section>
    </div>
  );
}

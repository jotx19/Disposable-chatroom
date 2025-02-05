import { useEffect, useRef } from "react";

export default function Marquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const marqueeContent = marqueeElement.innerHTML;
    marqueeElement.innerHTML = marqueeContent + marqueeContent; 
    const totalWidth = marqueeElement.scrollWidth;
    let position = 0;

    const moveMarquee = () => {
      position -= 0.2; 
      if (position <= -totalWidth / 2) {
        position = 0; 
      }
      marqueeElement.style.transform = `translateX(${position}px)`;
    };

    const intervalId = setInterval(moveMarquee, 16); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative z-30 overflow-hidden h-[15vh] bg-[#004d43] flex items-center justify-center md:h-[20vh] w-full">
      <div ref={marqueeRef} className="flex whitespace-nowrap w-full">
        <h1 className="text-6xl flex justify-center font-custom1 text-white md:text-8xl border-b-[1px] border-t-[1px] border-white">
          <span className="font-custom">/////////</span>
          <span className="font-custom">/////////</span>
          <span className="font-custom">/////////</span>
          <span className="font-custom"> Chat Now 🚀  </span>
          <span className="font-custom">/////////</span>
        </h1>
      </div>
    </div>
  );
}

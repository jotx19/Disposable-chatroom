import { useEffect, useRef } from "react";

export default function Marquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const marqueeContent = marqueeElement.innerHTML;
    marqueeElement.innerHTML = marqueeContent + marqueeContent; // Duplicate content for infinite loop
    const totalWidth = marqueeElement.scrollWidth;
    let position = 0;

    const moveMarquee = () => {
      position -= 0.2; // Slower scroll speed
      if (position <= -totalWidth / 2) {
        position = 0; // Reset the position when it reaches the end
      }
      marqueeElement.style.transform = `translateX(${position}px)`;
    };

    const intervalId = setInterval(moveMarquee, 16); // Slower speed: update position every 16ms (~60fps)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative z-30 overflow-hidden rounded-xl h-[15vh] bg-[#004d43] flex items-center justify-center md:h-[20vh] w-full">
      <div ref={marqueeRef} className="flex whitespace-nowrap w-full">
        <h1 className="text-6xl flex justify-center font-custom1 text-white md:text-8xl border-b-[1px] border-t-[1px] border-white">
          <span className="font-custom">👋 Hi there!  </span>
          <span className="font-custom">  Bonjour!   </span>
          <span className="font-futuras">🎉 Let's Go!   </span>
          <span className="font-custom"> Chat Now!  </span>
          <span className="font-custom">🚀 Let's Connect!  </span>
        </h1>
      </div>
    </div>
  );
}

"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src?: string;
  title: string;
  category: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // py-4
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-contain py-4 md:py-8 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/40 backdrop-blur-md h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-4xl mx-auto bg-white h-fit z-[60] my-20 p-8 md:p-16 rounded-[40px] font-sans relative shadow-2xl border border-slate-100"
            >
              <button
                className="absolute top-8 right-8 h-10 w-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                onClick={handleClose}
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
              
              <div className="mb-8">
                <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                    <div className="text-[#3666ff]">
                        <Zap className="size-8" />
                    </div>
                </div>
                <motion.p
                    layoutId={layout ? `category-${card.title}` : undefined}
                    className="text-sm font-bold text-[#3666ff] uppercase tracking-[0.2em] mb-4"
                >
                    {card.category}
                </motion.p>
                <motion.p
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="text-3xl md:text-5xl font-bold text-[#1A1D2E] tracking-tight leading-tight"
                >
                    {card.title}
                </motion.p>
              </div>
              <div className="text-slate-600 space-y-4">
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative group perspective-1000">
        {/* 8-Segment Hover Grid for 3D Effect */}
        <div className="absolute inset-0 z-30 grid grid-cols-3 grid-rows-3 gap-0 pointer-events-none">
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: 10, y: -10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: 10, y: 0 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: 10, y: 10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: 0, y: -10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: 0, y: 10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: -10, y: -10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: -10, y: 0 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
            <div className="pointer-events-auto" onMouseEnter={() => setRotation({ x: -10, y: 10 })} onMouseLeave={() => setRotation({ x: 0, y: 0 })} />
        </div>

        <motion.button
            layoutId={layout ? `card-${card.title}` : undefined}
            onClick={handleOpen}
            animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
                scale: rotation.x !== 0 || rotation.y !== 0 ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative z-10 rounded-[24px] bg-white border border-slate-200/60 h-[22rem] w-[17rem] md:h-[24rem] md:w-[19rem] overflow-hidden flex flex-col items-start justify-start p-7 md:p-9 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
        >
            <div style={{ transform: "translateZ(40px)" }} className="mb-6 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/50 shadow-sm transition-colors group-hover:bg-blue-50">
                <div className="text-[#3666ff]">
                    {card.icon || <Zap className="size-7" />}
                </div>
            </div>
            
            <div style={{ transform: "translateZ(30px)" }} className="space-y-3">
                <motion.h3
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="text-lg md:text-xl font-bold text-[#1A1D2E] tracking-tight leading-tight font-sans transition-colors duration-500 group-hover:text-[#3666ff]"
                >
                    {card.title}
                </motion.h3>
                
                <motion.p
                    className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium line-clamp-4"
                >
                    {card.description || "Learn how our intelligent systems transform complex procurement data into actionable results."}
                </motion.p>
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="mt-auto pt-4">
                <div className="flex items-center gap-2 text-[#3666ff] font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-500">
                    <span className="group-hover:tracking-[0.25em] transition-all duration-500">View Details</span>
                    <div className="overflow-hidden w-4 flex items-center">
                        <ArrowRight className="size-3.5 transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                        <ArrowRight className="size-3.5 transform group-hover:translate-x-4 transition-all duration-500 opacity-100 group-hover:opacity-0" />
                    </div>
                </div>
            </div>
        </motion.button>
      </div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};

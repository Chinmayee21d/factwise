"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(54, 102, 255, 0.15)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    // Handle CSS variables
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }

    return Color.formatRGBA(Color.parse(cssColor as string));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

// Helper function to add opacity to an RGB color string
export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const Icons = {
  logo: () => (
    <img 
      src="/logo.png" 
      alt="FactWise Logo" 
      className="h-8 w-auto" 
    />
  ),
  soc2Dark: ({ className }: { className?: string }) => (
    <svg width="46" height="45" viewBox="0 0 46 45" fill="none" className={cn("size-8 opacity-40", className)}>
      <rect x="3" y="0.863281" width="40" height="40" rx="20" fill="rgba(0,0,0,0.06)" />
      <text x="23" y="24" textAnchor="middle" fill="#363636" fontSize="10" fontWeight="bold">SOC2</text>
    </svg>
  ),
  hipaaDark: ({ className }: { className?: string }) => (
    <svg width="46" height="45" viewBox="0 0 46 45" fill="none" className={cn("size-8 opacity-40", className)}>
      <rect x="3" y="0.863281" width="40" height="40" rx="20" fill="rgba(0,0,0,0.06)" />
      <text x="23" y="24" textAnchor="middle" fill="#363636" fontSize="10" fontWeight="bold">HIPAA</text>
    </svg>
  ),
  gdprDark: ({ className }: { className?: string }) => (
    <svg width="46" height="45" viewBox="0 0 46 45" fill="none" className={cn("size-8 opacity-40", className)}>
      <rect x="3" y="0.863281" width="40" height="40" rx="20" fill="rgba(0,0,0,0.06)" />
      <text x="23" y="24" textAnchor="middle" fill="#363636" fontSize="10" fontWeight="bold">GDPR</text>
    </svg>
  ),
};

export const siteConfig = {
  hero: {
    description: "The next-generation source-to-pay platform. Unifying your entire supply chain in one intelligent ecosystem.",
  },
  footerLinks: [
    {
      title: "Product",
      links: [
        { id: 1, title: "Strategic Sourcing", url: "#" },
        { id: 2, title: "Spend Analytics", url: "#" },
        { id: 3, title: "Supplier Portal", url: "#" },
        { id: 4, title: "Contract Management", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { id: 5, title: "About Us", url: "/about" },
        { id: 6, title: "Pricing", url: "/pricing" },
        { id: 7, title: "Careers", url: "#" },
        { id: 8, title: "Contact", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { id: 9, title: "Documentation", url: "#" },
        { id: 10, title: "API Reference", url: "#" },
        { id: 11, title: "Blog", url: "#" },
        { id: 12, title: "Status", url: "#" },
      ],
    },
  ],
};

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#3666ff",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    return getRGBA(color);
  }, [color]);

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
        maskCtx.restore();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const squareWidth = squareSize * dpr;
          const squareHeight = squareSize * dpr;

          const maskData = maskCtx.getImageData(
            x,
            y,
            squareWidth,
            squareHeight,
          ).data;
          const hasText = maskData.some(
            (value, index) => index % 4 === 0 && value > 0,
          );

          const opacity = squares[i * rows + j];
          const finalOpacity = hasText
            ? Math.min(1, opacity * 3 + 0.4)
            : opacity;

          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, squareWidth, squareHeight);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }
    checkQuery();
    window.addEventListener("resize", checkQuery);
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);
    return () => {
      window.removeEventListener("resize", checkQuery);
      mediaQuery.removeEventListener("change", checkQuery);
    };
  }, [query]);

  return value;
}

export const FlickeringFooter = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full bg-[#f6f9fc] border-t border-black/[0.07] pt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between px-10">
        <div className="flex flex-col items-start justify-start gap-y-6 max-w-xs mx-0">
          <Link href="/" className="flex items-center gap-3">
            <Icons.logo />
            <p className="text-xl font-bold text-[#000000] tracking-tight">factwise</p>
          </Link>
          <p className="tracking-tight text-[#808080] font-light leading-relaxed">
            {siteConfig.hero.description}
          </p>
          <div className="flex items-center gap-4">
            <Icons.soc2Dark />
            <Icons.hipaaDark />
            <Icons.gdprDark />
          </div>
        </div>
        <div className="pt-10 md:pt-0 md:w-1/2">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between gap-y-10 lg:pl-10">
            {siteConfig.footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-3">
                <li className="mb-2 text-[11px] font-bold text-[#808080] uppercase tracking-[0.2em]">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[14px] text-[#808080] hover:text-[#000000] transition-colors duration-300"
                  >
                    <Link href={link.url}>{link.title}</Link>
                    <div className="flex size-4 items-center justify-center border border-black/10 rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                      <ChevronRightIcon className="h-3 w-3 text-[#3666ff]" />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-48 md:h-64 relative mt-24 z-0 overflow-hidden">
        {/* Gradient mask to blend into the grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#f6f9fc] z-10 from-20%" />
        <div className="absolute inset-0">
          <FlickeringGrid
            text={tablet ? "FACTWISE" : "Future of Enterprise Commerce"}
            fontSize={tablet ? 60 : 100}
            className="h-full w-full"
            squareSize={2}
            gridGap={3}
            color="#3666ff"
            maxOpacity={0.2}
            flickerChance={0.1}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full py-8 border-t border-black/[0.07] bg-[#f6f9fc]/90 backdrop-blur-xl px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#808080] text-xs font-light">
            © 2026 FactWise Technologies. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Security'].map(item => (
              <Link key={item} href="#" className="text-[#808080] text-xs hover:text-[#000000] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

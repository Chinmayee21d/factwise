"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  color?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Auto-rotation engine
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  // Center view on clicked node
  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    // We want the target node to end up at the top (270 degrees)
    setRotationAngle(270 - targetAngle);
  };

  const handleContainerClick = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      const isOpening = !prev[id];

      if (isOpening) {
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);

        // Highlight related nodes
        const currentItem = timelineData.find((item) => item.id === id);
        const newPulseEffect: Record<number, boolean> = {};
        currentItem?.relatedIds.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    // Z-index and opacity based on depth (Y-axis)
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const currentItem = timelineData.find((item) => item.id === activeNodeId);
    return currentItem?.relatedIds.includes(itemId) || false;
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          {/* Central Hub with FactWise Branding */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#3666ff] to-[#4A6FFF] shadow-[0_0_40px_rgba(54,102,255,0.3)] flex items-center justify-center z-10">
            <div className="absolute w-24 h-24 rounded-full border border-[#3666ff]/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-28 h-28 rounded-full border border-[#3666ff]/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
               <span className="text-[10px] font-bold text-[#3666ff] tracking-tight">factwise</span>
            </div>
          </div>

          {/* Background Rotating Rings */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-gray-200/30 shadow-inner bg-white/5 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[#3666ff]/10 animate-[spin_120s_linear_infinite_reverse]"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            const brandColor = item.color || "#3666ff";

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 500 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Orbital Aura - Branded */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${brandColor}15 0%, transparent 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node with Brand Ring */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                  hover:scale-110
                  bg-white shadow-lg border
                `}
                  style={{
                    borderColor: isExpanded ? brandColor : isRelated ? `${brandColor}80` : "#f3f4f6",
                    boxShadow: isExpanded ? `0 0 20px ${brandColor}30` : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                >
                  <div style={{ color: brandColor }}>
                    <Icon size={16} />
                  </div>
                </div>

                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[9px] font-bold tracking-widest uppercase
                  transition-all duration-300
                  ${isExpanded ? "scale-125" : ""}
                `}
                  style={{ color: isExpanded ? brandColor : "#9ca3af" }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card 
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-xl border-gray-200/60 shadow-2xl shadow-gray-200/40 rounded-3xl overflow-visible z-[1000]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3" style={{ backgroundColor: `${brandColor}30` }}></div>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          className="px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-md uppercase border-none"
                          style={{ backgroundColor: `${brandColor}10`, color: brandColor }}
                        >
                          {item.status.replace('-', ' ')}
                        </Badge>
                        <span className="text-[10px] font-mono font-bold text-gray-400">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-bold text-gray-900 mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-600">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-gray-50">
                        <div className="flex justify-between items-center text-[10px] mb-1 font-bold text-gray-400 uppercase tracking-tight">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" style={{ color: brandColor }} />
                            Connection Strength
                          </span>
                          <span className="font-mono" style={{ color: brandColor }}>{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{ width: `${item.energy}%`, backgroundColor: brandColor }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-50">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-gray-400 mr-1" />
                            <h4 className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                              Connected Ecosystems
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2.5 py-0 text-[10px] font-medium rounded-full border-gray-100 bg-gray-50/50 transition-all hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 opacity-60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

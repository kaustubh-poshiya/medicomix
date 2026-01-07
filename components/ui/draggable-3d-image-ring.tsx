"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut } from "framer-motion";
import { cn } from "../../lib/utils";
import { animate } from "framer-motion";

export interface ImageItem {
  /** Image URL */
  image: string;
  /** Title to display below the image */
  title: string;
}

export interface ThreeDImageRingProps {
  /** Array of image items with title and URL to display in the ring */
  items?: ImageItem[];
  /** @deprecated Use items instead. Array of image URLs to display in the ring */
  images?: string[];
  /** Container width in pixels (will be scaled) */
  width?: number;
  /** 3D perspective value */
  perspective?: number;
  /** Distance of images from center (z-depth) */
  imageDistance?: number;
  /** Initial rotation of the ring */
  initialRotation?: number;
  /** Animation duration for entrance */
  animationDuration?: number;
  /** Stagger delay between images */
  staggerDelay?: number;
  /** Hover opacity for non-hovered images */
  hoverOpacity?: number;
  /** Custom container className */
  containerClassName?: string;
  /** Custom ring className */
  ringClassName?: string;
  /** Custom image className */
  imageClassName?: string;
  /** Background color of the stage */
  backgroundColor?: string;
  /** Enable/disable drag functionality */
  draggable?: boolean;
  /** Animation ease for entrance */
  ease?: string;
  /** Breakpoint for mobile responsiveness (e.g., 768 for iPad mini) */
  mobileBreakpoint?: number;
  /** Scale factor for mobile (e.g., 0.7 for 70% size) */
  mobileScaleFactor?: number;
  /** Power for the drag end inertia animation (higher means faster stop) */
  inertiaPower?: number;
  /** Time constant for the drag end inertia animation (duration of deceleration in ms) */
  inertiaTimeConstant?: number;
  /** Multiplier for initial velocity when drag ends (influences initial "spin") */
  inertiaVelocityMultiplier?: number;
  /** Enable/disable auto-rotation */
  autoRotate?: boolean;
  /** Auto-rotation speed in degrees per second */
  autoRotateSpeed?: number;
  /** Delay before resuming auto-rotation after drag ends (in ms) */
  autoRotateResumeDelay?: number;
}

export function ThreeDImageRing({
  items,
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  ease = "easeOut",
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
  autoRotate = true,
  autoRotateSpeed = 15,
  autoRotateResumeDelay = 2000,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0); // To track drag velocity

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Convert images array to items array for backward compatibility
  const imageItems: ImageItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    if (images && images.length > 0) {
      return images.map((img) => ({ image: img, title: '' }));
    }
    return [];
  }, [items, images]);

  const angle = useMemo(() => 360 / imageItems.length, [imageItems.length]);

  const getBgPos = (imageIndex: number, currentRot: number, scale: number) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement as HTMLElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, imageItems.length, imageDistance, currentScale, angle]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || !isAutoRotating) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const autoRotateLoop = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Calculate rotation increment based on speed (degrees per second)
      const rotationIncrement = (autoRotateSpeed * deltaTime) / 1000;

      // Update rotation
      const newRotation = rotationY.get() + rotationIncrement;
      rotationY.set(newRotation);
      currentRotationY.current = newRotation;

      // Continue the loop
      animationFrameRef.current = requestAnimationFrame(autoRotateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [autoRotate, isAutoRotating, autoRotateSpeed, rotationY]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const pauseAutoRotation = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
    setIsAutoRotating(false);
    lastTimeRef.current = 0;
  }, []);

  const resumeAutoRotation = useCallback(() => {
    if (!autoRotate) return;

    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }

    autoRotateTimerRef.current = setTimeout(() => {
      lastTimeRef.current = 0;
      setIsAutoRotating(true);
    }, autoRotateResumeDelay);
  }, [autoRotate, autoRotateResumeDelay]);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;

    // Pause auto-rotation when dragging starts
    pauseAutoRotation();

    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    // Stop any ongoing animation instantly when drag starts
    rotationY.stop();
    velocity.current = 0; // Reset velocity
    if (ringRef.current) {
      (ringRef.current as HTMLElement).style.cursor = "grabbing";
    }
    // Mark as interacted to hide the hint
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    // Attach global move and end listeners to document when dragging starts
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    // Only proceed if dragging is active
    if (!draggable || !isDragging.current) return;

    const clientX = "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;

    // Update velocity based on deltaX
    velocity.current = -deltaX * 0.5; // Factor of 0.5 to control sensitivity

    rotationY.set(currentRotationY.current + velocity.current);

    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    // Animate with inertia manually using `animate()`
    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => {
        rotationY.set(latest);
      },
      onComplete: () => {
        // Resume auto-rotation after inertia animation completes
        resumeAutoRotation();
      },
    });

    velocity.current = 0;
  };


  // Corrected imageVariants: no function for 'visible' state
  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      // Transition properties will be defined directly on the motion.div using `custom` prop
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      // Attach initial drag start listeners only
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.33}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn(
            "w-full h-full absolute",
            ringClassName
          )}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages && imageItems.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-full h-full absolute rounded-2xl overflow-hidden shadow-lg",
                  imageClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                custom={index}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                whileHover={{ opacity: 1, scale: 1.02, transition: { duration: 0.15 } }}
                onHoverStart={() => {
                  if (isDragging.current) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl, i) => {
                      if (i !== index) {
                        (imgEl as HTMLElement).style.opacity = `${hoverOpacity}`;
                      }
                    });
                  }
                }}
                onHoverEnd={() => {
                  if (isDragging.current) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl) => {
                      (imgEl as HTMLElement).style.opacity = `1`;
                    });
                  }
                }}
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                {/* Title Footer with Frosted Glass Effect */}
                {item.title && (
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      padding: "12px 16px",
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                    }}
                  >
                    <span
                      className="text-sm md:text-base font-semibold text-gray-800 text-center"
                      style={{
                        letterSpacing: "0.01em",
                        textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Drag Hint */}
      {draggable && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-200"
        >
          <svg
            className="w-5 h-5 text-slate-500 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
          <span className="text-sm font-medium text-slate-600">Drag to explore</span>
        </motion.div>
      )}
    </div>
  );
}

export default ThreeDImageRing;

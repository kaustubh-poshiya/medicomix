import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  // Card dimensions
  card: {
    width: 280,
    height: 380,
    mobileWidth: 240,
    mobileHeight: 320,
    gap: 40, // Gap between cards
  },
  // Arc shape settings
  arc: {
    // How much the outer cards drop (pixels) - higher = more pronounced curve
    dropMultiplier: 18,
    // Base rotation per card position (degrees)
    rotationPerCard: 6,
  },
  // Spring physics for smooth motion
  spring: {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  },
  // Hover animation settings
  hover: {
    scale: 1.06,
    rotationReduction: 0.25, // How much rotation decreases on hover (0-1)
    duration: 0.35,
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Calculate the vertical offset for arc positioning
 * Uses a quadratic curve where center cards are highest
 */
const calculateArcHeight = (index: number, totalCards: number): number => {
  const centerIndex = (totalCards - 1) / 2;
  const distanceFromCenter = index - centerIndex;
  // Quadratic drop-off from center
  return -Math.pow(distanceFromCenter, 2) * CONFIG.arc.dropMultiplier;
};

/**
 * Calculate the rotation angle for each card along the arc
 * Left cards rotate counter-clockwise, right cards clockwise
 */
const calculateRotation = (index: number, totalCards: number): number => {
  const centerIndex = (totalCards - 1) / 2;
  const distanceFromCenter = index - centerIndex;
  return distanceFromCenter * CONFIG.arc.rotationPerCard;
};

// =============================================================================
// SERVICE CARD COMPONENT
// =============================================================================

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  totalCards: number;
  scrollProgress: MotionValue<number>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  totalCards,
  scrollProgress
}) => {
  // Pre-calculate static values
  const baseRotation = calculateRotation(index, totalCards);
  const arcHeight = calculateArcHeight(index, totalCards);

  // Card spacing from center
  const cardWidth = CONFIG.card.width + CONFIG.card.gap;
  const centerIndex = (totalCards - 1) / 2;
  const offsetFromCenter = (index - centerIndex) * cardWidth;

  // Calculate total scroll distance needed
  // Cards should travel from right side to left side of viewport
  const totalScrollDistance = (totalCards - 1) * cardWidth;

  // Transform scroll progress to horizontal position
  // Start: cards positioned to the right, End: cards positioned to the left
  const startX = offsetFromCenter + totalScrollDistance * 0.5;
  const endX = offsetFromCenter - totalScrollDistance * 0.5;

  const rawX = useTransform(scrollProgress, [0, 1], [startX, endX]);
  const smoothX = useSpring(rawX, CONFIG.spring);

  // Slight rotation adjustment based on scroll for dynamic feel
  const dynamicRotation = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [baseRotation - 2, baseRotation, baseRotation + 2]
  );
  const smoothRotation = useSpring(dynamicRotation, CONFIG.spring);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        x: smoothX,
        y: arcHeight,
        rotate: smoothRotation,
        zIndex: totalCards - Math.abs(index - centerIndex), // Center cards on top
      }}
      whileHover={{
        scale: CONFIG.hover.scale,
        rotate: baseRotation * CONFIG.hover.rotationReduction,
        zIndex: 100,
        transition: {
          duration: CONFIG.hover.duration,
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
        }
      }}
    >
      <Link
        to={service.link}
        className="block w-[240px] h-[320px] md:w-[280px] md:h-[380px] rounded-3xl overflow-hidden relative shadow-2xl group"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Background Image */}
        <img
          src={service.image}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glassmorphic Label */}
        <div className="absolute bottom-4 left-4 right-4">
          <div
            className="px-5 py-3 rounded-full backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg transform transition-all duration-300 group-hover:bg-white/30 group-hover:scale-105"
          >
            <span className="text-white font-semibold text-sm md:text-base tracking-wide drop-shadow-sm">
              {service.name}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const OurServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the pinned section
  // offset: when element's start hits viewport's start -> when element's end hits viewport's end
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics for smooth, natural motion
  const smoothProgress = useSpring(scrollYProgress, {
    ...CONFIG.spring,
    restDelta: 0.001,
  });

  return (
    // Outer container - provides the scroll distance for the pinned effect
    // Height = viewport height + extra scroll distance for the horizontal movement
    <div ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky container - stays pinned while user scrolls through outer container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-slate-50">
        {/* Background decorations */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(224, 242, 254, 0.6) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207, 250, 254, 0.5) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />

        {/* Content container */}
        <div className="h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-600 mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] max-w-2xl">
                Expert Healthcare Services
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 group"
              >
                See All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Cards Container - Arc Layout */}
          <div className="relative h-[400px] md:h-[480px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  totalCards={SERVICES.length}
                  scrollProgress={smoothProgress}
                />
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1"
              initial={{ opacity: 0.5 }}
            >
              <motion.div
                className="w-1.5 h-3 bg-slate-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ANIMATION CALCULATIONS EXPLAINED
// =============================================================================
/*
 * ARC POSITIONING:
 * - arcHeight = -(distanceFromCenter²) × dropMultiplier
 * - Creates a parabolic curve where center = 0, edges drop quadratically
 * - Example with 6 cards: positions [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]
 * - Heights: [-112.5, -40.5, -4.5, -4.5, -40.5, -112.5] pixels
 *
 * SCROLL MAPPING:
 * - Total scroll distance = (totalCards - 1) × (cardWidth + gap)
 * - Each card starts at: offsetFromCenter + scrollDistance/2
 * - Each card ends at: offsetFromCenter - scrollDistance/2
 * - This creates smooth left-to-right traversal
 *
 * SPRING PHYSICS:
 * - stiffness: 80 (lower = slower, more floaty)
 * - damping: 25 (higher = less oscillation)
 * - mass: 0.5 (lower = snappier response)
 * - These values create a premium, inertial feel
 *
 * Z-INDEX:
 * - Center cards have higher z-index: totalCards - |index - centerIndex|
 * - On hover, z-index jumps to 100 for clear elevation
 */

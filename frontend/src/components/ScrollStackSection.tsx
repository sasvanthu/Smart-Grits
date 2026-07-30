import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollStackSectionProps {
  children: ReactNode;
  className?: string;
  index: number;
}

const ScrollStackSection = ({ children, className = '', index }: ScrollStackSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full ${className}`}
      style={{ zIndex: index }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollStackSection;

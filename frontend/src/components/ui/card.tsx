import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  image?: string;
  price?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, image, price, description, className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col hover:scale-[1.03] hover:shadow-xl transition-transform duration-200",
        className
      )}
      {...props}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">{title}</h3>
          {description && <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">{description}</p>}
        </div>
        {price && <div className="mt-2 text-xl font-bold text-primary">₹{price}</div>}
        {children}
      </div>
    </motion.div>
  )
);
Card.displayName = "Card";





export { Card };
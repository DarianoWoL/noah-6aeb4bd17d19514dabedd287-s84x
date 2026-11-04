import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  label: string;
  value: string | null;
  unit?: string;
  icon: LucideIcon;
  index: number;
}

const StatCard = ({ label, value, unit, icon: Icon, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card relative overflow-hidden rounded-lg p-6"
  >
    <div className="flex items-center justify-between">
      <span className="font-display text-xs tracking-[0.18em] text-muted-foreground">{label}</span>
      <Icon className="h-5 w-5 text-primary/80" />
    </div>
    <div className="mt-6 flex items-baseline gap-2">
      {value === null ? (
        <Skeleton className="h-10 w-32 bg-muted" />
      ) : (
        <span className="font-display text-3xl font-bold text-foreground sm:text-4xl">{value}</span>
      )}
      {unit && value !== null && <span className="font-display text-sm text-primary">{unit}</span>}
    </div>
    <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
  </motion.div>
);

export default StatCard;

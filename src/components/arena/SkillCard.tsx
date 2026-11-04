import { motion } from 'framer-motion';
import { Coins, Scale } from 'lucide-react';

const SkillCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card mx-auto mt-8 grid max-w-4xl gap-6 rounded-lg p-6 sm:grid-cols-[auto_1fr] sm:p-8"
  >
    <Scale className="h-10 w-10 text-primary" />
    <div>
      <h3 className="text-2xl font-bold text-gold-gradient">A game of skill</h3>
      <p className="mt-3 text-lg text-foreground">
        The result depends only on the players' decisions.
      </p>
      <p className="mt-2 flex items-start gap-2 text-lg text-muted-foreground">
        <Coins className="mt-1 h-4 w-4 shrink-0 text-primary" />
        10% of every ticket goes to the season treasury and rolls into the next prize pool.
      </p>
    </div>
  </motion.div>
);

export default SkillCard;

import { motion } from 'framer-motion';
import { Medal, Swords, Ticket, Wallet } from 'lucide-react';
import SkillCard from './SkillCard';

const STEPS = [
  { icon: Wallet, title: 'Sign in', text: 'Sign in with your DogeOS wallet - X, email or wallet.' },
  { icon: Ticket, title: 'Join a tournament', text: 'The ticket is paid straight from your wallet into the contract.' },
  { icon: Swords, title: 'Play and win', text: 'Prizes are credited on-chain and claimed with one transaction.' },
  { icon: Medal, title: 'Climb the ranking', text: 'The best strategists win prizes.' },
];

const HowItWorks = () => (
  <section id="how" className="container px-4 py-20 sm:px-8">
    <div className="divider-ornament font-display text-xs tracking-[0.3em]">HOW IT WORKS</div>
    <h2 className="mt-4 mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl">The Path of a Lord</h2>

    <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <motion.li
          key={title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative rounded-lg p-6"
        >
          <span className="absolute right-5 top-4 font-display text-4xl font-black text-primary/15">{i + 1}</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background/60">
            <Icon className="h-5 w-5 text-primary" />
          </span>
          <h3 className="mt-5 text-lg font-bold tracking-[0.06em] text-foreground">{title}</h3>
          <p className="mt-2 text-lg leading-snug text-muted-foreground">{text}</p>
        </motion.li>
      ))}
    </ol>

    <SkillCard />
  </section>
);

export default HowItWorks;

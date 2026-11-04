import { motion } from 'framer-motion';
import { Clock, Ticket, Users } from 'lucide-react';
import { JOIN_URL, formatAmount, type ArenaRoom } from '@/lib/arenaApi';
import PrizeList from './PrizeList';

const RoomCard = ({ room, index }: { room: ArenaRoom; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="glass-card flex flex-col gap-5 rounded-lg p-6"
  >
    <h3 className="text-xl font-bold text-foreground">{room.name}</h3>

    <dl className="grid grid-cols-3 gap-2 text-center">
      {[
        { icon: Clock, label: 'ROUND', value: `${room.roundMinutes} min` },
        { icon: Users, label: 'PLAYERS', value: `Up to ${room.maxPlayers}` },
        { icon: Ticket, label: 'TICKET', value: `${formatAmount(room.ticketDoge)} DOGE` },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-md border border-primary/15 px-2 py-3">
          <Icon className="mx-auto h-4 w-4 text-primary" />
          <dt className="mt-1 font-display text-[10px] tracking-[0.15em] text-muted-foreground">{label}</dt>
          <dd className="text-base font-semibold text-foreground">{value}</dd>
        </div>
      ))}
    </dl>

    <PrizeList prizes={room.prizesDoge} />

    <a
      href={JOIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold mt-auto rounded-md px-6 py-3 text-center font-display text-xs font-bold tracking-[0.18em]"
    >
      JOIN AND PLAY
    </a>
  </motion.article>
);

export default RoomCard;

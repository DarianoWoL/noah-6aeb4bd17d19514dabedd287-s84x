import { useArenaData } from '@/hooks/useArenaData';
import HallOfFame from './HallOfFame';
import OpenTournaments from './OpenTournaments';

/** One poller feeds both live sections so the endpoint is hit once per 30 s. */
const LiveArena = () => {
  const { data, status } = useArenaData();
  return (
    <>
      <OpenTournaments rooms={data?.rooms ?? null} status={status} />
      <HallOfFame ranking={data?.ranking ?? null} status={status} />
    </>
  );
};

export default LiveArena;

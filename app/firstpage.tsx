import AnimeCard from '@/components/AnimeCard';
import { fetchAnime } from './action';

export default async function FirstPage() {
  const { data } = await fetchAnime(1);
  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {data.map((item) => (
        <AnimeCard
          key={item.mal_id}
          anime={item}
          index={item.animation_index}
        />
      ))}
    </section>
  );
}

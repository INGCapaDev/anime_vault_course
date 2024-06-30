'use client';
import { AnimeData, fetchAnime } from '@/app/action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AnimeCard from './AnimeCard';

type AnimeDataWithIndex = AnimeData & { animation_index: number };

let page = 2;
function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeDataWithIndex[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (inView && !isFinished) {
      fetchAnime(page).then((res) => {
        setData((prev) => [...prev, ...res.data]);
        page++;
        if (res.pagination.last_visible_page === page - 1) {
          setIsFinished(true);
        }
      });
    }
  }, [inView, isFinished]);

  return (
    <>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {data.map((item) => (
          <AnimeCard
            key={item.mal_id}
            anime={item}
            index={item.animation_index}
          />
        ))}
      </section>
      <section className='flex justify-center items-center w-full'>
        {isFinished ? (
          <p className='text-white text-lg font-semibold'>
            You have reached the end!
          </p>
        ) : (
          <div ref={ref}>
            <Image
              src='./spinner.svg'
              alt='spinner'
              width={56}
              height={56}
              className='object-contain'
            />
          </div>
        )}
      </section>
    </>
  );
}

export default LoadMore;

import { Suspense } from 'react';
import LoadMore from '../components/LoadMore';
import FirstPage from './firstpage';

const fallbackChildren = Array.from({ length: 8 }).map((_, index) => (
  <div className='max-w-sm relative w-full gap-4 flex flex-col' key={index}>
    <div className='w-full rounded-xl h-[37vh] bg-gray-800 animate-pulse'></div>
    <div className='w-full h-6 rounded-xl bg-gray-800 animate-pulse'></div>
    <div className='w-full flex gap-3'>
      <div className='w-1/5 rounded-xl h-6 bg-gray-800 animate-pulse'></div>
      <div className='w-1/5 rounded-xl h-6 bg-gray-800 animate-pulse'></div>
    </div>
  </div>
));

const fallback = (
  <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
    {fallbackChildren}
  </section>
);

function Home() {
  return (
    <main className='sm:p-16 py-16 px-8 flex flex-col gap-10'>
      <h2 className='text-3xl text-white font-bold'>Explore Anime</h2>

      <Suspense fallback={fallback}>
        <FirstPage />
      </Suspense>

      <LoadMore />
    </main>
  );
}

export default Home;

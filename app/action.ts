'use server';

export type AnimeData = {
  mal_id: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  title: string;
  score: number;
  rank: number;
  type: string;
  episodes: number;
};

const BASE_URL = 'https://api.jikan.moe/v4/anime' as const;

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    BASE_URL + `?page=${page}&limit=8&order_by=popularity`
  );

  const { data, pagination } = await response.json();

  return {
    data: data.map((item: AnimeData, index: number) => ({
      ...item,
      animation_index: index,
    })),
    pagination,
  } as {
    data: (AnimeData & { animation_index: number })[];
    pagination: {
      last_visible_page: number;
      has_next_page: boolean;
      current_page: number;
    };
  };
};

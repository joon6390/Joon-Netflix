import { useEffect, useMemo, useRef, useState } from "react";
import { axiosInstance } from "../../api/axios";
import MovieList from "./MovieList";
import { useInView } from "react-intersection-observer";
import { useMovieStore } from "../../store/movieStore";

type Props = {
  endpoint: "popular" | "top_rated";
  title: string;
};

export default function InfiniteCategory({ endpoint, title }: Props) {
  const [data, setData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const canLoadMoreRef = useRef(true);

  const term = useMovieStore((state) => state.term);
  const keyword = term.trim();

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    canLoadMoreRef.current = true;
  }, [endpoint, keyword]);

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: (inView: boolean) => {
      if (!inView) {
        canLoadMoreRef.current = true;
        return;
      }

      if (!canLoadMoreRef.current || loading || !hasMore || data.length === 0) {
        return;
      }

      canLoadMoreRef.current = false;
      setPage((prevPage) => prevPage + 1);
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = keyword
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
          : `/${endpoint}?page=${page}`;

        const {
          data: { results, total_pages },
        } = await axiosInstance.get(url, { signal });

        setHasMore(page < total_pages);
        if (page === 1) setData(results);
        else setData((data) => [...data, ...results]);
      } catch (e) {
        if (e instanceof Error && e.name !== "CanceledError") setError(e);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchMovie();
    return () => controller.abort();
  }, [page, endpoint, keyword]);

  const view = useMemo(
    () => ({
      title,
      movies: data,
      loading,
      error,
    }),
    [title, data, loading, error],
  );

  return (
    <>
      <MovieList {...view} />
      <div ref={ref}></div>
    </>
  );
}

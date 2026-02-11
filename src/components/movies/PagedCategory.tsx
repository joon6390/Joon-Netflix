import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { useMovieStore } from "../../store/movieStore";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

type Props = {
  endpoint: "now_playing" | "upcoming";
  title: string;
};

export default function PagedCategory({ endpoint, title }: Props) {
  const term = useMovieStore((state) => state.term);
  const currentPage = useMovieStore((state) => state.currentPage);
  const keyword = term.trim();

  const [data, setData] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = keyword
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&page=${currentPage}`
          : `/${endpoint}?page=${currentPage}`;

        const {
          data: { results, total_pages },
        } = await axiosInstance.get(url, { signal });

        setData(results);
        setTotalPages(total_pages);
      } catch (e) {
        if (e instanceof Error && e.name !== "CanceledError") setError(e);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchMovie();
    return () => controller.abort();
  }, [endpoint, currentPage, keyword]);

  const view = useMemo(
    () => ({
      title,
      movies: data,
      loading,
      error,
      totalPages,
    }),
    [title, data, loading, error, totalPages],
  );

  return (
    <>
      <MovieList {...view} />
      <Pagination totalPages={totalPages} />
    </>
  );
}

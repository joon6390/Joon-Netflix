import { useState } from "react";
import MovieHeader from "./MovieHeader";
import MovieMain from "./MovieMain";
import MovieFooter from "./MovieFooter";
import MovieSearch from "./MovieSearch";
import MovieCategory from "./MovieCategory";
import { useMovieStore } from "../../store/movieStore";
import PagedCategory from "./PagedCategory";
import InfiniteCategory from "./InfiniteCategory";

export type CategoryKey = "now_playing" | "popular" | "top_rated" | "upcoming";

const CATEGORY_META: Record<
  CategoryKey,
  { title: string; mode: "paged" | "infinite" }
> = {
  now_playing: { title: "현재 상영작", mode: "paged" },
  upcoming: { title: "개봉 예정작", mode: "paged" },
  top_rated: { title: "높은 평점 순", mode: "infinite" },
  popular: { title: "인기 순", mode: "infinite" },
};

export default function Movie() {
  const [active, setActive] = useState<CategoryKey>("now_playing");
  const setCurrentPages = useMovieStore((state) => state.setCurrentPages);

  const handleChangeCategory = (key: CategoryKey) => {
    if (key === active) return;
    setActive(key);

    if (CATEGORY_META[key].mode === "paged") {
      setCurrentPages(1);
    }
  };

  const { title, mode } = CATEGORY_META[active];

  return (
    <>
      <MovieHeader />
      <MovieMain />
      <MovieSearch />
      <MovieCategory active={active} onChange={handleChangeCategory} />
      {mode === "paged" ? (
        <PagedCategory
          endpoint={active as "now_playing" | "upcoming"}
          title={title}
        />
      ) : (
        <InfiniteCategory
          endpoint={active as "popular" | "top_rated"}
          title={title}
        />
      )}
      <MovieFooter />
    </>
  );
}

import { star, thumbnail01 } from "../../assets/movies/assets";

export default function MovieListItem({
  id,
  title,
  vote_average,
  release_date,
  poster_path,
}: MovieType) {
  const posterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : thumbnail01;

  return (
    <a
      href={`https://www.themoviedb.org/movie/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      aria-label={`${title} TMDB 상세 페이지로 이동`}
    >
      <div className="transition-transform duration-200 group-hover:scale-[1.01] p-2">
        <img
          src={posterSrc}
          alt={title}
          className="rounded-md w-full"
          loading="lazy"
        />

        <div className="flex justify-between items-center font-bold mt-4 mb-2 text-lg">
          <h4 className="line-clamp-1 group-hover:underline">{title}</h4>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-200">
          <div className="flex items-center gap-2 font-bold">
            <img
              src={star}
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <span className="text-yellow-500">
              {Number(vote_average).toFixed(1)}
            </span>
          </div>

          <span className="text-rose-300 font-bold">{release_date}</span>
        </div>
      </div>
    </a>
  );
}

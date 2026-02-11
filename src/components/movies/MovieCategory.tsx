type CategoryKey = "now_playing" | "popular" | "top_rated" | "upcoming";

const categories: { key: CategoryKey; label: string }[] = [
  { key: "now_playing", label: "현재 상영" },
  { key: "upcoming", label: "개봉 예정" },
  { key: "top_rated", label: "높은 평점" },
  { key: "popular", label: "인기" },
];

export default function MovieCategory({
  active,
  onChange,
}: {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}) {
  return (
    <div className="bg-black">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-0">
        <div className="flex flex-wrap justify-center gap-2 py-3 sm:gap-3 sm:py-6">
          {categories.map((c) => {
            const isActive = active === c.key;

            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onChange(c.key)}
                className={[
                  "w-20 sm:w-32 h-8 sm:h-10",
                  "inline-flex items-center justify-center whitespace-nowrap",
                  "rounded-md border font-semibold transition",
                  "text-[10px] sm:text-xs text-white",
                  "focus:outline-none focus:ring-2 focus:ring-rose-400/60",
                  isActive
                    ? "border-white/40 bg-rose-400/20"
                    : "border-white/30 hover:bg-rose-400/10",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

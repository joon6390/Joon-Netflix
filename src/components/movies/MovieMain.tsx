import { banner_bg01 } from "../../assets/movies/assets";

export default function MovieMain() {
  return (
    <>
      <article>
        <section
          className="h-screen max-h-[60vh] bg-cover bg-center bg-no-repeat flex items-center px-4"
          style={{ backgroundImage: `url(${banner_bg01})` }}
        >
          <div className="container mx-auto poppins text-white flex flex-col justify-center font-bold h-full">
            <h3 className="text-[16px] xs:text-[20px] sm:text-[24px] text-yellow-300">
              TODAY
            </h3>
            <h2 className="text-[25px] xs:text-[40px] sm:text-[60px] mb-4">
              Unlimited <span className="text-yellow-500">Movie</span> &
              <br />
              <span className="text-rose-500">Infinite </span>TV Show
            </h2>
            <p className="text-xl sm:text-2xl">
              전 세계 모든 영화를 한곳에서 확인하세요.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

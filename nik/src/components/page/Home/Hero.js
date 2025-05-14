import ImageComponent from "@/components/micro/ImageComponent";
import Link from "next/link";

function Hero() {
  return (
    <section
      className={`bg-amber-white h-[70vh] flex justify-center items-start bg-cover bg-bottom bg-[url('/img/hero.jpg')]`}
      style={{ backgroundImage: "url('/img/hero_1.png')" }}
    >
      <div className="w-1/2 flex flex-col items-center">
        <ImageComponent
          src="/img/logo.png"
          className="w-[500px] h-48 mt-20"
          alt="Logo"
        />
        <p className="text-center text-primary font-medium">
          Dari tangan para pengrajin lahir motif yang bicara — tentang sejarah,
          harapan, dan keindahan. Inilah batik, warisan budaya yang terus hidup
          dalam langkah dan gaya modern kita.
        </p>
        <Link
          className="bg-primary text-white px-10 rounded-md py-2 mt-4"
          href="/klasifikasi"
        >
          Temukan Jenis Batik
        </Link>
      </div>
    </section>
  );
}

export default Hero;

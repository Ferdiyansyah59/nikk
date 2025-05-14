import SectionSubtitle from "@/components/micro/SectionSubtitle";
import Link from "next/link";

function Article() {
  const data = [
    {
      title: "Pelestarian Batik Nusantara",
      img: "/img/category/bali.png",
      excerpt:
        "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    },
    {
      title: "Batik Menjadi Komoditas Idnoesia Raya Merdeka Merdeka",
      img: "/img/category/kraton.png",
      excerpt:
        "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    },
    {
      title: "Batik Betawi Adalah Dari Jakarta",
      img: "/img/category/betawi.png",
      excerpt:
        "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    },
    {
      title: "Batik Pekalongan Asal Pekalongan",
      img: "/img/category/pekalongan.png",
      excerpt:
        "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    },
  ];

  return (
    <section className="mx-40 my-20">
      <div className="flex justify-between">
        <SectionSubtitle title="Sesuatu Tentang Batik Kita" />
        <Link href="/" className="underline text-primary">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-3">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#FFF8E7] border-2 border-[#ece3ca] gap-2 rounded-md"
          >
            <div
              style={{
                backgroundImage: `url(${item.img})`,
              }}
              className="h-40 w-full"
            ></div>
            <div className="p-5 flex flex-col justify-between">
              <div>
                <h1 className="font-semibold">{item.title}</h1>
                <p className="text-sm">{item.excerpt}</p>
              </div>
              <Link className="underline text-sm mt-2" href="/">
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Article;

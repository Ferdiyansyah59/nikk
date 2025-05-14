import Description from '@/components/micro/Description';
import ImageComponent from '@/components/micro/ImageComponent';
import SectionSubtitle from '@/components/micro/SectionSubtitle';
import Link from 'next/link';

function Category() {
  const data = [
    {
      title: 'Batik Bali',
      img: '/img/category/bali.png',
      color: 'indigo',
      description:
        'Motif yang terinspirasi dari alam dan kehidupan spiritual Bali dengan warna-warna cerah dan vibran.',
    },
    {
      title: 'Batik Kraton',
      img: '/img/category/kraton.png',
      color: 'amber',
      description:
        'Batik klasik keraton dengan filosofi mendalam, didominasi warna sogan (coklat) dengan motif geometris.',
    },
    {
      title: 'Batik Betawi',
      img: '/img/category/betawi.png',
      color: 'red',
      description:
        'Motif khas budaya Betawi dengan warna cerah seperti merah dan kuning, mencerminkan keberagaman Jakarta.',
    },
    {
      title: 'Batik Pekalongan',
      img: '/img/category/pekalongan.png',
      color: 'blue',
      description:
        'Batik pesisir dengan pengaruh multi-budaya, terkenal dengan warna-warna cerah dan motif flora yang indah.',
    },
    {
      title: 'Batik Parang',
      img: '/img/category/parang.png',
      color: 'slate',
      description:
        'Salah satu motif tertua dengan pola diagonal yang melambangkan kesinambungan dan keseimbangan hidup.',
    },
  ];

  // Membuat mapping warna custom untuk akurasi warna yang lebih baik
  const colorMap = {
    indigo: {
      border: 'border-indigo-500',
      accent: 'border-t-indigo-500/20',
      bg: 'bg-indigo-500',
      text: 'bg-indigo-600/90',
    },
    amber: {
      border: 'border-amber-500',
      accent: 'border-t-amber-500/20',
      bg: 'bg-amber-500',
      text: 'bg-amber-600/90',
    },
    red: {
      border: 'border-red-500',
      accent: 'border-t-red-500/20',
      bg: 'bg-red-500',
      text: 'bg-red-600/90',
    },
    blue: {
      border: 'border-blue-500',
      accent: 'border-t-blue-500/20',
      bg: 'bg-blue-500',
      text: 'bg-blue-600/90',
    },
    slate: {
      border: 'border-slate-500',
      accent: 'border-t-slate-500/20',
      bg: 'bg-slate-500',
      text: 'bg-slate-600/90',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Kategori Batik Kita
        </h2>

        <a
          href="#"
          className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
        >
          Lihat Semua
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-lg bg-white border-b-2 ${colorMap[item.color].border} shadow-sm hover:shadow-md transition-all duration-300 h-64`}
          >
            <div
              className={`absolute top-0 right-0 w-0 h-0 ${colorMap[item.color].accent} border-l-[50px] border-l-transparent z-10`}
            ></div>
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Blok teks dengan background solid */}
            <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <div className={`${colorMap[item.color].text} p-4`}>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </div>

            {/* Title yang akan menghilang saat hover */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center bg-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-medium">{item.title}</h3>
              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 ${colorMap[item.color].bg}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;

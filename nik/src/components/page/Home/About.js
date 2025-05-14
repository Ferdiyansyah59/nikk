import Description from "@/components/micro/Description";
import ImageComponent from "@/components/micro/ImageComponent";
import SectionTitle from "@/components/micro/SectionTitle";

function About() {
    return ( 
        <section className="flex justify-around mx-40 gap-20 my-20">
            <ImageComponent src="/img/about.png" className="w-96" alt="Home About" />
            <div className="w-1/2">
                <SectionTitle title="Tentang Batik Kita" />
                <Description className="mt-3 text-justify" text="Batik adalah kain bergambar yang dibuat dengan teknik pewarnaan khusus menggunakan malam (lilin) untuk membentuk motif. Lebih dari sekadar seni, batik adalah bagian dari identitas budaya Indonesia — setiap pola dan warna mengandung makna, filosofi, dan sejarah yang kaya. Dari upacara adat hingga busana sehari-hari, batik telah menjadi simbol keanggunan dan kebanggaan nusantara." />
            </div>
        </section>
     );
}

export default About;
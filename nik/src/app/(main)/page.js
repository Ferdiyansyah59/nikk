// import Image from "next/image";
// import styles from "./page.module.css";
// import About from "@/components/page/Home/About";
import About from "@/components/page/Home/About";
import Article from "@/components/page/Home/Article";
import Category from "@/components/page/Home/Category";
import Hero from "@/components/page/Home/Hero";

export default function Home() {
  return (
    <section>
      <Hero />
      <About />
      <Category />
      <Article />
    </section>
  );
}

import Link from "next/link";
import ImageComponent from "../micro/ImageComponent";

function Footer() {
  return (
    <footer className="bg-[#FFF8E7]">
      <div className="flex flex-col items-center justify-center py-10">
        <ImageComponent src="/img/logo.png" className="w-60" alt="logo" />
        <div className="flex gap-5 mt-3">
          <Link className="underline" href="/">
            Home
          </Link>
          <Link className="underline" href="/">
            Article
          </Link>
          <Link className="underline" href="/">
            Shop
          </Link>
        </div>
      </div>
      <div className="py-5 mx-20 border-t border-[#d7ceb9]">
        <p className="text-center">&copy;Ferdiyansyah - 2025</p>
      </div>
    </footer>
  );
}

export default Footer;

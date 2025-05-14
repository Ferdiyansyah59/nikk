'use client';

import Link from 'next/link';
import ImageComponent from '../micro/ImageComponent';
function Nav() {
  return (
    <nav className="flex justify-between items-center bg-[#FFF8E7] text-primary text-lg font-medium px-20 py-4">
      <Link href="/">
        <ImageComponent src="/img/logo_nav.png" className="w-32" alt="logo" />
      </Link>
      <section className="flex items-center gap-10">
        <Link href="/">Home</Link>
        <Link href="/articles">Article</Link>
        <Link href="/">Shop</Link>
        <Link href="/forum">Forum</Link>
        <Link
          className="bg-primary text-white rounded-md px-10 py-2"
          href="/login"
        >
          Login
        </Link>
      </section>
    </nav>
  );
}

export default Nav;

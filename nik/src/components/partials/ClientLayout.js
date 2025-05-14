'use client'; // Wajib karena menggunakan useEffect

// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const ClientLayout = ({ children }) => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: false,
//     });
//   }, []);

  return <>{children}</>;
};

export default ClientLayout;
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuHamburger = () => {
  const router = useRouter();
  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/adjustments', label: 'Adjustments', icon: '⚙️' },
    { href: '/reports', label: 'Reports', icon: '📊' },
    { href: '/rules', label: 'Rules', icon: '📜' },
    { href: '/generated-files', label: 'Generated Files', icon: '📂' },
  ];

  return (
    <nav className="w-20 bg-[#375A7F] text-white flex flex-col items-center py-4">
      {links.map(({ href, label, icon }) => (
        <Link key={href} href={href} title={label} className={`mb-4 p-2 w-full text-center rounded-md ${router.pathname === href ? 'bg-[#52CEE6]' : ''} hover:bg-[#52CEE6]`}>
          {icon}
        </Link>
      ))}
    </nav>
  );
};

export default MenuHamburger;

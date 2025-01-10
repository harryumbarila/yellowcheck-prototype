import React from 'react';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/adjustments', label: 'Adjustments', icon: '⚙️' },
    { href: '/reports', label: 'Reports', icon: '📊' },
    { href: '/rules', label: 'Rules', icon: '📜' },
    { href: '/generated-files', label: 'Generated Files', icon: '📂' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú lateral */}
      <nav className="w-28 bg-[#375A7F] text-white flex flex-col items-center py-4">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            title={label}
            className="mb-6 p-3 w-full text-center rounded-md hover:bg-[#52CEE6] focus:bg-[#52CEE6] transition-all"
          >
            <span className="text-xl">{icon}</span>
          </Link>
        ))}
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Renderizar contenido */}
        {children}
      </div>
    </div>
  );
};

export default Layout;

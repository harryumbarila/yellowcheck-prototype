import React from 'react';
import { useRouter } from 'next/router';

const Breadcrumbs: React.FC = () => {
  const router = useRouter();
  const pathSegments = router.pathname.split('/').filter(Boolean);

  return (
    <nav className="text-gray-600 mb-4">
      {pathSegments.length > 0 ? (
        <ul className="flex items-center space-x-2">
          {pathSegments.map((segment, index) => (
            <li key={index} className="flex items-center">
              <span>{segment.charAt(0).toUpperCase() + segment.slice(1)}</span>
              {index < pathSegments.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ul>
      ) : (
        <span>Home</span>
      )}
    </nav>
  );
};

export default Breadcrumbs;

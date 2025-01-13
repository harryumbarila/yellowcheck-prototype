import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    alert("Logged out successfully!");
    router.push("/login");
  };

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/adjustments", label: "Adjustments", icon: "⚙️" },
    { href: "/reports", label: "Reports", icon: "📊" },
    { href: "/rules", label: "Rules", icon: "📜" },
    { href: "/generated-files", label: "Generated Files", icon: "📁" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-24 bg-gray-800 text-white flex flex-col justify-between items-center py-4">
        <div className="flex flex-col items-center gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="cursor-pointer p-2 text-center hover:bg-gray-700 rounded">
                <span className="text-2xl">{link.icon}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-10 h-10 flex justify-center items-center"
          title="Log Out"
        >
          🚪
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;

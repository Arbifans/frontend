import { Home, Compass, Bookmark, MessageCircle, DollarSign, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', page: 'home' },
    { icon: Compass, label: 'Discover', page: 'discover' },
    { icon: MessageCircle, label: 'Messages', page: 'messages' },
    { icon: Bookmark, label: 'Bookmarks', page: 'bookmarks' },
    { icon: DollarSign, label: 'Creator Studio', page: 'register' },
    { icon: Compass, label: 'Gallery', page: 'assets' },
    { icon: BarChart3, label: 'My Assets', page: 'my-assets' },
    { icon: Settings, label: 'Settings', page: 'settings' },
  ];

  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-gray-800 min-h-screen sticky top-16 px-4 py-6">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActivePage(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activePage === item.page
              ? 'bg-gradient-to-r from-blue-600 to-pink-600 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-lg border border-blue-500/30">
        <h3 className="mb-2">Become a Creator</h3>
        <p className="text-sm text-gray-400 mb-3">
          Start earning from your content today
        </p>
        <button className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          Get Started
        </button>
      </div>
    </aside>
  );
}
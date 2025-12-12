import { Search, Bell, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">ArbiFans</h1>
        </Link>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search creators..."
            className="bg-gray-100 border border-transparent rounded-full pl-10 pr-4 py-2 w-80 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 placeholder-gray-500 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton showBalance={false} />
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-gray-900">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#12AAFF] rounded-full ring-2 ring-white"></span>
        </button>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-gray-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
        </button>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white shadow-sm hover:shadow-md transition"
        />
      </div>
    </div>
  );
}

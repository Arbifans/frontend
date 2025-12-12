import { Search, Bell, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function TopBar() {
  return (
    <div className="bg-[#0f0f0f] border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">OnlyFans</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search creators..."
            className="bg-[#1a1a1a] border border-gray-800 rounded-full pl-10 pr-4 py-2 w-80 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <button className="relative p-2 hover:bg-gray-800 rounded-full transition">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="relative p-2 hover:bg-gray-800 rounded-full transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-blue-500"
        />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { CreatorConversationList } from './CreatorConversationList';
import { CreatorMessageThread } from './CreatorMessageThread';

export interface CreatorConversation {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  totalTips: number;
  lastTipAmount?: number;
}

export function CreatorChat() {
  const conversations: CreatorConversation[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      username: '@alexj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Love your content! Keep it up!',
      timestamp: '2m ago',
      unread: 2,
      isOnline: true,
      totalTips: 250,
      lastTipAmount: 20,
    },
    {
      id: 2,
      name: 'Michael Chen',
      username: '@mikechen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      lastMessage: 'Can you share more behind the scenes?',
      timestamp: '15m ago',
      unread: 0,
      isOnline: true,
      totalTips: 180,
      lastTipAmount: 15,
    },
    {
      id: 3,
      name: 'David Martinez',
      username: '@davidm',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      lastMessage: 'Thank you for the exclusive content!',
      timestamp: '1h ago',
      unread: 1,
      isOnline: false,
      totalTips: 420,
      lastTipAmount: 50,
    },
    {
      id: 4,
      name: 'Ryan Thompson',
      username: '@rthompson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      lastMessage: 'This is amazing! 🔥',
      timestamp: '3h ago',
      unread: 0,
      isOnline: true,
      totalTips: 95,
      lastTipAmount: 10,
    },
    {
      id: 5,
      name: 'James Wilson',
      username: '@jameswilson',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
      lastMessage: 'Your work inspires me so much',
      timestamp: '1d ago',
      unread: 0,
      isOnline: false,
      totalTips: 310,
      lastTipAmount: 25,
    },
  ];

  const [activeConversation, setActiveConversation] = useState<CreatorConversation>(conversations[0]);

  return (
    <div className="flex h-[calc(100vh-4rem)] border-x border-gray-200 bg-white">
      <CreatorConversationList
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
      />
      <CreatorMessageThread conversation={activeConversation} />
    </div>
  );
}

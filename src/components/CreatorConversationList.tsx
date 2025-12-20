import { Search, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreatorConversation } from './CreatorChat';

interface CreatorConversationListProps {
  conversations: CreatorConversation[];
  activeConversation: CreatorConversation;
  setActiveConversation: (conversation: CreatorConversation) => void;
}

export function CreatorConversationList({
  conversations,
  activeConversation,
  setActiveConversation
}: CreatorConversationListProps) {
  return (
    <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
      {/* Header with Stats */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl mb-3 font-semibold text-gray-900">Messages</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-gray-100 border border-transparent rounded-full pl-10 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setActiveConversation(conversation)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition border-b border-gray-100 ${activeConversation.id === conversation.id ? 'bg-blue-50' : ''
              }`}
          >
            <div className="relative flex-shrink-0">
              <ImageWithFallback
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="truncate font-medium text-gray-900">{conversation.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <span className="flex-shrink-0 ml-2 w-5 h-5 bg-[#12AAFF] rounded-full text-xs text-white flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full">
                  <DollarSign className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">{conversation.totalTips}</span>
                </div>
                {conversation.lastTipAmount && conversation.lastTipAmount >= 20 && (
                  <span className="text-xs text-amber-500 font-medium">💎 VIP</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
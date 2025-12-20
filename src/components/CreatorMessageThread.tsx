import { useState } from 'react';
import { MoreVertical, Phone, Video, Send, Image, Smile, DollarSign, Heart, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreatorConversation } from './CreatorChat';

interface Message {
  id: number;
  sender: 'me' | 'them';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'tip';
  amount?: string;
}

interface CreatorMessageThreadProps {
  conversation: CreatorConversation;
}

export function CreatorMessageThread({ conversation }: CreatorMessageThreadProps) {
  const [messageText, setMessageText] = useState('');

  const messages: Message[] = [
    {
      id: 1,
      sender: 'them',
      content: 'Hi! I just subscribed and I love your content! 😍',
      timestamp: '10:15 AM',
      type: 'text',
    },
    {
      id: 2,
      sender: 'them',
      content: '$20',
      timestamp: '10:16 AM',
      type: 'tip',
      amount: '$20.00',
    },
    {
      id: 3,
      sender: 'me',
      content: 'Thank you so much! That means the world to me! 💕',
      timestamp: '10:18 AM',
      type: 'text',
    },
    {
      id: 4,
      sender: 'them',
      content: 'Love your content! Keep it up!',
      timestamp: '10:20 AM',
      type: 'text',
    },
    {
      id: 5,
      sender: 'me',
      content: 'I really appreciate your support! Check out my latest post, I think you\'ll love it! 🔥',
      timestamp: '10:22 AM',
      type: 'text',
    },
    {
      id: 6,
      sender: 'them',
      content: '$15',
      timestamp: '10:25 AM',
      type: 'tip',
      amount: '$15.00',
    },
    {
      id: 7,
      sender: 'them',
      content: 'Just checked it out! Amazing as always! 🌟',
      timestamp: '10:26 AM',
      type: 'text',
    },
  ];

  const conversationTotalTips = messages
    .filter((m) => m.type === 'tip' && m.sender === 'them')
    .reduce((sum, m) => sum + parseFloat(m.amount?.replace('$', '') || '0'), 0);

  const handleSend = () => {
    if (messageText.trim()) {
      // Handle send message
      setMessageText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src={conversation.avatar}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
              />
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{conversation.name}</span>
                <span className="text-xs text-gray-500">{conversation.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-500 font-medium">
                  {conversation.isOnline ? 'Active now' : 'Offline'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">${conversationTotalTips} earned</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
              {message.type === 'text' && (
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm ${message.sender === 'me'
                      ? 'bg-[#12AAFF] text-white'
                      : 'bg-gray-100 text-gray-900'
                    }`}
                >
                  <p>{message.content}</p>
                </div>
              )}
              {message.type === 'tip' && message.sender === 'them' && (
                <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">Tip received</span>
                  </div>
                  <p className="text-xl text-green-600 font-bold">{message.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">Say thanks to show appreciation</p>
                </div>
              )}
              <span className="text-xs text-gray-400 mt-1 block px-2">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies (for tips) */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2 font-medium">Quick replies</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap transition shadow-sm">
            Thank you! 💕
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap transition shadow-sm">
            You're the best! 🥰
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap transition shadow-sm">
            Check my new post! 🔥
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap transition shadow-sm">
            More coming soon! ✨
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600">
            <Heart className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 border border-transparent rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 placeholder-gray-500 transition-all"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-[#12AAFF] text-white rounded-full hover:bg-blue-600 transition shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

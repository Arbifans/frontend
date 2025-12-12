import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { StoriesBar } from './components/StoriesBar';
import { Feed } from './components/Feed';
import { SuggestionsPanel } from './components/SuggestionsPanel';
import { Discover } from './components/Discover';
import { Chat } from './components/Chat';
import { Bookmarks } from './components/Bookmarks';
import { CreatorRegistration } from './components/CreatorRegistration';
import { AssetSubmission } from './components/AssetSubmission';
import { AssetList } from './components/AssetList';
import { AssetDetail } from './components/AssetDetail';
import { storage } from './services/storage';
import { useEffect, useState } from 'react';
import { Earnings } from './components/Earnings';
import { motion, AnimatePresence } from 'framer-motion';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: any) => setSelectedAssetId(e.detail);
    window.addEventListener('route-asset-detail', handler);
    return () => window.removeEventListener('route-asset-detail', handler);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    duration: 0.4
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-black text-white">
            <TopBar />
            <div className="flex">
              <Sidebar activePage={activePage} setActivePage={setActivePage} />
              <main className="flex-1 flex">
                <div className="flex-1 max-w-3xl mx-auto overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activePage === 'home' && (
                      <motion.div
                        key="home"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <StoriesBar />
                        <Feed />
                      </motion.div>
                    )}
                    {activePage === 'discover' && (
                      <motion.div
                        key="discover"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Discover />
                      </motion.div>
                    )}
                    {activePage === 'messages' && (
                      <motion.div
                        key="messages"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Chat />
                      </motion.div>
                    )}
                    {activePage === 'bookmarks' && (
                      <motion.div
                        key="bookmarks"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Bookmarks />
                      </motion.div>
                    )}
                    {activePage === 'register' && (
                      <motion.div
                        key="register"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        {/* This is a wrapper to handle the sub-navigation between register and submit */}
                        <div className="space-y-4">
                          <CreatorRegistration onSuccess={() => setActivePage('submit-asset')} />
                          <div className="flex justify-center">
                            <button onClick={() => setActivePage('submit-asset')} className="text-sm text-gray-400 hover:text-white">
                              Already registered? Submit an asset
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activePage === 'submit-asset' && (
                      <motion.div
                        key="submit-asset"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <AssetSubmission
                          onSuccess={() => setActivePage('assets')}
                          onRedirectToRegister={() => setActivePage('register')}
                        />
                      </motion.div>
                    )}
                    {activePage === 'assets' && (
                      <motion.div
                        key="assets"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <AssetList onAssetClick={(id) => {
                          window.dispatchEvent(new CustomEvent('route-asset-detail', { detail: id }));
                          setActivePage('asset-detail');
                        }} />
                      </motion.div>
                    )}
                    {activePage === 'my-assets' && (
                      <motion.div
                        key="my-assets"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <AssetList
                          creatorId={Number(storage.getCreatorId()) || 0}
                          onAssetClick={(id) => {
                            window.dispatchEvent(new CustomEvent('route-asset-detail', { detail: id }));
                            setActivePage('asset-detail');
                          }}
                        />
                      </motion.div>
                    )}
                    {activePage === 'asset-detail' && selectedAssetId && (
                      <motion.div
                        key="asset-detail"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <AssetDetail id={selectedAssetId} onBack={() => setActivePage('assets')} />
                      </motion.div>
                    )}
                    {activePage === 'earnings' && (
                      <motion.div
                        key="earnings"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <Earnings />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {activePage !== 'messages' && activePage !== 'bookmarks' && activePage !== 'earnings' && <SuggestionsPanel />}
              </main>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
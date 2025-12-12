import { useState, useEffect } from 'react';
import { api, Asset } from '../services/api';
import { motion } from 'framer-motion';

interface AssetListProps {
    onAssetClick: (id: number) => void;
    creatorId?: number; // Optional filter
}

export function AssetList({ onAssetClick, creatorId }: AssetListProps) {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            const data = await api.getAssets();
            if (creatorId) {
                setAssets(data.filter(a => a.creatorId === creatorId));
            } else {
                setAssets(data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load assets');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg m-4">
                {error}
                <button
                    onClick={loadAssets}
                    className="ml-4 underline hover:text-red-400"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">
                {creatorId ? 'My Assets' : 'Latest Assets'}
            </h2>
            <div className="grid gap-4">
                {assets.map((asset) => (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => onAssetClick(asset.id)}
                        className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-700 transition"
                    >
                        <div className="aspect-video bg-gray-900 rounded-lg mb-3 overflow-hidden">
                            {/* Fallback for image since we only have a URL that might not be an image */}
                            <div className="w-full h-full flex items-center justify-center text-gray-600 bg-[#0f0f0f]">
                                {asset.url && (asset.url.match(/\.(jpeg|jpg|gif|png)$/) != null) ? (
                                    <img src={asset.url} alt={asset.description} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sm break-all p-4">{asset.url}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-300 line-clamp-2 text-sm">{asset.description}</p>
                                <div className="mt-2 text-xs text-blue-400">Creator #{asset.creatorId}</div>
                            </div>
                            <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                {asset.price} ETH
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

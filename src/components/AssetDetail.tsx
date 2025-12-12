import { useState, useEffect } from 'react';
import { api, Asset } from '../services/api';
import { ArrowLeft } from 'lucide-react';

interface AssetDetailProps {
    id: number;
    onBack: () => void;
}

export function AssetDetail({ id, onBack }: AssetDetailProps) {
    const [asset, setAsset] = useState<Asset | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAsset();
    }, [id]);

    const loadAsset = async () => {
        try {
            const data = await api.getAssetById(id);
            setAsset(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load asset details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
    );

    if (error || !asset) return (
        <div className="p-4">
            <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
                <ArrowLeft size={20} /> Back
            </button>
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">
                {error || 'Asset not found'}
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
                <ArrowLeft size={20} /> Back
            </button>

            <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
                <div className="aspect-video bg-[#0f0f0f] w-full flex items-center justify-center">
                    {asset.url && (asset.url.match(/\.(jpeg|jpg|gif|png)$/) != null) ? (
                        <img src={asset.url} alt={asset.description} className="w-full h-full object-contain" />
                    ) : (
                        <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all p-4 block text-center">
                            {asset.url}
                        </a>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-xl font-bold text-white mb-2">Asset #{asset.id}</h1>
                            <p className="text-gray-400 text-sm">Created by Creator #{asset.creatorId}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-pink-600 px-4 py-2 rounded-lg text-white font-bold">
                            {asset.price} ETH
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-gray-300 font-medium mb-2">Description</h3>
                        <p className="text-gray-400 whitespace-pre-wrap">{asset.description}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <button className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white py-3 rounded-lg font-medium transition">
                            Purchase to Unlock
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';

interface AssetSubmissionProps {
    onSuccess: () => void;
    onRedirectToRegister: () => void;
}

export function AssetSubmission({ onSuccess, onRedirectToRegister }: AssetSubmissionProps) {
    const [formData, setFormData] = useState({
        url: '',
        price: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const creatorId = storage.getCreatorId();
        if (!creatorId) {
            onRedirectToRegister();
        }
    }, [onRedirectToRegister]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const creatorId = storage.getCreatorId();
        if (!creatorId) {
            onRedirectToRegister();
            return;
        }

        try {
            await api.submitAsset({
                creatorId: Number(creatorId),
                url: formData.url,
                price: Number(formData.price),
                description: formData.description
            });
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to submit asset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Create New Asset</h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Asset URL
                    </label>
                    <input
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Price (ETH)
                    </label>
                    <input
                        type="number"
                        step="0.001"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Description
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                        placeholder="Describe your asset..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                >
                    {loading ? 'Creating Asset...' : 'create Asset'}
                </button>
            </form>
        </div>
    );
}

import { useState } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';

interface CreatorRegistrationProps {
    onSuccess: () => void;
}

export function CreatorRegistration({ onSuccess }: CreatorRegistrationProps) {
    const [name, setName] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.registerCreator(name, walletAddress);
            storage.saveCreatorId(response.id);
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Failed to register creator');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Become a Creator</h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Display Name
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your creator name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        required
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="0x..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                >
                    {loading ? 'Registering...' : 'Start Creating'}
                </button>
            </form>
        </div>
    );
}

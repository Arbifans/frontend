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
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Become a Creator</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                        placeholder="Enter your creator name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        required
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                        placeholder="0x..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#12AAFF] text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition shadow-md hover:shadow-lg"
                >
                    {loading ? 'Registering...' : 'Start Creating'}
                </button>
            </form>
        </div>
    );
}

import { API_BASE_URL } from '../config';

interface ApiResponse<T> {
    data: T;
    error?: string;
}

interface RegisterCreatorPayload {
    name: string;
    walletAddress: string;
}

interface RegisterCreatorResponse {
    id: number;
}

interface SubmitAssetPayload {
    creatorId: number;
    url: string;
    price: number;
    description: string;
    unlockableContent: boolean;
}

export interface Asset {
    id: number;
    creatorId: number;
    Url: string;
    price: number;
    description: string;
    unlockableContent?: boolean;
}

const headers = {
    'Content-Type': 'application/json',
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error ${response.status}: ${errorBody}`);
    }
    return response.json();
}

export const api = {
    async registerCreator(name: string, walletAddress: string): Promise<RegisterCreatorResponse> {
        const response = await fetch(`${API_BASE_URL}/api/creator/register`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, walletAddress }),
        });
        return handleResponse<RegisterCreatorResponse>(response);
    },

    async submitAsset(payload: SubmitAssetPayload): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/creator/assets`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });
        return handleResponse<void>(response);
    },

    async getAssets(): Promise<Asset[]> {
        const response = await fetch(`${API_BASE_URL}/api/creator/assets`, {
            method: 'GET',
            headers,
        });
        return handleResponse<Asset[]>(response);
    },

    async getAssetById(id: number | string): Promise<Asset> {
        const response = await fetch(`${API_BASE_URL}/api/creator/assets/${id}`, {
            method: 'GET',
            headers,
        });
        return handleResponse<Asset>(response);
    },
};

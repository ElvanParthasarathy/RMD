const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

export async function fetchNotices() {
    const response = await fetch(`${API_BASE_URL}/notices`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data;
}

export async function fetchHomeContent() {
    const response = await fetch(`${API_BASE_URL}/home`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data;
}

export async function fetchECEContent() {
    const response = await fetch(`${API_BASE_URL}/ece`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data;
}

import axios from "axios";

export async function register(formData: FormData) {
    try {
        const response = await axios.post('/api/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
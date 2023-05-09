import {useState} from "react";
//TODO: This is a placeholder, replace later
export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fetching = async (id: number) => {
        try {
            setIsLoading(true)
            await callback(id)

        } catch (e: any) {
            setError(e)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}
const useCapacitor = async () => import.meta.env.VITE_ANDROID_BUILD === '1' ? await import('./useCapacitor') : null;

export default useCapacitor;
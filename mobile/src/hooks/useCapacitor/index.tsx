import useCapacitor from './useCapacitor';

export default import.meta.env.VITE_ANDROID_BUILD === '1' ? useCapacitor : () => {};
/**
 * Safe localStorage wrapper that handles quota exceeded errors and large payload eviction
 */

export function safeGetLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function safeSetLocalStorage(key: string, value: unknown): boolean {
  try {
    const serialized = JSON.stringify(value);
    
    // Check approximate byte size before attempting to save (> 2MB is risky for localStorage)
    if (serialized.length > 2 * 1024 * 1024) {
      console.warn(`[Storage] Payload for ${key} is too large (${(serialized.length / 1024 / 1024).toFixed(2)} MB) for localStorage. Skipping local cache in favor of Firestore cloud storage.`);
      return false;
    }

    localStorage.setItem(key, serialized);
    return true;
  } catch (error: any) {
    // Handle QuotaExceededError
    if (
      error.name === "QuotaExceededError" ||
      error.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      error.code === 22 ||
      error.code === 1014
    ) {
      console.warn(`[Storage] Quota exceeded when saving ${key}. Purging legacy image caches...`);
      try {
        localStorage.removeItem("homero_custom_images");
        localStorage.removeItem("homero_custom_images_v2");
        localStorage.removeItem("homero_custom_images_v3");
      } catch (cleanErr) {
        console.error("[Storage] Failed to clean up legacy keys:", cleanErr);
      }
    } else {
      console.warn(`[Storage] Failed to save ${key} to localStorage:`, error);
    }
    return false;
  }
}

export function safeRemoveLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Storage] Failed to remove ${key} from localStorage:`, error);
  }
}

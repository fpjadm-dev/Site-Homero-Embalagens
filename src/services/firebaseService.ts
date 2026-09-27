import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  addDoc, 
  writeBatch,
  onSnapshot,
  getDoc
} from "firebase/firestore";
import { ref as storageRef, uploadString, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const PRIMARY_COLLECTION = "custom_images";
const SECONDARY_COLLECTIONS = ["customImages", "images", "products"];
const QUOTES_COLLECTION = "quotes";

export interface CustomImageDoc {
  key?: string;
  url?: string;
  image?: string;
  imageUrl?: string;
  downloadUrl?: string;
  photo?: string;
  base64?: string;
  src?: string;
  updatedAt?: string;
  storageType?: "firebase_storage" | "static_server";
}

export interface QuotePayload {
  name: string;
  company?: string;
  email: string;
  whatsapp: string;
  segment?: string;
  selectedProducts: string[];
  notes?: string;
  createdAt: string;
}

/**
 * Helper to extract a valid image source (URL or data URI) from a Firestore document
 */
function extractImageUrl(data: any): string | null {
  if (!data) return null;
  const possibleFields = [
    data.url,
    data.image,
    data.imageUrl,
    data.downloadUrl,
    data.photo,
    data.src,
    data.link,
    data.base64
  ];

  for (const field of possibleFields) {
    if (typeof field === "string" && field.trim().length > 0) {
      return field.trim();
    }
  }
  return null;
}

/**
 * Normalizes a key (handles differences like underscores, hyphens, and casing)
 */
function normalizeKey(k: string): string {
  return k.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Loads all custom images mapping from Firestore across all possible collections
 */
export async function getCustomImagesFromFirestore(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  // Scan primary and secondary collections
  const allCollections = [PRIMARY_COLLECTION, ...SECONDARY_COLLECTIONS];

  for (const colName of allCollections) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const rawKey = (data.key || data.id || data.name || docSnap.id || "").toString();
        const url = extractImageUrl(data);

        if (rawKey && url) {
          result[rawKey] = url;
          // Also map alternate key format if it has underscores instead of hyphens
          if (rawKey.includes("_")) {
            result[rawKey.replace(/_/g, "-")] = url;
          }
          if (rawKey.includes("-")) {
            result[rawKey.replace(/-/g, "_")] = url;
          }
        }
      });
    } catch (error) {
      console.warn(`[Firestore] Failed to scan collection '${colName}':`, error);
    }
  }

  console.log(`[Firestore] Total loaded keys: ${Object.keys(result).length}`, Object.keys(result).slice(0, 10));
  return result;
}

/**
 * Subscribes to real-time updates from Firestore for custom images
 */
export function subscribeToCustomImages(onUpdate: (images: Record<string, string>) => void): () => void {
  try {
    const colRef = collection(db, PRIMARY_COLLECTION);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const updated: Record<string, string> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const rawKey = (data.key || data.id || data.name || docSnap.id || "").toString();
        const url = extractImageUrl(data);
        if (rawKey && url) {
          updated[rawKey] = url;
          if (rawKey.includes("_")) {
            updated[rawKey.replace(/_/g, "-")] = url;
          }
          if (rawKey.includes("-")) {
            updated[rawKey.replace(/-/g, "_")] = url;
          }
        }
      });
      if (Object.keys(updated).length > 0) {
        onUpdate(updated);
      }
    }, (error) => {
      console.warn("[Firestore] Realtime subscription error:", error);
    });

    return unsubscribe;
  } catch (err) {
    console.warn("[Firestore] Could not set up realtime listener:", err);
    return () => {};
  }
}

/**
 * Uploads image binary directly to Firebase Storage, gets the public downloadURL,
 * and saves the reference in Firestore.
 */
export async function uploadAndSaveCustomImage(key: string, base64OrFile: string | Blob): Promise<string> {
  if (!key || !base64OrFile) return "";

  let downloadUrl = "";
  let storageType: "firebase_storage" | "static_server" = "firebase_storage";

  // If already a remote web URL, no need to re-upload to storage
  if (typeof base64OrFile === "string" && (base64OrFile.startsWith("http://") || base64OrFile.startsWith("https://"))) {
    downloadUrl = base64OrFile;
  } else {
    // 1. Try uploading binary file to Firebase Storage
    try {
      let ext = "jpg";
      let contentType = "image/jpeg";

      if (typeof base64OrFile === "string" && base64OrFile.startsWith("data:image/")) {
        const match = base64OrFile.match(/^data:image\/([a-zA-Z0-9+]+);base64,/);
        if (match) {
          ext = match[1].toLowerCase();
          if (ext === "jpeg") ext = "jpg";
          contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
        }
        const fileRef = storageRef(storage, `custom_images/${key}.${ext}`);
        await uploadString(fileRef, base64OrFile, "data_url", {
          contentType,
        });
        downloadUrl = await getDownloadURL(fileRef);
        storageType = "firebase_storage";
        console.log(`[Firebase Storage] Uploaded ${key}.${ext} -> ${downloadUrl}`);
      } else if (base64OrFile instanceof Blob) {
        ext = base64OrFile.type.includes("png") ? "png" : "jpg";
        contentType = base64OrFile.type || "image/jpeg";
        const fileRef = storageRef(storage, `custom_images/${key}.${ext}`);
        await uploadBytes(fileRef, base64OrFile, {
          contentType,
        });
        downloadUrl = await getDownloadURL(fileRef);
        storageType = "firebase_storage";
        console.log(`[Firebase Storage] Uploaded Blob ${key}.${ext} -> ${downloadUrl}`);
      }
    } catch (storageErr) {
      console.warn(`[Firebase Storage] Storage upload unavailable (${storageErr}), using server fallback.`);
    }

    // 2. Server upload fallback if storage failed or for double redundancy
    if (!downloadUrl && typeof base64OrFile === "string") {
      try {
        const res = await fetch("/api/custom-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, base64: base64OrFile }),
        });
        const data = await res.json();
        if (data && data.url) {
          downloadUrl = data.url;
          storageType = "static_server";
        }
      } catch (serverErr) {
        console.error("[Storage] Server upload fallback failed:", serverErr);
      }
    }

    // If still no url, use the data URI directly
    if (!downloadUrl && typeof base64OrFile === "string") {
      downloadUrl = base64OrFile;
    }
  }

  // 3. Save reference in Firestore document
  if (downloadUrl) {
    try {
      const docRef = doc(db, PRIMARY_COLLECTION, key);
      await setDoc(docRef, {
        key,
        url: downloadUrl,
        storageType,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log(`[Firestore] Saved image reference for ${key}: ${downloadUrl.substring(0, 80)}...`);
    } catch (firestoreErr) {
      console.error(`[Firestore] Failed to save image document for ${key}:`, firestoreErr);
    }
  }

  return downloadUrl;
}

/**
 * Saves a single custom image mapping permanently to Firestore
 */
export async function saveCustomImageToFirestore(key: string, imageDataOrUrl: string): Promise<string> {
  return uploadAndSaveCustomImage(key, imageDataOrUrl);
}

/**
 * Seeds initial image mapping to Firestore only for keys that do NOT already exist
 */
export async function seedImagesToFirestore(images: Record<string, string>): Promise<void> {
  try {
    const existing = await getCustomImagesFromFirestore();
    const batch = writeBatch(db);
    let count = 0;

    for (const [key, url] of Object.entries(images)) {
      // Never overwrite existing customized user photos!
      if (!existing[key] && key && url && typeof url === "string") {
        const docRef = doc(db, PRIMARY_COLLECTION, key);
        batch.set(docRef, {
          key,
          url,
          storageType: "static_server",
          updatedAt: new Date().toISOString(),
        });
        count++;
      }
    }

    if (count > 0) {
      await batch.commit();
      console.log(`[Firestore] Seeded ${count} clean default image URLs to Firestore.`);
    }
  } catch (error) {
    console.warn("Failed to seed initial images to Firestore:", error);
  }
}

/**
 * Saves a new customer quote request to Firestore
 */
export async function saveQuoteToFirestore(quote: QuotePayload): Promise<string | null> {
  try {
    const colRef = collection(db, QUOTES_COLLECTION);
    const docRef = await addDoc(colRef, {
      ...quote,
      createdAt: quote.createdAt || new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Failed to save quote request to Firestore:", error);
    return null;
  }
}


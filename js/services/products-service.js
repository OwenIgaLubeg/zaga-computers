import { db, storage } from "../firebase-config.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  refFromURL
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const productsCollection = collection(db, "products");

const generateImagePath = (file) => `products/${Date.now()}-${file.name}`;

export const parsePrice = (value) => {
  const numeric = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? Math.max(numeric, 0) : 0;
};

export const formatPrice = (value) => {
  const numeric = typeof value === "number" ? value : parsePrice(value);
  return `UGX ${numeric.toLocaleString()}`;
};

const uploadImageIfNeeded = async (file, existingUrl = null) => {
  if (!file) {
    return existingUrl || null;
  }

  const imageRef = ref(storage, generateImagePath(file));
  await uploadBytes(imageRef, file);
  const downloadUrl = await getDownloadURL(imageRef);

  if (existingUrl && existingUrl.startsWith("https://")) {
    try {
      const previousRef = refFromURL(existingUrl);
      await deleteObject(previousRef);
    } catch (error) {
      console.warn("Previous image cleanup skipped:", error.message);
    }
  }

  return downloadUrl;
};

export const subscribeToProducts = (callback, errorCallback) => {
  const productsQuery = query(productsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(productsQuery, callback, errorCallback);
};

export const subscribeToProduct = (productId, callback, errorCallback) => {
  if (!productId) {
    throw new Error("subscribeToProduct requires a productId");
  }
  const productRef = doc(db, "products", productId);
  return onSnapshot(productRef, callback, errorCallback);
};

export const getProductOnce = async (productId) => {
  const productRef = doc(db, "products", productId);
  return getDoc(productRef);
};

export const createProduct = async ({ name, brand, price, description }, imageFile) => {
  const imageUrl = await uploadImageIfNeeded(imageFile);
  const sanitizedPrice = parsePrice(price);

  return addDoc(productsCollection, {
    name,
    brand,
    price: sanitizedPrice,
    description,
    imageUrl,
    createdAt: new Date()
  });
};

export const updateProduct = async (productId, { name, brand, price, description }, imageFile, existingImageUrl = null) => {
  const productRef = doc(db, "products", productId);
  const imageUrl = await uploadImageIfNeeded(imageFile, existingImageUrl);
  const sanitizedPrice = parsePrice(price);

  return updateDoc(productRef, {
    name,
    brand,
    price: sanitizedPrice,
    description,
    imageUrl
  });
};

export const deleteProduct = async (productId, imageUrl = null) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);

  if (imageUrl) {
    try {
      const imageRef = refFromURL(imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.warn("Image deletion skipped:", error.message);
    }
  }
};

export const mapProductDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data?.name ?? "",
    brand: data?.brand ?? "",
    price: parsePrice(data?.price),
    description: data?.description ?? "",
    imageUrl: data?.imageUrl || data?.imageURL || null,
    createdAt: data?.createdAt ?? null
  };
};

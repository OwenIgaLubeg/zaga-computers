// js/services/products-service.js
import { db } from "../firebase-config.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const productsCollection = collection(db, "products");

export const parsePrice = (value) => {
  const numeric = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? Math.max(numeric, 0) : 0;
};

export const formatPrice = (value) => {
  const numeric = typeof value === "number" ? value : parsePrice(value);
  return `UGX ${numeric.toLocaleString()}`;
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

export const createProduct = async ({ name, brand, price, description, imageUrl }) => {
  const sanitizedPrice = parsePrice(price);
  return addDoc(productsCollection, {
    name,
    brand,
    price: sanitizedPrice,
    description,
    imageUrl: imageUrl || null,
    createdAt: serverTimestamp()
  });
};

export const updateProduct = async (productId, { name, brand, price, description, imageUrl }) => {
  const productRef = doc(db, "products", productId);
  const sanitizedPrice = parsePrice(price);
  return updateDoc(productRef, {
    name,
    brand,
    price: sanitizedPrice,
    description,
    imageUrl: imageUrl || null
  });
};

export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  return deleteDoc(productRef);
  // Note: Cloudinary image cleanup is optional and not done here.
  // You can delete manually in Cloudinary dashboard if needed.
};

export const mapProductDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data?.name ?? "",
    brand: data?.brand ?? "",
    price: parsePrice(data?.price),
    description: data?.description ?? "",
    imageUrl: data?.imageUrl || null,
    createdAt: data?.createdAt ?? null
  };
};
// js/services/blogs-service.js
import { db } from "../firebase-config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const blogsCollection = collection(db, "blogs");

export const subscribeToBlogs = (callback, errorCallback) => {
  const blogsQuery = query(blogsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(blogsQuery, callback, errorCallback);
};

export const createBlog = async ({ title, summary, content, authorId, authorName, coverImageUrl }) => {
  return addDoc(blogsCollection, {
    title,
    summary,
    content,
    authorId,
    authorName,
    coverImageUrl: coverImageUrl || null,
    createdAt: serverTimestamp()
  });
};

export const deleteBlog = async (blogId) => {
  const blogRef = doc(db, "blogs", blogId);
  return deleteDoc(blogRef);
  // Note: Cloudinary image cleanup is optional and not done here.
};

export const mapBlogDoc = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data?.title ?? '',
    summary: data?.summary ?? '',
    content: data?.content ?? '',
    authorId: data?.authorId ?? '',
    authorName: data?.authorName ?? 'Anonymous',
    coverImageUrl: data?.coverImageUrl || null,
    createdAt: data?.createdAt ?? null
  };
};
import { db, storage } from "../firebase-config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  refFromURL
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const blogsCollection = collection(db, "blogs");

const createImagePath = (file) => `blogs/${Date.now()}-${file.name}`;

const uploadCoverImage = async (file, existingUrl = null) => {
  if (!file) {
    return existingUrl || null;
  }

  const imageRef = ref(storage, createImagePath(file));
  await uploadBytes(imageRef, file);
  const downloadUrl = await getDownloadURL(imageRef);

  if (existingUrl) {
    try {
      const previousRef = refFromURL(existingUrl);
      await deleteObject(previousRef);
    } catch (error) {
      console.warn('Previous blog image cleanup skipped:', error.message);
    }
  }

  return downloadUrl;
};

export const subscribeToBlogs = (callback, errorCallback) => {
  const blogsQuery = query(blogsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(blogsQuery, callback, errorCallback);
};

export const createBlog = async ({ title, summary, content, authorId, authorName }, coverImageFile) => {
  const coverImageUrl = await uploadCoverImage(coverImageFile);
  return addDoc(blogsCollection, {
    title,
    summary,
    content,
    authorId,
    authorName,
    coverImageUrl,
    createdAt: new Date()
  });
};

export const updateBlog = async (blogId, { title, summary, content }, coverImageFile, existingImageUrl = null) => {
  const blogRef = doc(db, "blogs", blogId);
  const coverImageUrl = await uploadCoverImage(coverImageFile, existingImageUrl);
  return updateDoc(blogRef, {
    title,
    summary,
    content,
    coverImageUrl
  });
};

export const deleteBlog = async (blogId, coverImageUrl = null) => {
  const blogRef = doc(db, "blogs", blogId);
  await deleteDoc(blogRef);

  if (coverImageUrl) {
    try {
      const imageRef = refFromURL(coverImageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.warn('Blog image deletion skipped:', error.message);
    }
  }
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

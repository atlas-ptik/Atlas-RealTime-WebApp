// src/lib/firestore.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  query,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Add a document to a collection
 */
export async function addDocument<T>(collectionName: string, data: T) {
  try {
    // Add timestamp
    const dataWithTimestamp = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, collectionName),
      dataWithTimestamp
    );
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

/**
 * Get a document by ID
 */
export async function getDocument<T>(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

/**
 * Update a document
 */
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
) {
  try {
    const docRef = doc(db, collectionName, id);

    // Add timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, dataWithTimestamp);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

/**
 * Get documents with optional query constraints
 */
export async function getDocuments<T>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
) {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);

    const result: T[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() } as unknown as T);
    });

    return result;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

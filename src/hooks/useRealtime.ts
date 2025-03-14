// src/hooks/useRealtime.ts
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * A custom hook for subscribing to a Firestore collection in real-time
 *
 * @param collectionName - The name of the Firestore collection
 * @param queryConstraints - Optional array of Firestore query constraints
 * @returns An object with data, loading state, and error
 */
export function useRealtime<T>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Create a query against the collection
    const q = query(collection(db, collectionName), ...queryConstraints);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const items: T[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as unknown as T);
        });
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching collection:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [collectionName, JSON.stringify(queryConstraints)]);

  return { data, loading, error };
}

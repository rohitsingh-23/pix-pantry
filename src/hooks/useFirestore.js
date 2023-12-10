import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuth } from "./useAuth";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;
    const getData = async () => {
      setIsLoading(true);
      const { currentUser } = auth;
      try {
        const q = query(
          collection(db, collectionName),
          where("userEmail", "==", currentUser.email),
          orderBy("createdAt", "desc")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imageUrl;
            const createdAt = doc.data().createdAt.toDate();
            const userEmail = doc.data().userEmail;
            images.push({ imageUrl, createdAt, userEmail });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getData();
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  return { docs, isLoading };
};

export default useFirestore;

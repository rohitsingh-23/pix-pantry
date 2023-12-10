import { useState } from "react";
import { auth, db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";

const useStorage = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const startUpload = (file) => {
    setLoading(true);
    const { currentUser } = auth;
    if (!file) return;
    const fileId = uuidv4();
    const formate = file.type.split("/")[1];
    const storageRef = ref(
      storage,
      `images/${currentUser.email}/${fileId}.${formate}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(temp);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);

        // console.log("writing started");
        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
          userEmail: user.email,
        });
        // console.log("writing done");
      }
    );
    setLoading(false);
  };

  return { progress, error, url, startUpload, loading };
};

export default useStorage;

// Import the storage service
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required functions

export const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  const storageRef = ref(storage, filename); // Create a reference

  try {
    const snapshot = await uploadBytes(storageRef, blob); // Upload the blob
    const url = await getDownloadURL(snapshot.ref); // Get the download URL
    return url; // Return the URL of the uploaded file
  } catch (e) {
    console.log("error: ", e);
    throw e; // It's generally better to throw the error so the caller can handle it
  }
};

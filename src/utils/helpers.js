// Import the storage service
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  const storageRef = ref(storage, filename);

  try {
    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (e) {
    console.log("error: ", e);
    throw e;
  }
};

export function formatDate(createdAt) {
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

export const getPostLikesText = (likes) => {
  let likesCount = Array.isArray(likes) ? likes.length : likes;
  if (!likesCount || likesCount === 0) {
    return "Like";
  } else if (likesCount === 1) {
    return "1 Like";
  } else {
    return `${likesCount} Likes`;
  }
};

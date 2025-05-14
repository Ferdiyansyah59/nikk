// src/lib/firebase/storage.js
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from './config';

// Upload file ke Firebase Storage
export const uploadFile = async (file, path = 'images') => {
  // Buat nama file unik dengan timestamp
  const fileName = `${Date.now()}-${file.name}`;
  const fullPath = `${path}/${fileName}`;
  const storageRef = ref(storage, fullPath);
  
  // Upload file
  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error during upload:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadURL,
            path: fullPath
          });
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      }
    );
  });
};

// Dapatkan semua file dari Firebase Storage
export const getFiles = async (path = 'images') => {
  const listRef = ref(storage, path);
  
  try {
    const result = await listAll(listRef);
    
    const filePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      
      return {
        url,
        path: itemRef.fullPath,
        name: itemRef.name
      };
    });
    
    return Promise.all(filePromises);
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

// Hapus file dari Firebase Storage
export const deleteFile = async (path) => {
  const fileRef = ref(storage, path);
  
  try {
    await deleteObject(fileRef);
    console.log(`File ${path} successfully deleted`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
'use client'; // Diperlukan untuk komponen interaktif di Next.js App Router

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '@/lib/firebase';
import { v4 } from 'uuid';
import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

export default function Basic(props) {
  // Gunakan useState untuk menyimpan files yang diterima
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  
  const predict = async (url) => {
    await axios
      .post(
        'http://127.0.0.1:8080/batik',
        { img: url },
        {
          headers: {
            Accept: 'application/json, text/plain',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setData(res.data.prediksi);
        console.log(res.data.prediksi);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Gunakan useCallback untuk fungsi onDrop
  const onDrop = useCallback(files => {
    setAcceptedFiles(files);
    const imageRef = ref(storage, `images/${v4() + files[0].name}`);
    uploadBytes(imageRef, files[0])
      .then((snapshot) => {
        console.log(snapshot)
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log('Download URL', downloadURL);
        setUrl(downloadURL);
        predict(downloadURL);
      });
  }, []);
  
  // Gunakan hook useDropzone dengan onDrop callback
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  // Render file list
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  return (
    <section className="container mx-auto p-4">
      <div 
        {...getRootProps({
          className: 'border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:bg-gray-50'
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-600">Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside className="mt-4">
        <h4 className="text-lg font-medium mb-2">Files</h4>
        <ul className="list-disc pl-6">{files}</ul>
      </aside>
    </section>
  );
}
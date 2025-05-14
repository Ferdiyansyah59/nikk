'use client'; // Diperlukan untuk komponen interaktif di Next.js App Router

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '@/lib/firebase';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import ImageComponent from '@/components/micro/ImageComponent';

export default function BatikAnalyzer(props) {
  // State untuk menyimpan data
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [gptAnalysis, setGptAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingGpt, setLoadingGpt] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Prediksi jenis batik - menggunakan kode asli Anda
  const predict = async (url) => {
    try {
      setLoading(true);
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
          setData(res.data.prediksi.class);
          console.log(res.data.prediksi.class);
          
          // Setelah mendapatkan prediksi, analisis dengan GPT
          analyzeWithGPT(res.data.prediksi.class);
        })
        .catch((err) => {
          console.log(err);
          setError('Gagal melakukan prediksi. Silakan coba lagi.');
        });
    } finally {
      setLoading(false);
    }
  };
  
  // Analisis dengan GPT
  const analyzeWithGPT = async (batikType) => {
    if (!batikType) return;
    
    try {
      setLoadingGpt(true);
      const prompt = `Berikan informasi lengkap tentang batik ${batikType} dalam format berikut:
      1. Sejarah dan asal: (jelaskan sejarah dan asal usul batik ini)
      2. Karakteristik visual: (jelaskan ciri khas visual batiknya)
      3. Makna dan filosofi: (jelaskan makna filosofis dan simbolis dibalik motif batik)
      4. Penggunaan dalam budaya: (jelaskan kapan dan dalam acara apa batik ini biasanya digunakan)
      5. Nilai budaya: (jelaskan nilai budaya dan pentingnya dalam masyarakat Indonesia)
      
      Berikan informasi yang faktual dan mendalam. Jangan terlalu panjang, sekitar 3-4 kalimat per bagian.`;
      
      const response = await axios.post('/api/gpt', {
        prompt: prompt
      });
      
      setGptAnalysis(response.data.data);
      console.log('Analisis GPT:', response.data.data);
      
    } catch (err) {
      console.error('Error GPT analysis:', err);
      setGptAnalysis('Gagal mendapatkan analisis. Silakan coba lagi.');
    } finally {
      setLoadingGpt(false);
    }
  };

  // Fungsi onDrop
  const onDrop = useCallback(files => {
    if (files && files.length > 0) {
      // Reset state
      setAcceptedFiles(files);
      setError(null);
      setData(null);
      setGptAnalysis(null);
      
      // Buat preview URL
      const previewUrl = URL.createObjectURL(files[0]);
      setPreview(previewUrl);
      
      // Upload ke Firebase - menggunakan kode asli Anda yg sudah dimodifikasi agar aman
      const imageRef = ref(storage, `images/${v4()}-${files[0].name}`);
      uploadBytes(imageRef, files[0])
        .then((snapshot) => {
          console.log(snapshot);
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log('Download URL', downloadURL);
          setUrl(downloadURL);
          predict(downloadURL);
        })
        .catch((err) => {
          console.error('Error saat upload:', err);
          setError('Gagal mengunggah gambar. Silakan coba lagi.');
        });
    }
  }, []);
  
  // Gunakan hook useDropzone dengan onDrop callback
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });
  
  // Cleanup preview URL saat komponen unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  
  // Render file list
  const files = acceptedFiles.map(file => (
    <li key={file.path} className="text-sm text-gray-600">
      {file.path} - {(file.size / 1024).toFixed(2)} KB
    </li>
  ));
  
  // Format GPT response for better display
  const formatGptResponse = (text) => {
    if (!text) return [];
    
    // Split by numbered sections (1., 2., etc)
    const sections = text.split(/\d+\.\s+/).filter(section => section.trim());
    
    // Extract titles based on common pattern in GPT's response
    const sectionTitles = [];
    const cleanedSections = [];
    
    for (let section of sections) {
      const titleMatch = section.match(/^([^:]+):/);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        const content = section.substring(titleMatch[0].length).trim();
        sectionTitles.push(title);
        cleanedSections.push(content);
      } else {
        sectionTitles.push('');
        cleanedSections.push(section.trim());
      }
    }
    
    return sectionTitles.map((title, i) => ({
      title,
      content: cleanedSections[i]
    }));
  };
  
  // Reset function
  const handleReset = () => {
    setAcceptedFiles([]);
    setUrl(null);
    setData(null);
    setGptAnalysis(null);
    setError(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">Analisis Batik</h1>
      <p className="text-center text-gray-600 mb-6">Upload gambar batik untuk identifikasi dan analisis mendalam</p>
      
      <div 
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:bg-gray-50'
          }`
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-center text-blue-500">Letakkan gambar di sini...</p>
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 mt-2">Seret gambar batik ke sini, atau klik untuk memilih file</p>
            <p className="text-sm text-gray-500 mt-1">Format: JPG, PNG, JPEG, GIF, WEBP (Maks. 5MB)</p>
          </div>
        )}
      </div>
      
      {loading && (
        <div className="mt-6 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Mengidentifikasi jenis batik...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {/* Preview & Results Area */}
      {preview && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview Column */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-3">Gambar Batik</h3>
              <div className="relative w-full h-64 bg-gray-50 rounded-md overflow-hidden border border-gray-200">
                <ImageComponent
                  src={preview}
                  alt="Preview Batik"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            
            {/* Results Column */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-3">Hasil Identifikasi</h3>
              {data ? (
                <div className="mb-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Jenis Batik:</p>
                    <p className="text-2xl font-bold text-blue-700">{typeof data === 'object' ? data?.class ?? "N/A" : data ?? "Belum ada data"}</p>
                  </div>
                  
                  {loadingGpt && (
                    <div className="mt-4 text-center">
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
                      <p className="mt-1 text-sm text-gray-600">Menganalisis dengan AI...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md h-32 flex items-center justify-center text-gray-500">
                  {loading ? "Sedang memproses..." : "Menunggu hasil identifikasi..."}
                </div>
              )}
            </div>
          </div>
          
          {/* GPT Analysis Section */}
          {gptAnalysis && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Analisis Detail Batik {data}</h3>
              
              <div className="space-y-4">
                {formatGptResponse(gptAnalysis).map((section, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3">
                    <h4 className="font-medium text-blue-800">{section.title}</h4>
                    <p className="mt-1 text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              disabled={loading || loadingGpt}
            >
              Unggah Gambar Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function KNoteCreatePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviews(next);
  };

  return (
    <section className="space-y-8 pb-16">
      <div className="rounded-3xl bg-white p-8 shadow">
        <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5a3 3 0 1 1 3 3 3 3 0 0 1-3-3Zm7 7.95V7a5 5 0 0 0-10 0v5.95A5 5 0 1 0 12 18v-2a3 3 0 1 1-3-3h6a3 3 0 1 1-3 3v2a5 5 0 1 0 7-5.05Z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900">Drag images here or click to upload</p>
            <p className="text-sm text-gray-500">Minimum of 1 image can be uploaded</p>
            <button
              onClick={handleSelect}
              className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700"
            >
              Upload image
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
        {previews.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {previews.map((src, idx) => (
              <div key={idx} className="relative h-32 w-full overflow-hidden rounded-xl">
                <Image src={src} alt={`Preview ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
        <InfoBlock title="Image Size" description="Minimum size: 120 x 120" />
        <InfoBlock title="Image Format" description="Recommended formats: JPG, JPEG, PNG" />
        <InfoBlock title="Image Resolution" description="Images over 10MB cannot be uploaded" />
      </div>
    </section>
  );
}

function InfoBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

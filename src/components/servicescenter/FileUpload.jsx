import React from "react";

export default function FileUpload({
  label,
  file,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-black font-semibold mb-2 text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => onChange(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div
          className={`
          w-full h-40
          flex flex-col items-center justify-center
          rounded-xl
          border-2 border-dashed
          transition
          bg-white
          ${
            file
              ? "border-[#85754E] bg-[#85754E]/5"
              : "border-gray-300 hover:border-[#85754E]"
          }
        `}
        >
          {file && file.type.startsWith("image") && (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-full w-full object-contain rounded-lg"
            />
          )}

          {file && file.type === "application/pdf" && (
            <div className="flex flex-col items-center text-[#85754E]">
              <svg
                className="w-12 h-12 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
              </svg>

              <p className="text-sm font-medium">{file.name}</p>
            </div>
          )}

          {!file && (
            <div className="flex flex-col items-center text-gray-400">
              <svg
                className="w-12 h-12 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="9" cy="11" r="2" />
                <path d="M14 10h4M14 14h4" />
              </svg>

              <p className="text-sm">{placeholder}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
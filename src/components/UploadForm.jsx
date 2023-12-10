import React, { useRef, useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputField = useRef(null);
  const { startUpload, progress, url, error, loading } = useStorage({
    selectedFile,
  });
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
       startUpload(selectedFile);
      if (url) {
        setSelectedFile(null);
        inputField.current.value = null;
      }
    }
  };

  return (
    <div className="text-center mt-10">
      <form className="flex items-center flex-col" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          ref={inputField}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          className={`btn gap-3 mt-5 ${loading && "loading"}`}
          disabled={!selectedFile}
        >
          Upload <span>🚀</span>
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

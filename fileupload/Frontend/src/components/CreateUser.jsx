import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const[imagePreview, setImagePreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef(null);

  const navigate = useNavigate()

   const handleImageChange = (e) => {
     const file = e.target.files[0];

     if (!file) {
       alert("No file selected");
       setSelectedFile(null);
       setImagePreview(null);
       setFileType(null);
       return;
     }

     const isImage = file.type.startsWith("image/");
     const isPDF = file.type === "application/pdf";

     setSelectedFile(file);

     if (isImage) {
       setFileType("image");
       setImagePreview(URL.createObjectURL(file));
     } else if (isPDF) {
       setFileType("pdf");
       setImagePreview(null);
       alert("PDF selected: " + file.name);
     } else {
       alert("Please select a valid image or PDF file");
       setSelectedFile(null);
       setImagePreview(null);
       setFileType(null);
     }
   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("selectedFile", selectedFile);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/upload", formData,
      );
      console.log(response.data);
      alert("Details submitted Successfully");
      navigate("/fetch")
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedFile(null);
      setImagePreview("");
      setFileType(null);
      fileInputRef.current.value = ""
    } catch (error) {
      console.log(error);
      alert("Failed to Upload the details");
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      <div className="bg-[#1E1E2F] text-white w-full max-w-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <h2>User Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2C2C3A] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2C2C3A] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2C2C3A] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Upload File
            </label>
            <input
            ref={fileInputRef}
            onChange={handleImageChange}
              type="file"
              className="w-full px-3 py-2 rounded-lg bg-[#2C2C3A] text-gray-300 border border-gray-600 focus:outline-none"
            />
            {selectedFile && (
              <div className="mt-4">
                {fileType === "image" && imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg border border-gray-700 max-h-48 object-contain"
                  />
                ) : (
                  <p className="text-sm text-gray-400">pdf file selected</p>
                )}
              </div>
            )}
          </div>

          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser
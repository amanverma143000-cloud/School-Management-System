import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";

const AddHomework = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields before posting homework!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/homework", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message || "Homework posted successfully!");

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error while posting homework.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4" 
         style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
        }}
        className="rounded-2xl p-8 w-full max-w-lg border border-yellow-200"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FileText className="text-yellow-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-[var(--text-secondary)]">📚 Add Homework</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Homework Title
            </label>
            <input
              type="text"
              placeholder="e.g. Science - Chapter 6: Motion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Write homework details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image (optional)
            </label>

            {!preview ? (
              <div className="border-2 border-dashed border-yellow-300 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-yellow-50 transition">
                <Upload className="w-6 h-6 text-yellow-500 mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer text-sm text-gray-500"
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex flex-col items-center"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-44 h-44 object-cover rounded-xl border border-yellow-200 shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-3 flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-semibold transition"
                >
                  <X className="w-4 h-4" /> Remove Image
                </button>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-primary)",
            }}
            className="w-full hover:bg-yellow-500 font-semibold py-3 rounded-xl shadow-md transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Post Homework
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddHomework;

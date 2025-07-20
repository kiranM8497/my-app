import { Calendar, FileText, Image, Plus, Smile, X } from 'lucide-react';
import { useRef, useState } from "react";


const ConfirmDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2">Discard post?</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to discard your post? Your changes will be lost.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};


const PostModal = ({ isOpen, onClose, userInfo }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleClose = () => {
    if (postContent.trim() || selectedImages.length > 0) {
      setShowConfirmDialog(true);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setPostContent('');
    setSelectedImages([]);
    setShowEmojiPicker(false);
    setShowConfirmDialog(false);
    onClose();
  };

  const handleConfirmDiscard = () => {
    resetAndClose();
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            url: e.target.result,
            file: file
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = ''; // Reset file input
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handlePost = () => {
    if (!postContent.trim() && selectedImages.length === 0) return;
    
    // Here you would handle the actual posting logic
    console.log('Posting:', { content: postContent, images: selectedImages });
    
    // Show success message or handle the response
    alert('Post created successfully!');
    resetAndClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-start justify-center pt-20 z-40">
        <div className="border border-black bg-white rounded-lg w-full max-w-xl mx-4 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Create a post</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={"https://cdn-icons-png.flaticon.com/128/4140/4140061.png"}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 flex-1 overflow-y-auto max-h-60">
            <textarea
              ref={textareaRef}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What do you want to talk about?"
              className="w-full min-h-[120px] resize-none border-none outline-none text-lg placeholder-gray-500"
              autoFocus
            />

            {/* Selected Images */}
            {selectedImages.length > 0 && (
              <div className="mt-4 space-y-2">
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative inline-block mr-2 mb-2">
                    <img
                      src={image.url}
                      alt="Selected"
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Add an image"
                >
                  <Image size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Add emoji"
                >
                  <Smile size={20} className="text-gray-600" />
                </button>
              </div>

              <button
                onClick={handlePost}
                disabled={!postContent.trim() && selectedImages.length === 0}
                className={`px-6 py-2 rounded-full font-semibold ${
                  postContent.trim() || selectedImages.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onConfirm={handleConfirmDiscard}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </>
  );
};

export default PostModal;

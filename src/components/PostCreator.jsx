import { Calendar, FileText, Image } from "lucide-react";
import { useState } from "react";
import PostModal from "../Modals/PostModal";

const PostCreator = ({ userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/4140/4140061.png"}
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Start a post
          </button>
        </div>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userInfo={userInfo}
      />
    </>
  );
};

export default PostCreator;

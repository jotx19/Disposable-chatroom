import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedRoom } = useChatStore();
  const { authUser } = useAuthStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (!selectedRoom) {
      toast.error("Please select a room first.");
      return;
    }

    try {
      await sendMessage({
        text: text.trim() || null,
        image: imagePreview || null,
        roomId: selectedRoom._id,
        senderId: authUser._id,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center w-full p-2 bg-[#f8f8f8] rounded-xl shadow-xl gap-2">
        {imagePreview && (
          <div className="relative w-20 h-20 mr-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3 text-black border border-black hover:scale-100 bg-white rounded-full" />
            </button>
          </div>
        )}

        <input
          type="text"
          className="w-full p-2 bg-transparent border border-base-300 input border-black input-bordered rounded-3xl text-black focus:outline-none font-custom input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`sm:flex btn btn-circle rounded-full h-10 w-10 p-2 bg-[#dbf507] ${
            imagePreview ? "text-emerald-500" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload an image"
        >
          <Image className="text-black" size={22} />
        </button>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send
            size={22}
            className="border border-base-300 rounded-full h-10 w-10 p-2 text-black bg-[#dbf507] hover:scale-105"
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

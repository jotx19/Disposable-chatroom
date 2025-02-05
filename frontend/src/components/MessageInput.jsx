import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedRoom } = useChatStore((state) => state); // Get selectedRoom from store

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
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

    if (!selectedRoom?._id) {
      toast.error("Please select a room first");
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        roomId: selectedRoom._id,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!selectedRoom) {
    return <div>Please select a room to send a message</div>;
  }

  return (
    <div className="w-full">
      {imagePreview && (
          <div className="relative w-20 h-20 mb-3">
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

      <form onSubmit={handleSendMessage} className="flex items-center w-full p-2 bg-[#1c1c1c] text-white rounded-r-lg shadow-xl gap-2">
        <input
          type="text"
          className="w-full p-3 bg-transparent border border-base-300 input border-black input-bordered rounded-3xl text-white focus:outline-none font-custom input-base sm:input-base"
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
          className={`sm:flex btn btn-circle rounded-full h-10 w-10 p-2 bg-[#dbf507] ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
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
            className="border border-base-300 rounded-full h-12 w-12 p-2 text-black bg-[#dbf507] hover:scale-105"
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

import React, { useState } from 'react';
import { X } from 'lucide-react'; // Importing the close icon from lucide-react

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={toggleModal}
        className="w-40 h-12 flex justify-center items-center bg-white rounded-3xl text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white transition duration-200"
      >
        Open Modal
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl h-[80vh] rounded-2xl p-8">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome to the Modal</h2>
                <p className="mt-4 text-lg">This is an 80vh modal with a close button on top.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

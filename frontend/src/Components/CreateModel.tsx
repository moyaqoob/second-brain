import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import { Button } from "./button";

export interface InputProps {
  placeholder: string;
  type: string;
  reference: React.RefObject<HTMLInputElement>;
}

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter", // Fixed casing to be consistent
}

export const CreateModal: React.FC<CreateModalProps> = ({ open, onClose }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function create() {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title: titleRef.current?.value,
        type: type, // Use the state value instead of typeRef
        link: linkRef.current?.value,
      });
      console.log("Content Created");
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if clicking outside of the modal content
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Only add the event listener when the modal is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside); // Changed from mouseleave to mousedown
    }

    // Clean up the event listener when component unmounts or modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Changed from mouseleave to mousedown
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay - only affects the background */}
      <div className="absolute inset-0 bg-gray-500 opacity-80" />
      <div
        ref={modalRef}
        className="relative z-10 bg-white rounded-lg shadow-xl w-96 max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-blue-600">
            Add New Content
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <Input reference={titleRef} placeholder="Name" type="text" />
          <Input reference={linkRef} placeholder="Link" type="url" />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
            >
              <option value={ContentType.Youtube}>Youtube</option>
              <option value={ContentType.Twitter}>Twitter</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={create}
              variant="primary"
              size="md"
              title="Save Content"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = (props: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.placeholder}
      </label>
      <input
        type={props.type}
        ref={props.reference}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${props.placeholder.toLowerCase()}`}
      />
    </div>
  );
};
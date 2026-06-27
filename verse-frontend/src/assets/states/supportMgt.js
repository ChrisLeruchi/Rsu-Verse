import { useState } from "react";

export function useSupportState() {
  const [isOpen, setIsOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState(null);

    return {
      isOpen, setIsOpen,
      selectedTopic, setSelectedTopic,
      isSubmitted, setIsSubmitted,
      message, setMessage,
      attachment, setAttachment
    }
}
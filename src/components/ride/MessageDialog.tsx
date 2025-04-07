
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "driver";
  timestamp: Date;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ isOpen, onClose, driverName }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm ${driverName}. I'll be your driver today.`,
      sender: "driver",
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate driver response after a short delay
    setTimeout(() => {
      const driverResponses = [
        "I'll be there shortly!",
        "Got it, thanks for letting me know.",
        "No problem at all.",
        "I'll wait for you at the pickup location.",
        "Sure, I understand."
      ];
      
      const randomResponse = driverResponses[Math.floor(Math.random() * driverResponses.length)];
      
      const driverMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "driver",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, driverMessage]);
      
      // Show a toast notification
      toast({
        title: "New Message",
        description: `${driverName}: ${randomResponse}`,
      });
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message {driverName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg py-2 px-3 ${
                    message.sender === "user" 
                      ? "bg-rideroot-primary text-white rounded-tr-none" 
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 ${message.sender === "user" ? "text-gray-200" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-2 mt-2">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-[40px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="h-auto"
                disabled={newMessage.trim() === ""}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;

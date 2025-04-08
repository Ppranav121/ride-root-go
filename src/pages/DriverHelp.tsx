
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, MessageCircle, HelpCircle, ChevronRight, Shield, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";

interface SupportCase {
  id: string;
  title: string;
  date: string;
  status: "open" | "resolved";
  type: string;
}

const DriverHelp: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [supportCases, setSupportCases] = useState<SupportCase[]>([
    {
      id: "SC-123456",
      title: "Payment issue with ride #R-98765",
      date: "April 5, 2025",
      status: "resolved",
      type: "Payment"
    },
    {
      id: "SC-123457",
      title: "Rider behavior report",
      date: "April 7, 2025",
      status: "open",
      type: "Safety"
    }
  ]);
  
  // Simulated FAQ data
  const faqs = [
    {
      question: "How do I update my vehicle information?",
      answer: "Go to your Driver Profile page, then tap on 'Vehicle Information'. From there, you can update details like car model, color, and license plate."
    },
    {
      question: "How do Prime Driver benefits work?",
      answer: "As a Prime Driver, you pay $19.99 weekly plus $1 per ride, but get benefits like priority ride assignments, 5 free cancellations per day, and peak-time bonuses of $0.50 per ride during busy hours."
    },
    {
      question: "What should I do if a rider leaves an item in my car?",
      answer: "If you find an item left by a rider, report it immediately through the app. Go to 'Help Center', then 'Report Lost Item'. We'll connect you with the rider to arrange return."
    },
    {
      question: "How do I change my payment information?",
      answer: "To update your payment details, go to Account > Payment Information. From there, you can add, edit, or remove payment methods."
    },
    {
      question: "What happens if I need to cancel a ride?",
      answer: "If you need to cancel a ride, open the ride details and tap 'Cancel Ride'. Prime Drivers get 5 free cancellations per day, while standard drivers may incur a cancellation fee."
    }
  ];
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    toast({
      title: "Message Sent",
      description: "Support will respond to your inquiry soon.",
    });
    
    setMessage("");
    
    // Simulate support response
    setTimeout(() => {
      setShowChat(false);
      toast({
        title: "Support Response",
        description: "A support agent has responded to your inquiry. Check your messages.",
      });
      
      // Add a new case to the list
      setSupportCases(prev => [
        {
          id: `SC-${Math.floor(100000 + Math.random() * 900000)}`,
          title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          status: "open",
          type: "General"
        },
        ...prev
      ]);
    }, 3000);
  };
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Help Center" />
      
      <div className="flex-1 overflow-auto p-4 pb-24">
        {/* Emergency Support */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-500 to-red-600 rounded-xl p-4 mb-5 shadow-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white font-medium text-lg flex items-center">
                <Shield size={20} className="mr-2" />
                Emergency Support
              </h2>
              <p className="text-white/90 text-sm mt-1">
                Safety concern or urgent issue?
              </p>
            </div>
            
            <Button 
              size="sm" 
              className="bg-white text-red-600 hover:bg-white/90"
              onClick={() => {
                toast({
                  title: "Connecting to emergency support",
                  description: "An agent will assist you immediately.",
                });
              }}
            >
              <Phone size={16} className="mr-1" />
              Contact Now
            </Button>
          </div>
        </motion.div>
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for help articles..."
            className="pl-10 py-6 bg-white rounded-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 bg-white border-gray-200 hover:bg-gray-50"
            onClick={() => setShowChat(true)}
          >
            <MessageCircle size={24} className="mb-2 text-rideroot-primary" />
            <span className="text-sm font-medium">Chat with Support</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 bg-white border-gray-200 hover:bg-gray-50"
            onClick={() => {
              toast({
                title: "Checking connection...",
                description: "Your app connection is working properly.",
              });
            }}
          >
            <HelpCircle size={24} className="mb-2 text-blue-500" />
            <span className="text-sm font-medium">Troubleshoot App</span>
          </Button>
        </div>
        
        {/* Support Cases */}
        {supportCases.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <Clock size={18} className="mr-2 text-gray-500" />
              Your Support Cases
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden divide-y divide-gray-100">
              {supportCases.map(supportCase => (
                <div key={supportCase.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${supportCase.status === 'open' ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></span>
                      <h3 className="font-medium">{supportCase.title}</h3>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span>{supportCase.id}</span>
                      <span className="mx-2">•</span>
                      <span>{supportCase.date}</span>
                      <span className="mx-2">•</span>
                      <span>{supportCase.type}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* FAQs */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3 flex items-center">
            <HelpCircle size={18} className="mr-2 text-gray-500" />
            Frequently Asked Questions
          </h2>
          
          {filteredFaqs.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <AlertCircle size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No FAQs match your search.</p>
            </div>
          )}
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* Support Chat */}
      {showChat && (
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          className="fixed bottom-0 inset-x-0 bg-white rounded-t-xl shadow-lg z-40 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Chat with Support</h2>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowChat(false)}
            >
              Close
            </Button>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4 h-60 overflow-y-auto">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg inline-block max-w-[80%]">
              <p className="text-sm">Hello, how can we help you today?</p>
              <span className="text-xs text-blue-600 mt-1 block">Support • Just now</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              Send
            </Button>
          </div>
        </motion.div>
      )}
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverHelp;

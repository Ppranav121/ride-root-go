
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HelpCircle, MessageCircle, Phone, Search, ArrowRight, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// FAQ topics
const faqTopics = [
  {
    id: "account",
    title: "Account & Profile",
    icon: User,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "earnings",
    title: "Earnings & Payments",
    icon: BarChart2,
    color: "bg-green-100 text-green-600"
  },
  {
    id: "rides",
    title: "Ride Issues",
    icon: Car,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: Settings,
    color: "bg-amber-100 text-amber-600"
  }
];

// FAQ questions by topic
const faqQuestions: Record<string, Array<{question: string, answer: string}>> = {
  account: [
    {
      question: "How do I update my vehicle information?",
      answer: "To update your vehicle information, go to Profile > Vehicle Details > Edit. Make sure to upload clear photos of your vehicle and registration documents for verification."
    },
    {
      question: "Why was my vehicle registration rejected?",
      answer: "Vehicle registrations may be rejected if the documents provided are unclear, expired, or don't match our requirements. Check for any notification in your inbox explaining the specific reason."
    },
    {
      question: "How do I change my profile picture?",
      answer: "You can change your profile picture by going to Profile > Personal Details > Edit Profile Picture. Select a clear, front-facing photo of yourself."
    },
  ],
  earnings: [
    {
      question: "When do I get paid?",
      answer: "Payments are processed every Monday for the previous week's earnings. Depending on your bank, funds typically arrive in 1-3 business days after processing."
    },
    {
      question: "How are my earnings calculated?",
      answer: "Your earnings are calculated based on base fare + distance + time + any applicable bonuses or surge pricing, minus the platform fee."
    },
    {
      question: "Why is there a discrepancy in my earnings?",
      answer: "Earnings discrepancies might occur due to rider adjustments, cancellation fees, or promotional credits. Check your detailed ride history for a breakdown of each ride's earnings."
    },
  ],
  rides: [
    {
      question: "What if a rider cancels mid-ride?",
      answer: "If a rider cancels after you've already started the ride, you'll be compensated for the distance driven up to the cancellation point plus a cancellation fee."
    },
    {
      question: "How do I report inappropriate rider behavior?",
      answer: "After completing a ride, you can report inappropriate behavior through the ride details screen. For urgent situations, use the emergency help button during the ride."
    },
    {
      question: "What if I need to cancel a ride after accepting it?",
      answer: "You can cancel a ride after accepting, but excessive cancellations may affect your acceptance rate and access to premium features. Prime drivers get 5 free cancellations per day."
    },
  ],
  technical: [
    {
      question: "The app is freezing or crashing",
      answer: "Try closing and reopening the app. If issues persist, try logging out, restarting your device, and logging back in. Make sure your app is updated to the latest version."
    },
    {
      question: "I'm not receiving ride notifications",
      answer: "Check your phone's notification settings for RideRoot. Also ensure that battery optimization is disabled for the app and that you have a stable internet connection."
    },
    {
      question: "GPS inaccuracy issues",
      answer: "For GPS issues, make sure location services are enabled with 'High Accuracy' mode. Try calibrating your compass by moving your phone in a figure-8 pattern."
    },
  ]
};

// Support team availability schedule
const supportAvailability = [
  { day: "Monday-Friday", hours: "8:00 AM - 10:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 8:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
];

const DriverHelp: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState("account");
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Filter questions based on search query
  const filteredQuestions = searchQuery
    ? Object.values(faqQuestions).flat().filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqQuestions[selectedTopic];
  
  const handleSendMessage = () => {
    if (contactMessage.trim() === "") return;
    
    // Close sheet and show success message
    setIsContactSheetOpen(false);
    setShowSuccessMessage(true);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "A support representative will respond shortly.",
    });
    
    // Reset form after a delay
    setTimeout(() => {
      setContactMessage("");
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Help Center" />
      
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Search bar */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search help articles..."
              className="pl-10 pr-4 h-11 bg-gray-100 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-4">
          {/* Success message */}
          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Message Sent Successfully</p>
                  <p className="text-xs text-green-600">We'll get back to you soon</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!searchQuery ? (
            <>
              {/* Topic selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {faqTopics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-3 rounded-lg flex items-center border transition-all ${
                        selectedTopic === topic.id 
                          ? "border-rideroot-primary bg-blue-50" 
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${topic.color} flex items-center justify-center mr-3`}>
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium">{topic.title}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Topic FAQs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold">
                    {faqTopics.find(t => t.id === selectedTopic)?.title} FAQ
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {faqQuestions[selectedTopic].map((item, index) => (
                    <Details key={index} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Search results */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold">
                    Search Results {filteredQuestions.length > 0 && `(${filteredQuestions.length})`}
                  </h3>
                </div>
                {filteredQuestions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredQuestions.map((item, index) => (
                      <Details key={index} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HelpCircle size={24} className="text-gray-400" />
                    </div>
                    <h4 className="font-medium mb-1">No results found</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Try different keywords or contact our support team
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsContactSheetOpen(true)}
                      className="mx-auto"
                    >
                      Contact Support
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Contact support section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Contact Support</h3>
            </div>
            <div className="p-4">
              <Tabs defaultValue="chat">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageCircle size={16} className="mr-2" /> Chat
                  </TabsTrigger>
                  <TabsTrigger value="call" className="flex-1">
                    <Phone size={16} className="mr-2" /> Call
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="mt-0">
                  <Button 
                    className="w-full bg-rideroot-primary hover:bg-rideroot-primary/90 mb-4"
                    onClick={() => setIsContactSheetOpen(true)}
                  >
                    Start Chat Support <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    Average response time: 5 minutes
                  </p>
                </TabsContent>
                <TabsContent value="call" className="mt-0">
                  <Button 
                    className="w-full bg-rideroot-primary hover:bg-rideroot-primary/90 mb-4"
                    onClick={() => {
                      toast({
                        title: "Initiating Call",
                        description: "Connecting you to driver support...",
                      });
                    }}
                  >
                    Call Driver Support <Phone size={16} className="ml-2" />
                  </Button>
                  <div className="space-y-2">
                    {supportAvailability.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.day}</span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Support Sheet */}
      <Sheet open={isContactSheetOpen} onOpenChange={setIsContactSheetOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Contact Support</SheetTitle>
            <SheetDescription>
              Describe your issue and a support representative will assist you shortly.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="issue-type" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type
              </label>
              <select 
                id="issue-type" 
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option>Account & Profile</option>
                <option>Earnings & Payments</option>
                <option>Ride Issues</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail..."
                className="min-h-[120px]"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 pt-4">
              <Button
                className="flex-1 bg-rideroot-primary hover:bg-rideroot-primary/90"
                onClick={handleSendMessage}
                disabled={!contactMessage.trim()}
              >
                Send Message
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <DriverBottomNav />
    </div>
  );
};

// FAQ Details Component
const Details = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <button
        className="w-full text-left p-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-medium text-gray-900">{question}</h4>
        <ArrowRight 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <p className="text-gray-600 text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Required imports
import { User, BarChart2, Car, Settings } from "lucide-react";

export default DriverHelp;

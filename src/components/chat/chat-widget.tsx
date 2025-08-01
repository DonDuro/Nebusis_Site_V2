import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  conversationId: number;
  senderId?: number | null;
  senderType: string;
  senderName: string;
  message: string;
  messageType: string;
  metadata?: any;
  isRead?: boolean;
  createdAt?: Date;
}

interface ChatConversation {
  id: number;
  userId?: number | null;
  supportAgentId?: number | null;
  ticketId?: string | null;
  status: string;
  subject?: string | null;
  priority: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState<ChatConversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !conversation) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    try {
      // Create a new conversation for guest users
      const response = await apiRequest("POST", "/api/chat/conversations", {
        userId: null, // Guest user
        status: "active",
        subject: "Support Chat",
        priority: "medium",
        category: "general"
      });

      const newConversation = await response.json();
      setConversation(newConversation);
      
      // Connect to WebSocket
      connectWebSocket(newConversation.id);
      
      // Add welcome message
      setTimeout(() => {
        addSystemMessage("Hello! Welcome to Nebusis® support. How can we help you today?");
      }, 500);
      
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      toast({
        title: "Chat Error",
        description: "Unable to start chat session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const connectWebSocket = (conversationId: number) => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    ws.current = new WebSocket(wsUrl);
    
    ws.current.onopen = () => {
      setIsConnected(true);
      // Join the conversation
      ws.current?.send(JSON.stringify({
        type: 'join_conversation',
        conversationId: conversationId
      }));
    };
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'new_message') {
        setMessages(prev => [...prev, data.data]);
      }
      
      if (data.type === 'agent_typing') {
        setIsTyping(data.isTyping);
      }
    };
    
    ws.current.onclose = () => {
      setIsConnected(false);
    };
    
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };
  };

  const addSystemMessage = (text: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now(),
      conversationId: conversation?.id || 0,
      senderType: "system",
      senderName: "Nebusis® Support",
      message: text,
      messageType: "text",
      createdAt: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;
    
    const messageData = {
      conversationId: conversation.id,
      senderId: null, // Guest user
      senderType: "user",
      senderName: "Guest",
      message: newMessage.trim(),
      messageType: "text",
      isRead: false
    };

    try {
      // Send via WebSocket for real-time
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({
          type: 'send_message',
          ...messageData
        }));
      } else {
        // Fallback to API
        await apiRequest("POST", "/api/chat/messages", messageData);
      }
      
      setNewMessage("");
      
      // Simulate agent response after a delay
      setTimeout(() => {
        simulateAgentResponse();
      }, 2000);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Message Failed",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const simulateAgentResponse = () => {
    const responses = [
      "Thank you for contacting Nebusis® support. Let me check that for you.",
      "I understand your concern. Our team will help you resolve this issue.",
      "Great question! Let me provide you with some information about our services.",
      "I'll connect you with a specialist who can better assist with your request.",
      "That's a common question. Here's what I can tell you about our platform."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'send_message',
        conversationId: conversation?.id,
        senderId: null,
        senderType: "agent",
        senderName: "Support Agent",
        message: randomResponse,
        messageType: "text",
        isRead: false
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    if (ws.current) {
      ws.current.close();
    }
    setMessages([]);
    setConversation(null);
    setIsConnected(false);
  };

  const formatMessageTime = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getMessageIcon = (senderType: string) => {
    switch (senderType) {
      case "agent":
      case "system":
        return <Bot className="w-4 h-4" />;
      case "user":
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="flex-shrink-0 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Nebusis® Support</CardTitle>
                <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
                  {isConnected ? "Online" : "Offline"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeChat}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.senderType === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.senderType !== "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {getMessageIcon(message.senderType)}
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.senderType === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.senderType === "system"
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      {message.senderType !== "user" && message.senderType !== "system" && (
                        <div className="text-xs font-medium mb-1 opacity-70">
                          {message.senderName}
                        </div>
                      )}
                      <div className="text-sm">{message.message}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {formatMessageTime(message.createdAt)}
                      </div>
                    </div>

                    {message.senderType === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {getMessageIcon(message.senderType)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg px-3 py-2">
                      <div className="text-sm text-muted-foreground">Support agent is typing...</div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex-shrink-0 p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || !isConnected}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
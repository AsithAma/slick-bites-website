
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const EmailConfig: React.FC = () => {
  const [serviceId, setServiceId] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { toast } = useToast();

  // Load saved configuration on component mount
  useEffect(() => {
    const savedServiceId = localStorage.getItem("emailjs_service_id");
    const savedTemplateId = localStorage.getItem("emailjs_template_id");
    const savedUserId = localStorage.getItem("emailjs_user_id");
    
    if (savedServiceId) setServiceId(savedServiceId);
    if (savedTemplateId) setTemplateId(savedTemplateId);
    if (savedUserId) setUserId(savedUserId);
    
    setIsSaved(!!(savedServiceId && savedTemplateId && savedUserId));
  }, []);

  const handleSave = () => {
    // Validate inputs
    if (!serviceId || !templateId || !userId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all EmailJS configuration fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    localStorage.setItem("emailjs_service_id", serviceId);
    localStorage.setItem("emailjs_template_id", templateId);
    localStorage.setItem("emailjs_user_id", userId);
    
    // Initialize EmailJS with the user ID
    emailjs.init(userId);
    
    setIsSaved(true);
    
    toast({
      title: "Configuration Saved",
      description: "EmailJS configuration has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure your EmailJS account to send reservation emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Service ID</Label>
            <Input
              id="serviceId"
              placeholder="Enter your EmailJS Service ID"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="templateId">Template ID</Label>
            <Input
              id="templateId"
              placeholder="Enter your EmailJS Template ID"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="Enter your EmailJS User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleSave}
            className="w-full"
          >
            Save Configuration
          </Button>
          
          {isSaved && (
            <div className="text-sm text-green-600 text-center">
              Configuration saved. Emails will be sent using your EmailJS account.
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-4 space-y-2">
            <p>
              <strong>Instructions:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Create a free account on <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EmailJS.com</a></li>
              <li>Create an email service and note your Service ID</li>
              <li>Create an email template with variables: to_name, to_email, subject, message, etc.</li>
              <li>Copy your User ID from the account dashboard</li>
              <li>Enter these details above and save</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailConfig;

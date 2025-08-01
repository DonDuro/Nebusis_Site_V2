import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: "default" | "compact";
  className?: string;
}

export default function NewsletterForm({ variant = "default", className = "" }: NewsletterFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const response = await apiRequest("POST", "/api/newsletter-subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed Successfully",
        description: "Thank you for subscribing to our newsletter!",
      });
      setIsSubmitted(true);
      form.reset();
      
      // Reset the submitted state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: NewsletterFormData) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-green-600 font-medium mb-2">✓ Successfully subscribed!</div>
        <p className="text-sm text-gray-600">Thank you for joining our newsletter.</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex gap-2 ${className}`}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-nebusis text-white hover:bg-[--nebusis-dark] whitespace-nowrap"
          >
            {mutation.isPending ? "..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-nebusis text-white hover:bg-[--nebusis-dark]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
          
          <p className="text-xs text-gray-600 text-center">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </Form>
    </div>
  );
}

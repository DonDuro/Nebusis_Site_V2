import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "bg-nebusis-primary text-white";
      case "case-studies":
        return "bg-green-100 text-green-800";
      case "announcements":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "case-studies":
        return "Case Study";
      case "announcements":
        return "Announcement";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  // Estimate reading time (average 200 words per minute)
  const estimateReadingTime = (text: string) => {
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  return (
    <Card className="card-hover group">
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(post.category)}>
            {getCategoryLabel(post.category)}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {estimateReadingTime(post.content)} min read
          </div>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-[hsl(221,83%,53%)] transition-colors">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            {post.publishedAt && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-[hsl(221,83%,53%)] hover:text-[hsl(221,83%,45%)] hover:bg-blue-50">
            Read More
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

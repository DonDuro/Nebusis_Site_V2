import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Search, Filter, Clock, Eye, 
  VideoIcon, PlayCircle, Volume2, Download,
  BookOpen, Users
} from "lucide-react";
import { Video } from "@/lib/types";
import { Link } from "wouter";

export default function VideoGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: videos = [], isLoading, error } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || video.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Group videos by category
  const videosByCategory = {
    compliance: filteredVideos.filter(v => v.category === "compliance"),
    security: filteredVideos.filter(v => v.category === "security"),
    multiomics: filteredVideos.filter(v => v.category === "multiomics"),
    iot: filteredVideos.filter(v => v.category === "iot"),
    demo: filteredVideos.filter(v => v.category === "demo"),
    promotional: filteredVideos.filter(v => v.category === "promotional"),
    tutorial: filteredVideos.filter(v => v.category === "tutorial")
  };

  const categories = ["compliance", "security", "multiomics", "iot", "demo", "promotional", "tutorial"];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="loading-skeleton h-32 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="loading-skeleton h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-xl">Error loading videos</div>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(210,45%,40%)] to-[hsl(210,45%,32%)] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Play className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Media Library</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Nebusis®</span> <span className="text-yellow-400">Video Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">Explore our comprehensive video library</span>
            </p>
            <p className="text-blue-100 text-lg mb-12 max-w-4xl">
              Product Demonstrations • Tutorials • Customer Success Stories
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <Play className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">HD Quality</h3>
                <p className="text-sm opacity-90">Crystal clear video content for optimal viewing</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <BookOpen className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Organized Content</h3>
                <p className="text-sm opacity-90">Categorized videos for easy navigation and discovery</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <Users className="h-10 w-10 mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Regular Updates</h3>
                <p className="text-sm opacity-90">Fresh content added weekly with latest features</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 border border-white border-opacity-20 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-20 right-16 w-6 h-6 bg-yellow-400 bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-4 h-4 border border-yellow-400 border-opacity-40 rounded-sm transform -rotate-45"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-white bg-opacity-20 rounded-full"></div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-4 items-center">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Video Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-4xl">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="compliance">ISO & ESG Compliance</TabsTrigger>
              <TabsTrigger value="security">Security Operations</TabsTrigger>
              <TabsTrigger value="multiomics">Precision Medicine</TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-4 max-w-4xl mt-4">
              <TabsTrigger value="iot">IoT Asset Tracking</TabsTrigger>
              <TabsTrigger value="demo">Product Demos</TabsTrigger>
              <TabsTrigger value="promotional">Promotional</TabsTrigger>
              <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredVideos.length === 0 ? (
                <div className="py-12">
                  <div className="text-gray-500 mb-4 text-lg">No videos found</div>
                  <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                  }}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="compliance">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">The Solution for ISO and ESG Compliance</h3>
                  <p className="text-gray-600">Automated management processes, enhanced risk monitoring, and simplified reporting to meet regulatory standards efficiently</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.compliance.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tools for Enhancing Security Operations</h3>
                  <p className="text-gray-600">Advanced solutions designed to enhance security management through real-time monitoring, automated processes, and data-driven decision making</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.security.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="multiomics">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlocking Precision Medicine Through Multiomics Innovation</h3>
                  <p className="text-gray-600">Streamline multiomics data management, automate compliance documentation, and secure records using AI and blockchain technology</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.multiomics.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="iot">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Improve Asset Tracking with IoT Technology</h3>
                  <p className="text-gray-600">Satellite-powered technology enhances real-time tracking and management of assets, personnel and fleets with ISO standards</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.iot.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demo">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Demonstrations</h3>
                  <p className="text-gray-600">See our applications in action with detailed walkthroughs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.demo.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="promotional">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Promotional Videos</h3>
                  <p className="text-gray-600">Discover the power and potential of Nebusis® solutions</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.promotional.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tutorial">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tutorial Videos</h3>
                  <p className="text-gray-600">Step-by-step guides to help you get the most from our platform</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosByCategory.tutorial.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Nebusis® Live?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see how our solutions can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[hsl(210,45%,40%)] text-white hover:bg-[hsl(210,45%,32%)]">
              <Link href="/demos">
                <Play className="h-5 w-5 mr-2" />
                Request Live Demo
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[hsl(210,45%,40%)] text-[hsl(210,45%,40%)] hover:bg-[hsl(210,45%,40%)] hover:text-white">
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "demo":
        return "bg-blue-100 text-blue-800";
      case "promotional":
        return "bg-green-100 text-green-800";
      case "tutorial":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="card-hover overflow-hidden group">
      <div className="relative">
        {/* Video Thumbnail */}
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          {video.thumbnailUrl ? (
            <img 
              src={video.thumbnailUrl} 
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
              <VideoIcon className="h-12 w-12 text-blue-600" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Play className="h-6 w-6 text-[hsl(221,83%,53%)] ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <Badge className={getCategoryColor(video.category)}>
              {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
        {video.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {video.duration && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {Math.floor(Math.random() * 1000) + 100} views
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-[hsl(221,83%,53%)] hover:text-[hsl(221,83%,45%)] hover:bg-gray-50">
            <PlayCircle className="h-4 w-4 mr-1" />
            Watch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

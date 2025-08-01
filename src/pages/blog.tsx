import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog/blog-card";
import BlogFilters from "@/components/blog/blog-filters";
import { 
  Search, Calendar, User, ArrowRight, 
  BookOpen, TrendingUp, Award, Megaphone
} from "lucide-react";
import { BlogPost } from "@/lib/types";

export default function Blog() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Get category from URL params if present
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const urlCategory = urlParams.get('category');
  
  const { data: blogPosts = [], isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", { published: true }],
  });

  // Filter blog posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const activeCategory = urlCategory || categoryFilter;
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group posts by category
  const postsByCategory = {
    news: filteredPosts.filter(p => p.category === "news"),
    "case-studies": filteredPosts.filter(p => p.category === "case-studies"),
    announcements: filteredPosts.filter(p => p.category === "announcements")
  };

  const categories = [
    { value: "news", label: "News", icon: TrendingUp, count: postsByCategory.news.length },
    { value: "case-studies", label: "Case Studies", icon: Award, count: postsByCategory["case-studies"].length },
    { value: "announcements", label: "Announcements", icon: Megaphone, count: postsByCategory.announcements.length }
  ];

  const featuredPost = filteredPosts.find(post => post.category === "case-studies") || filteredPosts[0];

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
          <div className="text-red-500 mb-4 text-xl">Error loading blog posts</div>
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
      <section className="bg-gradient-to-br from-nebusis-primary to-nebusis-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <BookOpen className="h-5 w-5 text-yellow-300" />
              <span className="font-semibold">Industry Insights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Nebusis®</span> <span className="text-yellow-400">News</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-4xl leading-relaxed">
              <span className="text-yellow-400 font-semibold">Stay informed with the latest insights</span>
            </p>
            <p className="text-blue-100 text-lg mb-12 max-w-4xl">
              News, case studies, and announcements from digital transformation and business automation
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <TrendingUp className="h-10 w-10 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Industry News</h3>
                <p className="text-sm opacity-90">Latest developments in business automation</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Award className="h-10 w-10 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Success Stories</h3>
                <p className="text-sm opacity-90">Real customer implementations and results</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20">
                <Megaphone className="h-10 w-10 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Announcements</h3>
                <p className="text-sm opacity-90">Product updates and company milestones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Article</h2>
              <p className="text-gray-600">Don't miss our latest insights</p>
            </div>
            
            <div className="bg-gradient-to-r from-nebusis-bg to-nebusis-light rounded-2xl p-8 border border-nebusis-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-nebusis-primary text-white">
                      {featuredPost.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <Button className="bg-[hsl(221,83%,53%)] text-white hover:bg-[hsl(221,83%,45%)]">
                      Read Article <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-nebusis-light to-nebusis-accent rounded-xl flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categories={categories}
          />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4 text-lg">No articles found</div>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.filter(post => post.id !== featuredPost?.id).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-[hsl(221,83%,53%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Nebusis®
          </h2>
          <p className="text-xl text-nebusis-bg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important updates, insights, and announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white border-none"
            />
            <Button className="bg-white text-[hsl(221,83%,53%)] hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

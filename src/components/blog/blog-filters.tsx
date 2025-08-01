import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface BlogFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: Array<{
    value: string;
    label: string;
    icon: any;
    count: number;
  }>;
}

export default function BlogFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories
}: BlogFiltersProps) {
  const hasActiveFilters = searchTerm || categoryFilter !== "all";

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("all");
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 items-center">
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={categoryFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange("all")}
          className={categoryFilter === "all" ? "bg-[hsl(221,83%,53%)] text-white" : ""}
        >
          All Articles
        </Button>
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={categoryFilter === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className={`flex items-center gap-2 ${
              categoryFilter === category.value ? "bg-[hsl(221,83%,53%)] text-white" : ""
            }`}
          >
            <category.icon className="h-4 w-4" />
            {category.label}
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchTerm}"
              <button 
                onClick={() => onSearchChange("")} 
                className="ml-1 hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </Badge>
          )}
          {categoryFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.value === categoryFilter)?.label}
              <button 
                onClick={() => onCategoryChange("all")} 
                className="ml-1 hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

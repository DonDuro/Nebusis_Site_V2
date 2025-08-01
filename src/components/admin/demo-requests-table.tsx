import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Calendar, Mail, Phone, Building2, 
  Search, Filter, MoreHorizontal,
  CheckCircle, XCircle, Clock
} from "lucide-react";
import { DemoRequest } from "@/lib/types";

interface DemoRequestsTableProps {
  requests: DemoRequest[];
}

export default function DemoRequestsTable({ requests }: DemoRequestsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "completed":
        return <Badge className="bg-nebusis-primary text-white">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-800 font-medium">Pending</div>
          <div className="text-2xl font-bold text-yellow-900">
            {requests.filter(r => r.status === "pending").length}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-green-800 font-medium">Approved</div>
          <div className="text-2xl font-bold text-green-900">
            {requests.filter(r => r.status === "approved").length}
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-blue-800 font-medium">Completed</div>
          <div className="text-2xl font-bold text-blue-900">
            {requests.filter(r => r.status === "completed").length}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-800 font-medium">Total</div>
          <div className="text-2xl font-bold text-gray-900">
            {requests.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3 font-medium">Contact</th>
              <th className="text-left p-3 font-medium">Company</th>
              <th className="text-left p-3 font-medium">Application</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Requested</th>
              <th className="text-left p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{request.name}</div>
                      <div className="text-gray-500 text-xs flex items-center mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {request.email}
                      </div>
                      {request.phone && (
                        <div className="text-gray-500 text-xs flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {request.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      {request.company}
                    </div>
                  </td>
                  <td className="p-3">
                    {request.applicationId ? (
                      <Badge variant="outline">App #{request.applicationId}</Badge>
                    ) : (
                      <span className="text-gray-400">General</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      {getStatusBadge(request.status)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-gray-600">
                      {formatDate(request.createdAt)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {request.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No demo requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

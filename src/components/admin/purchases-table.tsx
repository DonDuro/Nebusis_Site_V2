import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, MoreHorizontal, DollarSign,
  CheckCircle, XCircle, Clock, CreditCard
} from "lucide-react";
import { Purchase } from "@/lib/types";

interface PurchasesTableProps {
  purchases: Purchase[];
}

export default function PurchasesTable({ purchases }: PurchasesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = 
      purchase.amount.toString().includes(searchTerm) ||
      purchase.itemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.stripePaymentIntentId?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(amount));
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

  const totalRevenue = purchases
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search purchases..."
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
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-green-800 font-medium">Total Revenue</div>
          <div className="text-2xl font-bold text-green-900">
            {formatCurrency(totalRevenue.toString())}
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-blue-800 font-medium">Completed</div>
          <div className="text-2xl font-bold text-blue-900">
            {purchases.filter(p => p.status === "completed").length}
          </div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-800 font-medium">Pending</div>
          <div className="text-2xl font-bold text-yellow-900">
            {purchases.filter(p => p.status === "pending").length}
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-red-800 font-medium">Failed</div>
          <div className="text-2xl font-bold text-red-900">
            {purchases.filter(p => p.status === "failed").length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3 font-medium">Purchase ID</th>
              <th className="text-left p-3 font-medium">Item</th>
              <th className="text-left p-3 font-medium">Amount</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Payment ID</th>
              <th className="text-left p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-mono text-sm">
                      #{purchase.id.toString().padStart(6, '0')}
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="font-medium capitalize">{purchase.itemType}</div>
                      <div className="text-gray-500 text-xs">
                        Item ID: {purchase.itemId}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      <span className="font-medium">{formatCurrency(purchase.amount)}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(purchase.status)}
                      {getStatusBadge(purchase.status)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-gray-600">
                      {formatDate(purchase.createdAt)}
                    </div>
                  </td>
                  <td className="p-3">
                    {purchase.stripePaymentIntentId ? (
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-mono text-xs text-gray-500">
                          {purchase.stripePaymentIntentId.slice(-8)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

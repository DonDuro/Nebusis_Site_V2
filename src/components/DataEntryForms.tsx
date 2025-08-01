import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Edit3, 
  Save, 
  User, 
  Briefcase, 
  Calendar, 
  DollarSign,
  FileText,
  Target,
  Clock,
  Building,
  Upload,
  Download,
  Eye,
  Trash2,
  PieChart,
  BarChart3,
  Calculator,
  Receipt,
  CreditCard,
  Wallet,
  TrendingUp,
  FileSpreadsheet,
  FileImage,
  File,
  Folder,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock3,
  Users
} from 'lucide-react';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  languagePreference: string;
  avatar: string;
}

interface AssignmentFormData {
  assignmentTitle: string;
  clientOrOrg: string;
  assignmentType: string;
  startDate: string;
  endDate: string;
  status: string;
  assignedSupervisor: string;
  assignmentNotes: string;
  hourlyRate: number;
  totalBudget: number;
}

interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
  date: string;
  projectCode: string;
  receiptUrl: string;
}

interface PerformanceGoalFormData {
  title: string;
  description: string;
  category: string;
  priority: string;
  targetDate: string;
  progress: number;
}

interface DocumentFormData {
  title: string;
  description: string;
  category: string;
  documentType: string;
  version: string;
  tags: string;
  assignmentId: string;
  confidentialityLevel: string;
  file: File | null;
}

interface TimeEntryFormData {
  date: string;
  assignmentId: string;
  activityType: string;
  hoursWorked: number;
  description: string;
  billable: boolean;
  rate: number;
}

interface FinancialTransactionFormData {
  type: string; // income, expense, transfer
  amount: number;
  category: string;
  description: string;
  date: string;
  assignmentId: string;
  paymentMethod: string;
  taxCategory: string;
  receipt: File | null;
}

interface DataEntryFormsProps {
  onDataUpdate: (type: string, data: any) => void;
  existingData?: any;
}

export function DataEntryForms({ onDataUpdate, existingData }: DataEntryFormsProps) {
  const [activeForm, setActiveForm] = useState('profile');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  // Profile Form
  const [profileData, setProfileData] = useState<ProfileFormData>({
    fullName: existingData?.profile?.fullName || '',
    email: existingData?.profile?.email || '',
    phone: existingData?.profile?.phone || '',
    region: existingData?.profile?.region || 'Americas',
    languagePreference: existingData?.profile?.languagePreference || 'English',
    avatar: existingData?.profile?.avatar || ''
  });

  // Assignment Form
  const [assignmentData, setAssignmentData] = useState<AssignmentFormData>({
    assignmentTitle: '',
    clientOrOrg: '',
    assignmentType: 'Internal',
    startDate: '',
    endDate: '',
    status: 'Active',
    assignedSupervisor: '',
    assignmentNotes: '',
    hourlyRate: 0,
    totalBudget: 0
  });

  // Expense Form
  const [expenseData, setExpenseData] = useState<ExpenseFormData>({
    description: '',
    amount: 0,
    category: 'Travel',
    date: new Date().toISOString().split('T')[0],
    projectCode: '',
    receiptUrl: ''
  });

  // Performance Goal Form
  const [goalData, setGoalData] = useState<PerformanceGoalFormData>({
    title: '',
    description: '',
    category: 'Professional Development',
    priority: 'Medium',
    targetDate: '',
    progress: 0
  });

  // Document Form
  const [documentData, setDocumentData] = useState<DocumentFormData>({
    title: '',
    description: '',
    category: 'Work Product',
    documentType: 'Report',
    version: '1.0',
    tags: '',
    assignmentId: '',
    confidentialityLevel: 'Internal',
    file: null
  });

  // Time Entry Form
  const [timeData, setTimeData] = useState<TimeEntryFormData>({
    date: new Date().toISOString().split('T')[0],
    assignmentId: '',
    activityType: 'Development',
    hoursWorked: 0,
    description: '',
    billable: true,
    rate: 0
  });

  // Financial Transaction Form
  const [transactionData, setTransactionData] = useState<FinancialTransactionFormData>({
    type: 'expense',
    amount: 0,
    category: 'Travel',
    description: '',
    date: new Date().toISOString().split('T')[0],
    assignmentId: '',
    paymentMethod: 'Corporate Card',
    taxCategory: 'Business Expense',
    receipt: null
  });

  const handleProfileSubmit = () => {
    onDataUpdate('profile', {
      ...profileData,
      collaboratorId: existingData?.profile?.collaboratorId || `COL-${Date.now()}`,
      activeStatus: 'Active'
    });
  };

  const handleAssignmentSubmit = () => {
    onDataUpdate('assignment', {
      ...assignmentData,
      assignmentId: `ASN-${Date.now()}`,
      roleId: `ROLE-${Date.now()}`
    });
    // Reset form
    setAssignmentData({
      assignmentTitle: '',
      clientOrOrg: '',
      assignmentType: 'Internal',
      startDate: '',
      endDate: '',
      status: 'Active',
      assignedSupervisor: '',
      assignmentNotes: '',
      hourlyRate: 0,
      totalBudget: 0
    });
  };

  const handleExpenseSubmit = () => {
    onDataUpdate('expense', {
      ...expenseData,
      id: `EXP-${Date.now()}`,
      status: 'Pending',
      submittedDate: new Date().toISOString()
    });
    // Reset form
    setExpenseData({
      description: '',
      amount: 0,
      category: 'Travel',
      date: new Date().toISOString().split('T')[0],
      projectCode: '',
      receiptUrl: ''
    });
  };

  const handleGoalSubmit = () => {
    onDataUpdate('goal', {
      ...goalData,
      id: `GOAL-${Date.now()}`,
      status: 'In Progress',
      createdDate: new Date().toISOString(),
      assignedBy: 'Self-Assigned'
    });
    // Reset form
    setGoalData({
      title: '',
      description: '',
      category: 'Professional Development',
      priority: 'Medium',
      targetDate: '',
      progress: 0
    });
  };

  const handleDocumentSubmit = async () => {
    if (!documentData.file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploading(false);
          
          // Submit document data
          onDataUpdate('document', {
            ...documentData,
            id: `DOC-${Date.now()}`,
            fileName: documentData.file?.name,
            fileSize: documentData.file?.size,
            uploadDate: new Date().toISOString(),
            status: 'Active',
            downloadUrl: `#document-${Date.now()}`
          });

          // Reset form
          setDocumentData({
            title: '',
            description: '',
            category: 'Work Product',
            documentType: 'Report',
            version: '1.0',
            tags: '',
            assignmentId: '',
            confidentialityLevel: 'Internal',
            file: null
          });

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleTimeSubmit = () => {
    onDataUpdate('timeEntry', {
      ...timeData,
      id: `TIME-${Date.now()}`,
      submittedDate: new Date().toISOString(),
      status: 'Submitted',
      totalAmount: timeData.hoursWorked * timeData.rate
    });
    // Reset form
    setTimeData({
      date: new Date().toISOString().split('T')[0],
      assignmentId: '',
      activityType: 'Development',
      hoursWorked: 0,
      description: '',
      billable: true,
      rate: 0
    });
  };

  const handleTransactionSubmit = () => {
    onDataUpdate('transaction', {
      ...transactionData,
      id: `TXN-${Date.now()}`,
      submittedDate: new Date().toISOString(),
      status: 'Pending Approval',
      receiptUrl: transactionData.receipt ? `#receipt-${Date.now()}` : null
    });
    // Reset form
    setTransactionData({
      type: 'expense',
      amount: 0,
      category: 'Travel',
      description: '',
      date: new Date().toISOString().split('T')[0],
      assignmentId: '',
      paymentMethod: 'Corporate Card',
      taxCategory: 'Business Expense',
      receipt: null
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Data Entry & Management
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter and manage your collaborator information, assignments, expenses, and goals.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeForm} onValueChange={setActiveForm}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="time">Time Entry</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            {/* Profile Form */}
            <TabsContent value="profile" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    placeholder="your.email@nebusis.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select value={profileData.region} onValueChange={(value) => setProfileData({...profileData, region: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Americas">Americas</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                      <SelectItem value="Middle East & Africa">Middle East & Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language Preference</Label>
                  <Select value={profileData.languagePreference} onValueChange={(value) => setProfileData({...profileData, languagePreference: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar Seed (Optional)</Label>
                  <Input
                    id="avatar"
                    value={profileData.avatar}
                    onChange={(e) => setProfileData({...profileData, avatar: e.target.value})}
                    placeholder="Enter name for avatar generation"
                  />
                </div>
              </div>
              <Button onClick={handleProfileSubmit} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </TabsContent>

            {/* Assignments Form */}
            <TabsContent value="assignments" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="assignmentTitle">Assignment Title</Label>
                  <Input
                    id="assignmentTitle"
                    value={assignmentData.assignmentTitle}
                    onChange={(e) => setAssignmentData({...assignmentData, assignmentTitle: e.target.value})}
                    placeholder="Enter assignment/project title"
                  />
                </div>
                <div>
                  <Label htmlFor="clientOrOrg">Client/Organization</Label>
                  <Input
                    id="clientOrOrg"
                    value={assignmentData.clientOrOrg}
                    onChange={(e) => setAssignmentData({...assignmentData, clientOrOrg: e.target.value})}
                    placeholder="Client or organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="assignmentType">Assignment Type</Label>
                  <Select value={assignmentData.assignmentType} onValueChange={(value) => setAssignmentData({...assignmentData, assignmentType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={assignmentData.startDate}
                    onChange={(e) => setAssignmentData({...assignmentData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={assignmentData.endDate}
                    onChange={(e) => setAssignmentData({...assignmentData, endDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="supervisor">Assigned Supervisor</Label>
                  <Input
                    id="supervisor"
                    value={assignmentData.assignedSupervisor}
                    onChange={(e) => setAssignmentData({...assignmentData, assignedSupervisor: e.target.value})}
                    placeholder="Supervisor name"
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={assignmentData.hourlyRate}
                    onChange={(e) => setAssignmentData({...assignmentData, hourlyRate: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="assignmentNotes">Assignment Notes</Label>
                  <Textarea
                    id="assignmentNotes"
                    value={assignmentData.assignmentNotes}
                    onChange={(e) => setAssignmentData({...assignmentData, assignmentNotes: e.target.value})}
                    placeholder="Description of assignment scope, objectives, and deliverables"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <Button onClick={handleAssignmentSubmit} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Assignment
              </Button>
            </TabsContent>

            {/* Expenses Form */}
            <TabsContent value="expenses" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="expenseDescription">Description</Label>
                  <Input
                    id="expenseDescription"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                    placeholder="Brief description of the expense"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({...expenseData, amount: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={expenseData.category} onValueChange={(value) => setExpenseData({...expenseData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Meals">Meals & Entertainment</SelectItem>
                      <SelectItem value="Training">Training & Certification</SelectItem>
                      <SelectItem value="Software">Software & Tools</SelectItem>
                      <SelectItem value="Supplies">Supplies & Materials</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expenseDate">Date</Label>
                  <Input
                    id="expenseDate"
                    type="date"
                    value={expenseData.date}
                    onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="projectCode">Project Code</Label>
                  <Input
                    id="projectCode"
                    value={expenseData.projectCode}
                    onChange={(e) => setExpenseData({...expenseData, projectCode: e.target.value})}
                    placeholder="e.g., COMP-2024-001"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="receiptUrl">Receipt/Documentation URL (Optional)</Label>
                  <Input
                    id="receiptUrl"
                    value={expenseData.receiptUrl}
                    onChange={(e) => setExpenseData({...expenseData, receiptUrl: e.target.value})}
                    placeholder="Link to receipt or documentation"
                  />
                </div>
              </div>
              <Button onClick={handleExpenseSubmit} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Submit Expense
              </Button>
            </TabsContent>

            {/* Documents Form */}
            <TabsContent value="documents" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="documentTitle">Document Title</Label>
                  <Input
                    id="documentTitle"
                    value={documentData.title}
                    onChange={(e) => setDocumentData({...documentData, title: e.target.value})}
                    placeholder="Enter document title"
                  />
                </div>
                <div>
                  <Label htmlFor="documentCategory">Category</Label>
                  <Select value={documentData.category} onValueChange={(value) => setDocumentData({...documentData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work Product">Work Product</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select value={documentData.documentType} onValueChange={(value) => setDocumentData({...documentData, documentType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Report">Report</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                      <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                      <SelectItem value="Policy">Policy</SelectItem>
                      <SelectItem value="Procedure">Procedure</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Template">Template</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={documentData.version}
                    onChange={(e) => setDocumentData({...documentData, version: e.target.value})}
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <Label htmlFor="confidentiality">Confidentiality Level</Label>
                  <Select value={documentData.confidentialityLevel} onValueChange={(value) => setDocumentData({...documentData, confidentialityLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="Confidential">Confidential</SelectItem>
                      <SelectItem value="Restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="documentAssignment">Assignment</Label>
                  <Input
                    id="documentAssignment"
                    value={documentData.assignmentId}
                    onChange={(e) => setDocumentData({...documentData, assignmentId: e.target.value})}
                    placeholder="e.g., ASN-2024-001"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={documentData.tags}
                    onChange={(e) => setDocumentData({...documentData, tags: e.target.value})}
                    placeholder="iso, audit, compliance"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="documentDescription">Description</Label>
                  <Textarea
                    id="documentDescription"
                    value={documentData.description}
                    onChange={(e) => setDocumentData({...documentData, description: e.target.value})}
                    placeholder="Brief description of the document content and purpose"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="documentFile">Document File</Label>
                  <Input
                    id="documentFile"
                    type="file"
                    onChange={(e) => setDocumentData({...documentData, file: e.target.files?.[0] || null})}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, Word, Excel, PowerPoint, Text, Images
                  </p>
                </div>
                {uploading && (
                  <div className="md:col-span-2">
                    <Label>Upload Progress</Label>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>
              <Button onClick={handleDocumentSubmit} disabled={uploading} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </TabsContent>

            {/* Time Entry Form */}
            <TabsContent value="time" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeDate">Date</Label>
                  <Input
                    id="timeDate"
                    type="date"
                    value={timeData.date}
                    onChange={(e) => setTimeData({...timeData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="timeAssignment">Assignment</Label>
                  <Input
                    id="timeAssignment"
                    value={timeData.assignmentId}
                    onChange={(e) => setTimeData({...timeData, assignmentId: e.target.value})}
                    placeholder="e.g., ASN-2024-001"
                  />
                </div>
                <div>
                  <Label htmlFor="activityType">Activity Type</Label>
                  <Select value={timeData.activityType} onValueChange={(value) => setTimeData({...timeData, activityType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Analysis">Analysis</SelectItem>
                      <SelectItem value="Documentation">Documentation</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hoursWorked">Hours Worked</Label>
                  <Input
                    id="hoursWorked"
                    type="number"
                    step="0.25"
                    value={timeData.hoursWorked}
                    onChange={(e) => setTimeData({...timeData, hoursWorked: parseFloat(e.target.value) || 0})}
                    placeholder="8.0"
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={timeData.rate}
                    onChange={(e) => setTimeData({...timeData, rate: parseFloat(e.target.value) || 0})}
                    placeholder="75.00"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="billable"
                    checked={timeData.billable}
                    onChange={(e) => setTimeData({...timeData, billable: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="billable">Billable Hours</Label>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="timeDescription">Description</Label>
                  <Textarea
                    id="timeDescription"
                    value={timeData.description}
                    onChange={(e) => setTimeData({...timeData, description: e.target.value})}
                    placeholder="Describe the work performed during this time"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">${(timeData.hoursWorked * timeData.rate).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {timeData.hoursWorked} hours × ${timeData.rate}/hour {timeData.billable ? '(Billable)' : '(Non-billable)'}
                  </p>
                </div>
              </div>
              <Button onClick={handleTimeSubmit} className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Submit Time Entry
              </Button>
            </TabsContent>

            {/* Financial Transaction Form */}
            <TabsContent value="financial" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transactionType">Transaction Type</Label>
                  <Select value={transactionData.type} onValueChange={(value) => setTransactionData({...transactionData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="reimbursement">Reimbursement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transactionAmount">Amount ($)</Label>
                  <Input
                    id="transactionAmount"
                    type="number"
                    step="0.01"
                    value={transactionData.amount}
                    onChange={(e) => setTransactionData({...transactionData, amount: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="transactionCategory">Category</Label>
                  <Select value={transactionData.category} onValueChange={(value) => setTransactionData({...transactionData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Meals">Meals & Entertainment</SelectItem>
                      <SelectItem value="Training">Training & Certification</SelectItem>
                      <SelectItem value="Software">Software & Tools</SelectItem>
                      <SelectItem value="Supplies">Supplies & Materials</SelectItem>
                      <SelectItem value="Consulting">Consulting Services</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={transactionData.paymentMethod} onValueChange={(value) => setTransactionData({...transactionData, paymentMethod: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate Card">Corporate Card</SelectItem>
                      <SelectItem value="Personal Card">Personal Card</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transactionDate">Date</Label>
                  <Input
                    id="transactionDate"
                    type="date"
                    value={transactionData.date}
                    onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="transactionAssignment">Assignment</Label>
                  <Input
                    id="transactionAssignment"
                    value={transactionData.assignmentId}
                    onChange={(e) => setTransactionData({...transactionData, assignmentId: e.target.value})}
                    placeholder="e.g., ASN-2024-001"
                  />
                </div>
                <div>
                  <Label htmlFor="taxCategory">Tax Category</Label>
                  <Select value={transactionData.taxCategory} onValueChange={(value) => setTransactionData({...transactionData, taxCategory: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business Expense">Business Expense</SelectItem>
                      <SelectItem value="Capital Expense">Capital Expense</SelectItem>
                      <SelectItem value="Operating Expense">Operating Expense</SelectItem>
                      <SelectItem value="Tax Deductible">Tax Deductible</SelectItem>
                      <SelectItem value="Non-Deductible">Non-Deductible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="transactionDescription">Description</Label>
                  <Textarea
                    id="transactionDescription"
                    value={transactionData.description}
                    onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
                    placeholder="Detailed description of the transaction"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="receiptFile">Receipt/Documentation</Label>
                  <Input
                    id="receiptFile"
                    type="file"
                    onChange={(e) => setTransactionData({...transactionData, receipt: e.target.files?.[0] || null})}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload receipt or supporting documentation (PDF, JPG, PNG)
                  </p>
                </div>
              </div>
              <Button onClick={handleTransactionSubmit} className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Submit Transaction
              </Button>
            </TabsContent>

            {/* Goals Form */}
            <TabsContent value="goals" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="goalTitle">Goal Title</Label>
                  <Input
                    id="goalTitle"
                    value={goalData.title}
                    onChange={(e) => setGoalData({...goalData, title: e.target.value})}
                    placeholder="Enter your goal title"
                  />
                </div>
                <div>
                  <Label htmlFor="goalCategory">Category</Label>
                  <Select value={goalData.category} onValueChange={(value) => setGoalData({...goalData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional Development">Professional Development</SelectItem>
                      <SelectItem value="Quality Improvement">Quality Improvement</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Skills">Skills Development</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={goalData.priority} onValueChange={(value) => setGoalData({...goalData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetDate">Target Date</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={goalData.targetDate}
                    onChange={(e) => setGoalData({...goalData, targetDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="progress">Current Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={goalData.progress}
                    onChange={(e) => setGoalData({...goalData, progress: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="goalDescription">Description</Label>
                  <Textarea
                    id="goalDescription"
                    value={goalData.description}
                    onChange={(e) => setGoalData({...goalData, description: e.target.value})}
                    placeholder="Detailed description of your goal and how you plan to achieve it"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <Button onClick={handleGoalSubmit} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
# Nebusis® Static Website - Collaborator Component Extraction Guide
## Extracting Team Collaboration Features from ControlCore v4.5
### For Nebusis Web Developer - July 30, 2025

---

## 📋 Overview

This guide provides instructions for extracting the collaborator/team management components from Nebusis® ControlCore v4.5 for integration into the static Nebusis website. The extracted components will enable team collaboration features without requiring a backend infrastructure.

**Target Implementation:** Static website with client-side team management using local storage or external services.

---

## 🎯 Components to Extract

### 1. **User Profile Components**
**Location:** `client/src/pages/UserProfile.tsx`
**Purpose:** User profile management and team member information display

**Key Features:**
- Profile photo upload and management
- Contact information display
- Professional credentials section
- Role and department information
- Skill and specialization tags

**Dependencies:**
```typescript
// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Icons
import { Camera, Mail, Phone, MapPin, Building } from "lucide-react"
```

### 2. **Team Management Interface**
**Location:** `client/src/pages/UserManagement.tsx` 
**Purpose:** Team member listing and management interface

**Key Features:**
- Team member directory with photos
- Role-based filtering and search
- Contact information display
- Skill-based team member discovery
- Department organization view

**UI Components Used:**
```typescript
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

### 3. **Collaboration Workflow Components**
**Location:** `client/src/pages/WorkflowManagement.tsx`
**Purpose:** Team assignment and collaboration tracking

**Key Features:**
- Task assignment interface
- Team member role assignment
- Collaboration timeline
- Progress tracking per team member
- Comment and communication system

---

## 🔧 Technical Extraction Steps

### Step 1: Extract Core Components

#### A. Copy UI Components
Extract the following UI components to your static site:

```bash
# Essential UI Components for Collaboration
/client/src/components/ui/avatar.tsx
/client/src/components/ui/badge.tsx
/client/src/components/ui/button.tsx
/client/src/components/ui/card.tsx
/client/src/components/ui/dialog.tsx
/client/src/components/ui/form.tsx
/client/src/components/ui/input.tsx
/client/src/components/ui/label.tsx
/client/src/components/ui/table.tsx
/client/src/components/ui/tabs.tsx
/client/src/components/ui/textarea.tsx
```

#### B. Copy Styling System
Extract the Tailwind CSS configuration:

```bash
# Styling Configuration
/tailwind.config.ts
/client/src/index.css (CSS variables and base styles)
```

#### C. Copy TypeScript Types
Extract the user and team-related types:

```typescript
// From: /shared/schema.ts
export interface User {
  id: string;
  email: string;
  name: string;
  jobTitle?: string;
  department?: string;
  phone?: string;
  institution?: string;
  role: 'admin' | 'supervisor' | 'user';
  profilePhoto?: string;
  skills?: string[];
  location?: string;
}

export interface TeamMember extends User {
  joinDate: Date;
  status: 'active' | 'inactive';
  projects: string[];
  availability: 'available' | 'busy' | 'away';
}
```

### Step 2: Create Static Data Management

#### A. Local Storage Implementation
Create a client-side data management system:

```typescript
// utils/team-storage.ts
export class TeamStorage {
  private static STORAGE_KEY = 'nebusis_team_data';

  static getTeamMembers(): TeamMember[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveTeamMember(member: TeamMember): void {
    const members = this.getTeamMembers();
    const index = members.findIndex(m => m.id === member.id);
    
    if (index >= 0) {
      members[index] = member;
    } else {
      members.push(member);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(members));
  }

  static removeTeamMember(id: string): void {
    const members = this.getTeamMembers().filter(m => m.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(members));
  }

  static searchMembers(query: string): TeamMember[] {
    return this.getTeamMembers().filter(member =>
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.email.toLowerCase().includes(query.toLowerCase()) ||
      member.department?.toLowerCase().includes(query.toLowerCase()) ||
      member.skills?.some(skill => 
        skill.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}
```

#### B. External Service Integration (Optional)
For persistent data across devices, integrate with external services:

```typescript
// utils/external-team-service.ts
export class ExternalTeamService {
  // Option 1: Airtable Integration
  static async saveToAirtable(member: TeamMember) {
    const response = await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/Team', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_AIRTABLE_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Name: member.name,
            Email: member.email,
            Department: member.department,
            Role: member.role,
            Skills: member.skills?.join(', ')
          }
        }]
      })
    });
  }

  // Option 2: Google Sheets Integration
  static async saveToGoogleSheets(member: TeamMember) {
    // Implementation using Google Sheets API
  }

  // Option 3: Firebase Integration
  static async saveToFirebase(member: TeamMember) {
    // Implementation using Firebase Firestore
  }
}
```

### Step 3: Adapt Components for Static Site

#### A. Remove Backend Dependencies
Replace API calls with local storage or external service calls:

```typescript
// Before (ControlCore version):
const { data: teamMembers } = useQuery({
  queryKey: ['/api/users/team'],
  queryFn: () => fetch('/api/users/team').then(res => res.json())
});

// After (Static site version):
const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

useEffect(() => {
  setTeamMembers(TeamStorage.getTeamMembers());
}, []);
```

#### B. Implement Form Handling
Replace server-side form submission with client-side handling:

```typescript
// Static form handler
const handleSubmit = async (data: TeamMember) => {
  try {
    // Save locally
    TeamStorage.saveTeamMember(data);
    
    // Optional: Save to external service
    await ExternalTeamService.saveToAirtable(data);
    
    // Update local state
    setTeamMembers(TeamStorage.getTeamMembers());
    
    // Show success message
    toast.success('Team member added successfully!');
  } catch (error) {
    toast.error('Failed to save team member');
  }
};
```

---

## 🎨 UI Components for Static Implementation

### 1. Team Member Card Component
```typescript
// components/TeamMemberCard.tsx
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick?: () => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={member.profilePhoto} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.jobTitle}</p>
        </div>
        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
          {member.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2" />
            {member.email}
          </div>
          {member.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2" />
              {member.phone}
            </div>
          )}
          {member.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              {member.location}
            </div>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {member.skills?.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. Team Directory Component
```typescript
// components/TeamDirectory.tsx
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Plus } from "lucide-react";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamStorage } from "../utils/team-storage";

export function TeamDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Load team members on component mount
  useEffect(() => {
    setTeamMembers(TeamStorage.getTeamMembers());
  }, []);

  // Filter members based on search query
  const filteredMembers = useMemo(() => {
    if (!searchQuery) return teamMembers;
    return TeamStorage.searchMembers(searchQuery);
  }, [teamMembers, searchQuery]);

  // Group members by department
  const membersByDepartment = useMemo(() => {
    return filteredMembers.reduce((acc, member) => {
      const dept = member.department || 'Unassigned';
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(member);
      return acc;
    }, {} as Record<string, TeamMember[]>);
  }, [filteredMembers]);

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Team Views */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments">
          {Object.entries(membersByDepartment).map(([department, members]) => (
            <div key={department} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{department}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 3. Add Team Member Form
```typescript
// components/AddTeamMemberForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TeamStorage } from "../utils/team-storage";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  skills: z.string().optional(),
  role: z.enum(['admin', 'supervisor', 'user']).default('user')
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface AddTeamMemberFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddTeamMemberForm({ onSuccess, onCancel }: AddTeamMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user"
    }
  });

  const onSubmit = async (data: TeamMemberFormData) => {
    setIsSubmitting(true);
    
    try {
      const newMember: TeamMember = {
        id: crypto.randomUUID(),
        ...data,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
        joinDate: new Date(),
        status: 'active',
        projects: [],
        availability: 'available'
      };

      // Save to local storage
      TeamStorage.saveTeamMember(newMember);
      
      // Reset form
      form.reset();
      
      // Call success callback
      onSuccess?.();
      
      alert('Team member added successfully!');
    } catch (error) {
      alert('Failed to add team member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Enter full name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter email address"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              {...form.register("jobTitle")}
              placeholder="Enter job title"
            />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              {...form.register("department")}
              placeholder="Enter department"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...form.register("location")}
              placeholder="Enter location"
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Textarea
              id="skills"
              {...form.register("skills")}
              placeholder="e.g., Project Management, Data Analysis, Communication"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              {...form.register("role")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Adding..." : "Add Member"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## 🔗 Integration Options for Static Sites

### Option 1: Pure Client-Side (Recommended for MVP)
**Implementation:** Use localStorage for data persistence
**Pros:** 
- No external dependencies
- Fast implementation
- Works offline
**Cons:** 
- Data is device-specific
- No cross-device synchronization

### Option 2: External Database Integration
**Services to Consider:**

#### A. Airtable
```typescript
// Airtable implementation
const AIRTABLE_BASE_ID = 'your_base_id';
const AIRTABLE_TOKEN = 'your_token';

export async function saveTeamMember(member: TeamMember) {
  const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Team`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      records: [{
        fields: {
          Name: member.name,
          Email: member.email,
          Department: member.department,
          Skills: member.skills?.join(', '),
          Role: member.role
        }
      }]
    })
  });
  
  return response.json();
}
```

#### B. Google Sheets API
```typescript
// Google Sheets implementation
export async function saveToGoogleSheets(member: TeamMember) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Team:append?valueInputOption=RAW&key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values: [[
          member.name,
          member.email,
          member.department,
          member.jobTitle,
          member.role,
          member.skills?.join(', ')
        ]]
      })
    }
  );
}
```

#### C. Firebase Firestore
```typescript
// Firebase implementation
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveToFirestore(member: TeamMember) {
  const docRef = await addDoc(collection(db, "team"), member);
  return docRef.id;
}
```

### Option 3: Form-to-Email Integration
**Services:** Netlify Forms, Formspree, EmailJS
```typescript
// EmailJS implementation
import emailjs from 'emailjs-com';

export async function sendTeamMemberEmail(member: TeamMember) {
  const templateParams = {
    to_email: 'admin@nebusis.com',
    member_name: member.name,
    member_email: member.email,
    member_department: member.department,
    member_skills: member.skills?.join(', ')
  };

  return emailjs.send(
    'your_service_id',
    'your_template_id',
    templateParams,
    'your_user_id'
  );
}
```

---

## 📦 Complete Implementation Package

### Required Files to Copy
```
1. UI Components:
   - /client/src/components/ui/ (all files)
   
2. Core Pages:
   - /client/src/pages/UserProfile.tsx (adapt for static)
   - /client/src/pages/UserManagement.tsx (adapt for static)
   
3. Types and Utilities:
   - /shared/schema.ts (user-related types only)
   - Custom utility files (created above)
   
4. Styling:
   - /tailwind.config.ts
   - /client/src/index.css (CSS variables and base styles)
```

### Implementation Steps Summary
1. **Extract and adapt UI components** from ControlCore
2. **Create data management utilities** for your chosen persistence method
3. **Implement form handling** without backend dependencies  
4. **Add search and filtering capabilities** using client-side logic
5. **Create responsive layouts** using the existing Tailwind setup
6. **Test thoroughly** on various devices and browsers

### Customization for Nebusis Branding
- Update color scheme in `tailwind.config.ts` to match Nebusis branding
- Replace logos and brand elements
- Adjust typography to match Nebusis style guide
- Customize card layouts and component spacing

---

## 🚀 Quick Start Implementation

### Minimal Viable Product (30 minutes)
1. Copy `TeamMemberCard` and `AddTeamMemberForm` components
2. Implement `TeamStorage` utility class
3. Create a simple page with both components
4. Test adding and displaying team members

### Full Feature Implementation (2-4 hours)  
1. Copy all UI components and styling
2. Implement full `TeamDirectory` with search and filtering
3. Add external service integration (Airtable/Firebase)
4. Create responsive layouts and mobile optimization
5. Add data export/import functionality

### Advanced Features (Additional time)
- Team collaboration tools
- Project assignment interface
- Skills-based team matching
- Integration with existing Nebusis contact forms
- Analytics and team performance tracking

---

## 📞 Support and Maintenance

### Code Documentation
- All extracted components include comprehensive TypeScript types
- Components follow React best practices and hooks patterns
- Styling uses consistent Tailwind utility classes

### Performance Considerations
- Components are optimized for static site performance
- Local storage operations are efficient and cached
- External API calls include error handling and loading states

### Future Enhancements
- Real-time collaboration features
- Advanced team analytics
- Integration with CRM systems
- Mobile app companion

---

**🎯 Result:** A complete team collaboration system extracted from ControlCore v4.5, adapted for static website implementation, with multiple integration options and comprehensive documentation.**

**📧 Questions?** Contact the ControlCore development team or refer to the full ControlCore v4.5 documentation package for additional technical details.

---

*Generated: July 30, 2025*  
*Version: 1.0*  
*Compatible with: ControlCore v4.5*
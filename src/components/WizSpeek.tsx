import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Shield,
  Lock,
  Eye,
  Settings,
  Clock,
  CheckCircle2,
  Zap,
  Users,
  Globe,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface WizSpeekProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function WizSpeek({ isMinimized = false, onToggleMinimize }: WizSpeekProps) {
  const { user } = useAuth();
  const [showFeatures, setShowFeatures] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={onToggleMinimize}
          className="rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-700 shadow-lg relative"
        >
          <MessageCircle className="h-5 w-5" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-orange-500 text-xs">
            !
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[400px] h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">WizSpeek®</h2>
              <p className="text-xs text-blue-100">Talk Smart. Stay Secure.</p>
            </div>
          </div>
          <Button 
            onClick={onToggleMinimize}
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-white/20"
          >
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          WizSpeek® secure messaging platform is in development. Integration elements are ready for seamless deployment.
        </p>

        <div className="w-full mb-6">
          <div className="text-sm text-gray-500 mb-2">Integration Status</div>
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
          </div>
          <div className="text-xs text-green-600 font-medium">80% Ready for Launch</div>
        </div>

        <Button 
          onClick={() => setShowFeatures(!showFeatures)}
          variant="outline" 
          className="mb-4 w-full"
        >
          {showFeatures ? 'Hide' : 'Preview'} Features
          <ArrowRight className="h-3 w-3 ml-2" />
        </Button>

        {showFeatures && (
          <Card className="w-full">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Team collaboration</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>Cross-platform sync</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Smartphone className="h-4 w-4 text-orange-600" />
                <span>Mobile & desktop apps</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 rounded-b-lg border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Powered by Nebusis®</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Ready for Integration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
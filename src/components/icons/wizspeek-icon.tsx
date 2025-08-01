// Asset path updated for static deployment

interface WizSpeekIconProps {
  className?: string;
}

export default function WizSpeakIcon({ className = "h-6 w-6" }: WizSpeekIconProps) {
  return (
    <img 
      src={wizSpeekIconPath} 
      alt="WizSpeek"
      className={className}
    />
  );
}
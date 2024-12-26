import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className = "" }: LoadingSpinnerProps) => {
  return (
    <Loader2 className={`animate-spin ${className}`} />
  );
};
import { Calendar, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface IssueCardProps {
  id: string;
  title: string;
  volume: string;
  issue: string;
  date: string;
  articleCount?: number;
  pdfUrl?: string;
}

export const IssueCard = ({ id, title, volume, issue, date, articleCount, pdfUrl }: IssueCardProps) => {
  const handleDownload = async () => {
    if (!pdfUrl) {
      toast.error("Le PDF n'est pas encore disponible");
      return;
    }
    
    // Open the PDF URL in a new tab
    window.open(pdfUrl, '_blank');
    toast.success("Ouverture du PDF...");
  };

  return (
    <Card className="group hover:shadow-md transition-shadow transform scale-90 origin-left">
      <CardHeader className="p-3">
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium text-primary truncate">
              {title}
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="whitespace-nowrap">{volume} • {issue}</span>
              <span className="text-primary">|</span>
              <Calendar className="h-3 w-3" />
              <span>{new Date(date).toLocaleDateString()}</span>
              {articleCount && (
                <>
                  <span className="text-primary">|</span>
                  <span>{articleCount} articles</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button variant="outline" size="sm" className="h-6 w-6 p-0">
              <Eye className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={handleDownload}
              disabled={!pdfUrl}
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
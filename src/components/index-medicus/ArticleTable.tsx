import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import type { Article } from "./types";

export const ArticleTable = ({ articles }: { articles: Article[] }) => {
  const handleShare = (articleId: string) => {
    const shareUrl = `${window.location.origin}/index-medicus/articles/${articleId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Lien copié dans le presse-papier");
  };

  const handleDownload = (pdfUrl?: string) => {
    if (!pdfUrl) {
      toast.error("Le PDF n'est pas encore disponible");
      return;
    }
    window.open(pdfUrl, '_blank');
    toast.success("Ouverture du PDF...");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Auteurs</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium max-w-md">
              <div className="truncate">{article.title}</div>
            </TableCell>
            <TableCell>{article.authors.join(", ")}</TableCell>
            <TableCell>
              {format(new Date(article.date), 'dd MMM yyyy', { locale: fr })}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="font-semibold">
                {article.source}
              </Badge>
            </TableCell>
            <TableCell>{article.category}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(article.id)}
                className="mr-2"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(article.pdfUrl)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
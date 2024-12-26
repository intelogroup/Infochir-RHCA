import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { ArticleList } from "@/components/admin/ArticleList";

interface Article {
  id: string;
  title: string;
  abstract: string;
  date: string;
  pdf_url: string | null;
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Sample Article 1",
    abstract: "This is a sample abstract",
    date: new Date().toISOString(),
    pdf_url: null,
  },
];

export const AdminPanel = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleSubmit = async (data: { title: string; abstract: string }) => {
    setIsLoading(true);
    try {
      if (editingArticle) {
        const updatedArticles = articles.map(article => 
          article.id === editingArticle.id 
            ? { ...article, ...data }
            : article
        );
        setArticles(updatedArticles);
        toast.success("Article updated successfully");
      } else {
        const newArticle: Article = {
          id: String(articles.length + 1),
          ...data,
          date: new Date().toISOString(),
          pdf_url: null,
        };
        setArticles([...articles, newArticle]);
        toast.success("Article added successfully");
      }
      setEditingArticle(null);
    } catch (error) {
      toast.error("Error saving article");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;

    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    toast.success("Article deleted successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">RHCA Admin Panel</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? "Edit Article" : "Add New Article"}
              </DialogTitle>
            </DialogHeader>
            <ArticleForm
              initialData={editingArticle || undefined}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ArticleList
        articles={articles}
        onEdit={setEditingArticle}
        onDelete={handleDelete}
      />
    </div>
  );
};
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Document = {
  id: string;
  title: string;
  description: string | null;
  doc_type: string;
  content: string | null;
  file_url: string | null;
  version: number;
  metadata: any;
  created_at: string;
  updated_at: string;
  user_id: string;
  project_id: string | null;
};

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // New: Fetch documents shared with the user
  const fetchSharedDocuments = async () => {
    if (!user) return [];
    setLoading(true);
    try {
      // Select documents where the user is in the shares table.
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .in(
          "id",
          supabase
            .from("document_shares")
            .select("document_id")
            .eq("shared_with_user_id", user.id)
        )
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching shared documents:", error);
      toast({
        title: "Error",
        description: "Failed to fetch shared documents.",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "Failed to fetch documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (
    doc: Omit<Document, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from("documents")
        .insert([
          {
            ...doc,
            user_id: user.id,
          },
        ])
        .select()
        .single();
      if (error) throw error;
      setDocuments((prev) => [data as Document, ...prev]);
      toast({
        title: "Document created",
        description: "Your document was created successfully.",
      });
      return data as Document;
    } catch (error) {
      console.error("Error creating document:", error);
      toast({
        title: "Error",
        description: "Failed to create document.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? (data as Document) : d))
      );
      toast({
        title: "Document updated",
        description: "Your document was updated successfully.",
      });
      return data as Document;
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error",
        description: "Failed to update document.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast({
        title: "Document deleted",
        description: "Your document was deleted.",
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Error",
        description: "Failed to delete document.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line
  }, [user]);

  return {
    documents,
    loading,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments,
    fetchSharedDocuments, // Exposed (can be used to show shared docs)
  };
};

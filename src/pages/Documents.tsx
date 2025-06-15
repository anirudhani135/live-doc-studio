
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentList from "@/components/documents/DocumentList";
import DocumentDialog from "@/components/documents/DocumentDialog";

const Documents = () => {
  const {
    documents,
    loading,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch,
  } = useDocuments();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleNewDoc = () => {
    setSelectedDoc(null);
    setDialogOpen(true);
  };

  const handleEdit = (doc) => {
    setSelectedDoc(doc);
    setDialogOpen(true);
  };

  const handleSave = async (docData) => {
    if (selectedDoc) {
      // Editing existing doc
      await updateDocument(selectedDoc.id, docData);
    } else {
      await createDocument(docData);
    }
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Really delete this document?")) {
      await deleteDocument(id);
    }
  };

  const handleOpen = (doc) => {
    // TODO: Implement detailed document view or editor
    alert(`Open: ${doc.title}`);
  };

  return (
    <div className="p-8 flex flex-col min-h-[80vh] max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="text-muted-foreground">
            All your specs, guides, and living documentation.
          </div>
        </div>
        <Button size="sm" onClick={handleNewDoc}>
          <Plus className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </div>
      <DocumentList
        documents={documents}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onOpen={handleOpen}
      />
      <DocumentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        document={selectedDoc}
        onSave={handleSave}
      />
    </div>
  );
};

export default Documents;

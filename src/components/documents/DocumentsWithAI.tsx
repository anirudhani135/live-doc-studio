
import React, { useState } from "react";
import { Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentList from "@/components/documents/DocumentList";
import DocumentDialog from "@/components/documents/DocumentDialog";
import DocumentEditor from "@/components/documents/DocumentEditor";
import AIAssistant from "@/components/ai/AIAssistant";

const DocumentsWithAI = () => {
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
  const [editingDoc, setEditingDoc] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

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
    setEditingDoc(doc);
  };

  const handleEditorSave = async (content: string, metadata?: any) => {
    if (editingDoc) {
      await updateDocument(editingDoc.id, { 
        content, 
        metadata,
        title: editingDoc.title 
      });
      setEditingDoc(null);
    }
  };

  const handleBackToList = () => {
    setEditingDoc(null);
  };

  if (editingDoc) {
    return (
      <DocumentEditor
        document={editingDoc}
        onSave={handleEditorSave}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 flex flex-col min-h-[80vh] max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Documents</h1>
            <div className="text-muted-foreground">
              All your specs, guides, and living documentation.
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              AI Assistant
            </Button>
            <Button size="sm" onClick={handleNewDoc}>
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Button>
          </div>
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

      {showAIAssistant && (
        <div className="w-80 border-l bg-background p-4">
          <AIAssistant />
        </div>
      )}
    </div>
  );
};

export default DocumentsWithAI;

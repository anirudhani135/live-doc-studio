
import React, { useState } from "react";
import { Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentList from "@/components/documents/DocumentList";
import DocumentDialog from "@/components/documents/DocumentDialog";
import EnhancedDocumentEditor from "@/components/documents/EnhancedDocumentEditor";
import AIAssistant from "@/components/ai/AIAssistant";

const DocumentsWithAI = () => {
  const {
    documents,
    loading,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch
  } = useDocuments();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editingDoc, setEditingDoc] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const handleNewDoc = () => {
    setSelectedDoc(null);
    setDialogOpen(true);
  };

  const handleEdit = doc => {
    setSelectedDoc(doc);
    setDialogOpen(true);
  };

  const handleSave = async docData => {
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

  const handleOpen = doc => {
    setEditingDoc(doc);
    setShowEditor(true);
  };

  const handleEditorSave = async (content: string, metadata?: any) => {
    if (editingDoc) {
      await updateDocument(editingDoc.id, {
        content,
        metadata,
        title: editingDoc.title
      });
    }
  };

  const handleBackToList = () => {
    setEditingDoc(null);
    setShowEditor(false);
  };

  if (showEditor && editingDoc) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex">
          <div className="flex-1">
            <EnhancedDocumentEditor 
              document={editingDoc} 
              onSave={handleEditorSave} 
              onBack={handleBackToList}
            />
          </div>
          
          {showAIAssistant && (
            <div className="w-80 border-l bg-background">
              <AIAssistant />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 p-8 flex flex-col min-h-[80vh] max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and collaborate on your documentation with AI assistance
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button onClick={handleNewDoc}>
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

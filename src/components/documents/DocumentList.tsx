
import React from "react";
import { Document } from "@/hooks/useDocuments";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Edit2 } from "lucide-react";

type DocumentListProps = {
  documents: Document[];
  onEdit: (doc: Document) => void;
  onDelete: (id: string) => void;
  onOpen: (doc: Document) => void;
  loading?: boolean;
};

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onEdit,
  onDelete,
  onOpen,
  loading = false,
}) => {
  if (loading) {
    return <div className="text-center text-muted-foreground py-20">Loading...</div>;
  }

  if (!documents.length) {
    return (
      <div className="text-center text-muted-foreground py-20">
        No documents found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card
          key={doc.id}
          className="hover:shadow-md transition-shadow flex flex-col"
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold text-base line-clamp-1">{doc.title}</h3>
              <div className="text-xs text-muted-foreground">{doc.doc_type}</div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between gap-2">
            <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {doc.description}
            </div>
            <div className="flex gap-2 justify-end mt-auto">
              <Button variant="outline" size="icon" onClick={() => onEdit(doc)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={() => onDelete(doc.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="default" size="icon" onClick={() => onOpen(doc)}>
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentList;

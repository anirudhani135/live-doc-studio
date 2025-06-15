
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Document } from "@/hooks/useDocuments";

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: Document | null;
  onSave: (
    doc: Omit<Document, "id" | "created_at" | "updated_at" | "user_id">
  ) => void;
}

const docTypes = [
  { value: "specification", label: "Specification" },
  { value: "guide", label: "Guide" },
  { value: "api_reference", label: "API Reference" },
  { value: "readme", label: "Readme" },
];

const DocumentDialog: React.FC<DocumentDialogProps> = ({
  open,
  onOpenChange,
  document,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    doc_type: "specification",
    content: "",
    file_url: "",
    version: 1,
    project_id: null as string | null,
    metadata: {},
  });

  useEffect(() => {
    if (document) {
      setFormData({
        ...formData,
        ...document,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        doc_type: "specification",
        content: "",
        file_url: "",
        version: 1,
        project_id: null,
        metadata: {},
      });
    }
    // eslint-disable-next-line
  }, [document, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {document ? "Edit Document" : "Create New Document"}
          </DialogTitle>
          <DialogDescription>
            {document
              ? "Update your document details."
              : "Create a new document. You can edit and add content later."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter document title"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={2}
              placeholder="Describe the document"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="doc_type">Type</Label>
            <Select
              value={formData.doc_type}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  doc_type: val,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {docTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              rows={4}
              placeholder="Document content (markdown or plain text)"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{document ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;

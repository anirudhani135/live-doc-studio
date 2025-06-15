
-- Table for storing user documents
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  project_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  doc_type TEXT NOT NULL DEFAULT 'specification',
  content TEXT,
  file_url TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- For future sharing: links to other users the doc is shared with
CREATE TABLE public.document_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  shared_with_user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- viewer, editor, owner
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_shares ENABLE ROW LEVEL SECURITY;

-- RLS: Docs - Owner can manage their own docs
CREATE POLICY "Users can view their own docs" ON public.documents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own docs" ON public.documents
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own docs" ON public.documents
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own docs" ON public.documents
  FOR DELETE USING (user_id = auth.uid());

-- RLS: Shares - Document owner can create shares, shared user can read if given access
CREATE POLICY "Owners can share their docs" ON public.document_shares
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Shared users can view shared docs" ON public.document_shares
  FOR SELECT USING (
    shared_with_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

-- For upserting doc_shares (e.g. owner can update share role)
CREATE POLICY "Owner can update share" ON public.document_shares
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

-- For deleting shares
CREATE POLICY "Owner can delete share" ON public.document_shares
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

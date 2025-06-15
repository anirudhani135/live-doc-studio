
-- Enable Row Level Security on all relevant tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_shares ENABLE ROW LEVEL SECURITY;

-- Projects: RLS policies
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

CREATE POLICY "Users can view their own projects" ON public.projects
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own projects" ON public.projects
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own projects" ON public.projects
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own projects" ON public.projects
  FOR DELETE USING (user_id = auth.uid());

-- Documents: RLS policies
DROP POLICY IF EXISTS "Users can view their own docs" ON public.documents;
DROP POLICY IF EXISTS "Users can insert their own docs" ON public.documents;
DROP POLICY IF EXISTS "Users can update their own docs" ON public.documents;
DROP POLICY IF EXISTS "Users can delete their own docs" ON public.documents;
DROP POLICY IF EXISTS "Shared users can view shared docs" ON public.documents;

CREATE POLICY "Users can view their own docs" ON public.documents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own docs" ON public.documents
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own docs" ON public.documents
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own docs" ON public.documents
  FOR DELETE USING (user_id = auth.uid());

-- Shared access: Allow users who are granted access via document_shares
CREATE POLICY "Shared users can view shared docs" ON public.documents
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.document_shares
      WHERE document_id = id AND shared_with_user_id = auth.uid()
    )
  );

-- Document Shares: RLS policies (for collaborative features)
DROP POLICY IF EXISTS "Owners can share their docs" ON public.document_shares;
DROP POLICY IF EXISTS "Shared users can view shared docs" ON public.document_shares;
DROP POLICY IF EXISTS "Owner can update share" ON public.document_shares;
DROP POLICY IF EXISTS "Owner can delete share" ON public.document_shares;

-- Only the owner of the document can share it
CREATE POLICY "Owners can share their docs" ON public.document_shares
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

-- Shared user can see their shares, and owner can see all shares for their docs
CREATE POLICY "Shared users can view shared docs" ON public.document_shares
  FOR SELECT USING (
    shared_with_user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

-- Allow only the owner to update or delete shares
CREATE POLICY "Owner can update share" ON public.document_shares
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );
CREATE POLICY "Owner can delete share" ON public.document_shares
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.documents
      WHERE id = document_id AND user_id = auth.uid()
    )
  );

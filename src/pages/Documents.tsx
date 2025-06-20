
import React, { useState } from 'react';
import DocumentsWithAI from '@/components/documents/DocumentsWithAI';
import { useAnalytics } from '@/hooks/useAnalytics';

const Documents = () => {
  const { trackFeatureUsed } = useAnalytics();

  // Track page visit
  React.useEffect(() => {
    trackFeatureUsed('documents_page_visit');
  }, [trackFeatureUsed]);

  return <DocumentsWithAI />;
};

export default Documents;

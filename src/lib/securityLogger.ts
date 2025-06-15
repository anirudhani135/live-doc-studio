
type SecurityEvent = {
  event: string;
  detail?: object;
  userId?: string;
  timestamp?: string;
};

// Ideally, write to backend (Supabase table or Edge function). For now, log to console.
export function logSecurityEvent(e: SecurityEvent) {
  const data = {
    ...e,
    timestamp: new Date().toISOString(),
  };
  // Placeholder: In a real app, send to backend via API, Supabase function, etc.
  // Example: await supabaseClient.from('security_logs').insert([data]);
  // For now, just log to the console. You can replace this with a proper log handler later.
  // eslint-disable-next-line no-console
  console.log("SECURITY LOG", data);
}

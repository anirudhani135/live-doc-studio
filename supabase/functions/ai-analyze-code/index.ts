
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language } = await req.json();

    const analysisPrompt = `
Analyze this ${language} code and provide:
1. A comprehensive documentation explaining what the code does
2. Suggestions for improvement
3. A complexity assessment

Code:
\`\`\`${language}
${code}
\`\`\`

Format your response as JSON with the following structure:
{
  "documentation": "detailed explanation of the code",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "complexity_score": number_between_1_and_10
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a senior software engineer and code reviewer. Provide thorough and helpful code analysis.'
          },
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    const analysisResult = data.choices[0].message.content;

    try {
      // Try to parse as JSON
      const parsedResult = JSON.parse(analysisResult);
      return new Response(JSON.stringify(parsedResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      // Fallback if JSON parsing fails
      return new Response(JSON.stringify({
        documentation: analysisResult,
        suggestions: ["Consider adding comments", "Review for optimization opportunities", "Ensure proper error handling"],
        complexity_score: 5
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in ai-analyze-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

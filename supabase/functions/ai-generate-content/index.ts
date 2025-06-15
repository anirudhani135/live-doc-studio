
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
    const { prompt, type, context, model } = await req.json();

    const systemPrompts = {
      documentation: "You are a technical documentation expert. Generate clear, comprehensive documentation based on the user's request. Include proper structure, examples, and best practices.",
      specification: "You are a software architect. Create detailed technical specifications including requirements, architecture, and implementation details.",
      code_analysis: "You are a code reviewer. Analyze the provided code and generate documentation explaining its functionality, architecture, and suggestions for improvement.",
      improvement: "You are a content editor. Improve the provided content for clarity, completeness, and structure while maintaining the original intent."
    };

    const messages = [
      { role: 'system', content: systemPrompts[type] || systemPrompts.documentation },
      { role: 'user', content: `${prompt}\n\nContext: ${context || 'No additional context provided.'}` }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model === 'gpt-4' ? 'gpt-4o-mini' : 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Generate suggestions based on the content
    const suggestionsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Generate 3 brief suggestions for improving or expanding the following content.' },
          { role: 'user', content: generatedContent }
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    const suggestionsData = await suggestionsResponse.json();
    const suggestions = suggestionsData.choices[0].message.content.split('\n').filter(s => s.trim());

    return new Response(JSON.stringify({
      content: generatedContent,
      suggestions: suggestions.slice(0, 3),
      metadata: {
        model_used: model || 'gpt-4',
        tokens_used: data.usage?.total_tokens || 0,
        confidence_score: 8.5
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-generate-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});


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
    const { content, improvement_type } = await req.json();

    const improvementPrompts = {
      clarity: "Improve the clarity and readability of this content. Make it more understandable and well-structured. Maintain all key information but present it more clearly.",
      completeness: "Analyze this content and add missing details, examples, or sections that would make it more comprehensive and useful.",
      structure: "Reorganize and restructure this content for better flow, logical organization, and readability. Improve headings, sections, and overall structure."
    };

    const messages = [
      { 
        role: 'system', 
        content: `You are a technical writing expert. ${improvementPrompts[improvement_type]} Respond with the improved content only.`
      },
      { role: 'user', content: content }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3,
        max_tokens: 3000,
      }),
    });

    const data = await response.json();
    const improvedContent = data.choices[0].message.content;

    // Generate a list of changes made
    const changesResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'List the key improvements made to the content. Be concise and specific. Format as bullet points.'
          },
          { 
            role: 'user', 
            content: `Original:\n${content}\n\nImproved:\n${improvedContent}`
          }
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    const changesData = await changesResponse.json();
    const changesList = changesData.choices[0].message.content
      .split('\n')
      .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
      .map(line => line.replace(/^[•\-]\s*/, '').trim())
      .filter(change => change.length > 0);

    // Calculate a quality score (simplified)
    const qualityScore = Math.min(10, Math.max(6, 7 + (improvedContent.length - content.length) / content.length * 2));

    return new Response(JSON.stringify({
      improved_content: improvedContent,
      changes_made: changesList.slice(0, 5),
      quality_score: Math.round(qualityScore * 10) / 10
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-improve-document function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

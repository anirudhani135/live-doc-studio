
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
    const { description } = await req.json();

    const specPrompt = `
Based on this project description, generate a comprehensive technical specification:

"${description}"

Provide a detailed response in the following JSON format:
{
  "specification": "A comprehensive technical specification document including requirements, features, user stories, and acceptance criteria",
  "architecture": "Detailed system architecture description including components, data flow, and technical decisions",
  "tech_recommendations": ["technology 1", "technology 2", "technology 3"],
  "timeline_estimate": "Estimated development timeline with phases"
}

Make sure the specification is detailed and professional, suitable for a development team to start implementation.
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
            content: 'You are a senior software architect and technical writer. Generate comprehensive, detailed technical specifications based on project descriptions.'
          },
          { role: 'user', content: specPrompt }
        ],
        temperature: 0.4,
        max_tokens: 3000,
      }),
    });

    const data = await response.json();
    const specResult = data.choices[0].message.content;

    try {
      // Try to parse as JSON
      const parsedResult = JSON.parse(specResult);
      return new Response(JSON.stringify(parsedResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      // Fallback if JSON parsing fails
      return new Response(JSON.stringify({
        specification: specResult,
        architecture: "System architecture will be determined based on requirements analysis",
        tech_recommendations: ["React", "TypeScript", "Node.js", "PostgreSQL"],
        timeline_estimate: "8-12 weeks depending on complexity"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in ai-generate-spec function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

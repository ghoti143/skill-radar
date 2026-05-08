import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { semanticSearch } from "@/lib/embeddings";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: `You are a career coach helping developers understand their skill gaps.
When a user describes their skills or asks about a role, use the search_jobs 
tool to find relevant job postings, then give specific advice about what 
skills they have and what they're missing.`,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      search_jobs: tool({
        description: "Search job postings by skills or role description",
        inputSchema: z.object({
          query: z.string().describe("The role or skills to search for"),
        }),
        execute: async ({ query }) => {
          const results = await semanticSearch(query, 3);

          return results;
        },
      }),
    },
    onStepFinish: ({ toolResults }) => {
      console.log(toolResults);
    },
  });

  return result.toUIMessageStreamResponse();
}

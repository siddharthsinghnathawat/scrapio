'use server';
/**
 * @fileOverview An AI-powered tool that helps users identify recyclable materials,
 * their category, and offers general estimated scrap value or suggestions for selling reusable items.
 *
 * - getRecyclingInfo - A function that handles the recycling information retrieval process.
 * - GetRecyclingInfoInput - The input type for the getRecyclingInfo function.
 * - GetRecyclingInfoOutput - The return type for the getRecyclingInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetRecyclingInfoInputSchema = z.object({
  itemDescription: z
    .string()
    .describe('A detailed description of the household item or material.'),
});
export type GetRecyclingInfoInput = z.infer<typeof GetRecyclingInfoInputSchema>;

const GetRecyclingInfoOutputSchema = z.object({
  isRecyclable: z
    .boolean()
    .describe(
      'True if the item is generally recyclable, false otherwise. Provide a general answer, not location-specific.'
    ),
  recyclingCategory: z
    .string()
    .describe(
      'The appropriate category for recycling (e.g., "Plastics", "Paper", "Metals", "Glass", "Electronics", "Organic", "Textiles", "Hazardous Waste", "General Waste" if not recyclable). ' +
        'If an item has multiple components, identify the primary category or the most significant one that determines its disposal.'
    ),
  scrapValueEstimate: z
    .string()
    .describe(
      'A general estimate of its scrap value (e.g., "Very Low", "Low", "Medium", "High", "N/A" if not applicable). This is a general estimate, not a precise market value.'
    ),
  reusableSuggestions: z
    .string()
    .describe(
      'Suggestions for selling or donating it as a reusable item if applicable. If not suitable for reuse, state "Not typically suitable for reuse.".'
    ),
  additionalNotes: z
    .string()
    .describe(
      'Any other relevant information, tips, warnings, or specific disposal instructions for the item.'
    ),
});
export type GetRecyclingInfoOutput = z.infer<typeof GetRecyclingInfoOutputSchema>;

export async function getRecyclingInfo(
  input: GetRecyclingInfoInput
): Promise<GetRecyclingInfoOutput> {
  return getRecyclingInfoFlow(input);
}

const recyclingInfoPrompt = ai.definePrompt({
  name: 'recyclingInfoPrompt',
  input: {schema: GetRecyclingInfoInputSchema},
  output: {schema: GetRecyclingInfoOutputSchema},
  prompt: `You are an expert in recycling and waste management. Your task is to analyze the user's description of a household item or material and provide comprehensive information about its recyclability, appropriate category, estimated scrap value, and suggestions for reuse.

Be general in your advice, not location-specific, unless common knowledge dictates a certain type of item is universally non-recyclable or hazardous.

Item Description: {{{itemDescription}}}`,
});

const getRecyclingInfoFlow = ai.defineFlow(
  {
    name: 'getRecyclingInfoFlow',
    inputSchema: GetRecyclingInfoInputSchema,
    outputSchema: GetRecyclingInfoOutputSchema,
  },
  async (input) => {
    const {output} = await recyclingInfoPrompt(input);
    return output!;
  }
);

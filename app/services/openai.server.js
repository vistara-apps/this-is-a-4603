// OpenAI service for automated photo tagging
// This service uses OpenAI's API to analyze photos and suggest tags

import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. Using mock data instead.');
}

// Initialize OpenAI client
const openai = OPENAI_API_KEY ? new OpenAI({
  apiKey: OPENAI_API_KEY
}) : null;

/**
 * Generate tags for a photo using OpenAI's vision model
 * @param {string} imageUrl - URL of the image to analyze
 * @returns {Promise<string[]>} - Array of suggested tags
 */
export async function generatePhotoTags(imageUrl) {
  if (!openai) {
    // Mock response for development
    console.log('Using mock OpenAI response for tag generation');
    const mockTags = ['animal', 'pet', 'cute', 'nature', 'photography'];
    return mockTags.slice(0, Math.floor(Math.random() * 3) + 2);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that analyzes images of animals and generates relevant tags. Provide only the tags as a JSON array of strings, with no additional text."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Generate 3-5 relevant tags for this animal photo. Return only a JSON array of tag strings, nothing else." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 100
    });

    // Parse the response to extract tags
    const content = response.choices[0].message.content;
    try {
      // Try to parse as JSON
      const tags = JSON.parse(content);
      if (Array.isArray(tags)) {
        return tags;
      }
    } catch (e) {
      // If not valid JSON, try to extract tags from text
      const tagMatches = content.match(/["']([^"']+)["']/g);
      if (tagMatches) {
        return tagMatches.map(tag => tag.replace(/["']/g, ''));
      }
    }

    // Fallback to splitting by commas or spaces
    return content.split(/,|\n/).map(tag => tag.trim()).filter(Boolean);
  } catch (error) {
    console.error('Error generating tags with OpenAI:', error);
    // Fallback to basic tags
    return ['animal', 'photo'];
  }
}

/**
 * Generate a description for a photo using OpenAI's vision model
 * @param {string} imageUrl - URL of the image to analyze
 * @returns {Promise<string>} - Generated description
 */
export async function generatePhotoDescription(imageUrl) {
  if (!openai) {
    // Mock response for development
    console.log('Using mock OpenAI response for description generation');
    return 'A beautiful animal captured in its natural habitat. The photo shows great detail and lighting.';
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that analyzes images of animals and generates detailed, engaging descriptions. Your descriptions should be 2-3 sentences long and highlight interesting aspects of the animal and photo."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Write a brief, engaging description for this animal photo in 2-3 sentences." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 150
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating description with OpenAI:', error);
    // Fallback to basic description
    return 'A beautiful animal photo.';
  }
}

/**
 * Enhance a user-provided description with additional details using OpenAI
 * @param {string} imageUrl - URL of the image
 * @param {string} userDescription - User-provided description
 * @returns {Promise<string>} - Enhanced description
 */
export async function enhancePhotoDescription(imageUrl, userDescription) {
  if (!openai) {
    // Mock response for development
    console.log('Using mock OpenAI response for description enhancement');
    return `${userDescription} The lighting and composition of this photo really highlight the subject's natural beauty.`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that helps enhance descriptions of animal photos. You should maintain the original meaning and tone while adding relevant details based on the image."
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Here's my description: "${userDescription}". Please enhance it with a few more details based on what you see in the image, keeping a similar tone.` },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 200
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error enhancing description with OpenAI:', error);
    // Return original description if enhancement fails
    return userDescription;
  }
}


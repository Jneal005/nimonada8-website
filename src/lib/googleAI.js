import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-pro' });
}

export const generateBiblicalResponse = async (userMessage) => {
  if (!model) {
    throw new Error('Google AI API key not configured');
  }

  const prompt = `You are a biblical AI assistant for a Christian lemonade business called "Holy Sips". Your role is to provide biblical wisdom, encouragement, and spiritual guidance based on Scripture. 

Guidelines:
- Always respond with love, compassion, and biblical truth
- Include relevant Bible verses when appropriate
- Keep responses encouraging and hope-filled
- Focus on topics like faith, prayer, love, forgiveness, hope, peace, wisdom, strength, and guidance
- Keep responses concise but meaningful (2-3 sentences max)
- If asked about non-biblical topics, gently redirect to spiritual matters
- Always maintain a warm, pastoral tone

User message: "${userMessage}"

Provide a biblical response:`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Google AI API error:', error);
    throw error;
  }
};

export const isGoogleAIConfigured = () => {
  return !!API_KEY && !!model;
};
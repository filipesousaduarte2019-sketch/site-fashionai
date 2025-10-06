// lib/ai-system.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const aiSystem = {
  async chatWithMaia(message, context = {}) {
    try {
      const systemPrompt = `
        Você é Maia, uma consultora de moda e estilo.
        Ajude o usuário a montar looks, escolher cores e dar dicas de roupas.
        Seja simpática, criativa e moderna.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      });

      return { success: true, message: response.choices[0].message.content };
    } catch (error) {
      console.error("Erro ao conversar com a IA:", error);
      return { success: false, message: "Erro ao se comunicar com a Maia." };
    }
  },

  getStatus() {
    return {
      configured: !!process.env.OPENAI_API_KEY,
      assistant: "Maia",
      features: ["chat", "moda e estilo"]
    };
  }
};

export default aiSystem;

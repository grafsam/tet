import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Subject, Question } from "../types";

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "The question text. Must be at least 30 Traditional Chinese characters long.",
    },
    options: {
      type: Type.ARRAY,
      description: "Four options for the multiple choice question.",
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "Option label (A, B, C, D)" },
          content: { type: Type.STRING, description: "Option text" },
        },
        required: ["label", "content"],
      },
    },
    correctAnswer: {
      type: Type.STRING,
      description: "The correct option label (A, B, C, or D).",
    },
    explanation: {
      type: Type.STRING,
      description: "Detailed explanation of the answer in Traditional Chinese.",
    },
  },
  required: ["description", "options", "correctAnswer", "explanation"],
};

export const generateExamQuestions = async (
  apiKey: string,
  subject: Subject,
  topic: string,
  sourceText: string,
  count: number
): Promise<Question[]> => {
  if (!apiKey) {
    throw new Error("請輸入 Google Gemini API Key");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    你是一位專業的台灣國中老師（7-9年級）。請根據提供的內容或主題，製作一份${subject}科的考試卷。
    
    以下是生成題目的嚴格規則：
    1. **語言**：必須使用繁體中文（台灣用語）。
    2. **標點符號**：必須使用中文全形標點符號。
    3. **題目長度**：每個題目的問題描述（不包含選項）至少要有 30 個中文字。確保情境完整或敘述詳盡。
    4. **題型**：單選題，每題有 4 個選項 (A, B, C, D)，選項長度要相近。
    5. **答案與解析**：必須提供正確答案，並附上詳盡的解析，說明為何該選項正確以及其他選項為何錯誤。
    6. **數量**：請生成 ${count} 題。
    7. **內容來源**：
       主題：${topic}
       參考文本：${sourceText ? sourceText.substring(0, 5000) : "無特定文本，請依據主題出題"}
    
    請確保題目符合台灣國中教育會考（CAP）的難度與風格。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: questionSchema,
        },
      },
    });

    if (response.text) {
      const parsedData = JSON.parse(response.text);
      // Add IDs to questions
      return parsedData.map((q: any, index: number) => ({
        ...q,
        id: index + 1,
      }));
    } else {
      throw new Error("無法生成題目，請稍後再試。");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(`生成失敗: ${error.message || "未知錯誤"}`);
  }
};
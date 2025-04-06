export interface AiTool {
    id: string;
    name: string;
    description: string;
    category: string;
    promptTemplate: string;
    maxTokens?: number;
  }
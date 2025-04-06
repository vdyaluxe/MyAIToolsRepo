import { AiTool } from '../../core/models/ai-tool.model';

export const AI_TOOLS: AiTool[] = [
  // Summarization Tools
  { id: 'summarize', name: 'Summarize Text', description: 'Summarize a long piece of text into a concise version.', category: 'Summarization', maxTokens: 300, promptTemplate: 'Summarize the following text: {{input}}' },
  { id: 'bullet-summary', name: 'Bullet Point Summary', description: 'Convert text into bullet points.', category: 'Summarization', maxTokens: 300, promptTemplate: 'Convert the following text into bullet points: {{input}}' },
  { id: 'executive-summary', name: 'Executive Summary', description: 'Create an executive summary for a report.', category: 'Summarization', maxTokens: 500, promptTemplate: 'Write an executive summary for the following report: {{input}}' },

  // Paraphrasing Tools
  { id: 'paraphrase', name: 'Paraphrase Text', description: 'Rewrite text in different words.', category: 'Paraphrasing', maxTokens: 500, promptTemplate: 'Paraphrase the following text: {{input}}' },
  { id: 'simplify', name: 'Simplify Text', description: 'Simplify complex text for better understanding.', category: 'Paraphrasing', maxTokens: 500, promptTemplate: 'Simplify the following text for a 5th-grade reading level: {{input}}' },
  { id: 'formalize', name: 'Formalize Text', description: 'Make text more formal.', category: 'Paraphrasing', maxTokens: 500, promptTemplate: 'Rewrite the following text in a formal tone: {{input}}' },
  { id: 'casualize', name: 'Casualize Text', description: 'Make text more casual.', category: 'Paraphrasing', maxTokens: 500, promptTemplate: 'Rewrite the following text in a casual tone: {{input}}' },

  // Grammar and Style Tools
  { id: 'grammar-check', name: 'Grammar Check', description: 'Check and correct grammar in text.', category: 'Grammar', maxTokens: 500, promptTemplate: 'Check and correct the grammar in the following text: {{input}}' },
  { id: 'style-improve', name: 'Improve Writing Style', description: 'Enhance the writing style of text.', category: 'Grammar', maxTokens: 500, promptTemplate: 'Improve the writing style of the following text: {{input}}' },
  { id: 'remove-passive', name: 'Remove Passive Voice', description: 'Convert passive voice to active voice.', category: 'Grammar', maxTokens: 500, promptTemplate: 'Rewrite the following text to remove passive voice: {{input}}' },
  { id: 'sentence-variety', name: 'Add Sentence Variety', description: 'Add variety to sentence structures.', category: 'Grammar', maxTokens: 500, promptTemplate: 'Rewrite the following text to add variety to sentence structures: {{input}}' },

  // Tone Adjustment Tools
  { id: 'tone-friendly', name: 'Make Text Friendly', description: 'Adjust the tone to be more friendly.', category: 'Tone', maxTokens: 500, promptTemplate: 'Rewrite the following text in a friendly tone: {{input}}' },
  { id: 'tone-professional', name: 'Make Text Professional', description: 'Adjust the tone to be more professional.', category: 'Tone', maxTokens: 500, promptTemplate: 'Rewrite the following text in a professional tone: {{input}}' },
  { id: 'tone-persuasive', name: 'Make Text Persuasive', description: 'Adjust the tone to be more persuasive.', category: 'Tone', maxTokens: 500, promptTemplate: 'Rewrite the following text in a persuasive tone: {{input}}' },
  { id: 'tone-humorous', name: 'Make Text Humorous', description: 'Add humor to the text.', category: 'Tone', maxTokens: 500, promptTemplate: 'Rewrite the following text with a humorous tone: {{input}}' },

  // Content Generation Tools
  { id: 'blog-ideas', name: 'Generate Blog Ideas', description: 'Generate ideas for blog posts.', category: 'Content', maxTokens: 300, promptTemplate: 'Generate 5 blog post ideas about {{input}}' },
  { id: 'social-post', name: 'Write Social Media Post', description: 'Create a social media post.', category: 'Content', maxTokens: 200, promptTemplate: 'Write a social media post about {{input}}' },
  { id: 'email-subject', name: 'Email Subject Lines', description: 'Generate email subject lines.', category: 'Content', maxTokens: 200, promptTemplate: 'Generate 5 email subject lines for a campaign about {{input}}' },
  { id: 'product-description', name: 'Product Description', description: 'Write a product description.', category: 'Content', maxTokens: 500, promptTemplate: 'Write a product description for {{input}}' },
  { id: 'ad-copy', name: 'Ad Copy', description: 'Create ad copy for a product or service.', category: 'Content', maxTokens: 300, promptTemplate: 'Write ad copy for {{input}}' },

  // SEO Tools
  { id: 'keyword-extract', name: 'Extract Keywords', description: 'Extract SEO keywords from text.', category: 'SEO', maxTokens: 200, promptTemplate: 'Extract the top 5 SEO keywords from the following text: {{input}}' },
  { id: 'meta-description', name: 'Write Meta Description', description: 'Write an SEO meta description.', category: 'SEO', maxTokens: 200, promptTemplate: 'Write a 160-character meta description for a page about {{input}}' },
  { id: 'title-tag', name: 'Write Title Tag', description: 'Write an SEO title tag.', category: 'SEO', maxTokens: 100, promptTemplate: 'Write a 60-character SEO title tag for a page about {{input}}' },
  { id: 'alt-text', name: 'Generate Image Alt Text', description: 'Generate alt text for images.', category: 'SEO', maxTokens: 100, promptTemplate: 'Write alt text for an image about {{input}}' },

  // Creative Writing Tools
  { id: 'story-generator', name: 'Story Generator', description: 'Generate a creative story based on a prompt.', category: 'Creative', maxTokens: 700, promptTemplate: 'Generate a creative story about {{input}}' },
  { id: 'poetry-generator', name: 'Poetry Generator', description: 'Generate a poem on any topic.', category: 'Creative', maxTokens: 300, promptTemplate: 'Generate a poem about {{input}}' },
  { id: 'lyrics-generator', name: 'Lyrics Generator', description: 'Generate song lyrics based on a theme.', category: 'Creative', maxTokens: 500, promptTemplate: 'Generate song lyrics about {{input}}' },
  { id: 'meme-idea', name: 'Meme Idea Generator', description: 'Generate ideas for memes.', category: 'Creative', maxTokens: 300, promptTemplate: 'Generate 5 meme ideas about {{input}}' },
  { id: 'meme-creator', name: 'Meme Creator', description: 'Create a text-based meme description.', category: 'Creative', maxTokens: 200, promptTemplate: 'Create a text-based meme description about {{input}}' },
  { id: 'movie-plot', name: 'Movie Plot Generator', description: 'Generate a movie plot idea.', category: 'Creative', maxTokens: 500, promptTemplate: 'Generate a movie plot about {{input}}' },
  { id: 'text-adventure', name: 'Text Adventure Game', description: 'Create a short text-based adventure game.', category: 'Creative', maxTokens: 700, promptTemplate: 'Create a short text-based adventure game about {{input}}' },
  { id: 'invention-generator', name: 'Invention Generator', description: 'Generate an idea for a new invention.', category: 'Creative', maxTokens: 300, promptTemplate: 'Generate an idea for a new invention related to {{input}}' },
  { id: 'video-game-ideas', name: 'Video Game Idea Generator', description: 'Generate ideas for a video game.', category: 'Creative', maxTokens: 500, promptTemplate: 'Generate a video game idea about {{input}}' },
  { id: 'dialogue', name: 'Write Dialogue', description: 'Generate dialogue between characters.', category: 'Creative', maxTokens: 500, promptTemplate: 'Write a dialogue between two characters about {{input}}' },
  { id: 'character-bio', name: 'Character Bio', description: 'Create a character biography.', category: 'Creative', maxTokens: 500, promptTemplate: 'Write a character biography for a character related to {{input}}' },
  { id: 'name-generator', name: 'Name Generator', description: 'Generate names for companies, pages, websites, domains, or babies.', category: 'Creative', maxTokens: 200, promptTemplate: 'Generate 5 names for a {{input}}' },
  { id: 'brainstorm-buddy', name: 'Brainstorm Buddy', description: 'Help brainstorm ideas for any topic.', category: 'Creative', maxTokens: 300, promptTemplate: 'Brainstorm 5 ideas for {{input}}' },
  { id: 'fortune-teller', name: 'Fortune Teller', description: 'Predict a fortune or future scenario.', category: 'Creative', maxTokens: 200, promptTemplate: 'Predict a fortune for someone interested in {{input}}' },

  // Business Writing Tools
  { id: 'business-email', name: 'Write Business Email', description: 'Generate a professional business email.', category: 'Business', maxTokens: 500, promptTemplate: 'Write a professional business email about {{input}}' },
  { id: 'press-release', name: 'Write Press Release', description: 'Create a press release.', category: 'Business', maxTokens: 700, promptTemplate: 'Write a press release about {{input}}' },
  { id: 'proposal-intro', name: 'Proposal Introduction', description: 'Write an introduction for a proposal.', category: 'Business', maxTokens: 300, promptTemplate: 'Write an introduction for a proposal about {{input}}' },
  { id: 'meeting-agenda', name: 'Meeting Agenda', description: 'Generate a meeting agenda.', category: 'Business', maxTokens: 300, promptTemplate: 'Write a meeting agenda for a meeting about {{input}}' },
  { id: 'resume-maker', name: 'Resume Maker', description: 'Generate a professional resume.', category: 'Business', maxTokens: 700, promptTemplate: 'Generate a professional resume for a person with experience in {{input}}' },
  { id: 'legal-documents', name: 'Legal Documents Creator', description: 'Generate a legal document.', category: 'Business', maxTokens: 1000, promptTemplate: 'Generate a legal document for {{input}}' },

  // Educational Tools
  { id: 'explain-concept', name: 'Explain Concept', description: 'Explain a concept in simple terms.', category: 'Education', maxTokens: 500, promptTemplate: 'Explain the concept of {{input}} in simple terms for a beginner' },
  { id: 'quiz-questions', name: 'Generate Quiz Questions', description: 'Create quiz questions on a topic.', category: 'Education', maxTokens: 300, promptTemplate: 'Generate 5 quiz questions about {{input}}' },
  { id: 'study-notes', name: 'Create Study Notes', description: 'Generate study notes from text.', category: 'Education', maxTokens: 500, promptTemplate: 'Create study notes from the following text: {{input}}' },
  { id: 'flashcards', name: 'Generate Flashcards', description: 'Create flashcards for learning.', category: 'Education', maxTokens: 300, promptTemplate: 'Generate 5 flashcards for learning about {{input}}' },
  { id: 'project-ideas', name: 'Project Ideas and Helper', description: 'Generate project ideas for students.', category: 'Education', maxTokens: 300, promptTemplate: 'Generate 5 project ideas for students about {{input}}' },
  { id: 'assignment-helper', name: 'Assignment Helper', description: 'Provide guidance for completing assignments.', category: 'Education', maxTokens: 500, promptTemplate: 'Provide step-by-step guidance for completing an assignment about {{input}}' },
  { id: 'classroom-game', name: 'Classroom Game Generator', description: 'Create a game for classroom learning.', category: 'Education', maxTokens: 300, promptTemplate: 'Create a classroom game about {{input}}' },
  { id: 'essay-outline', name: 'Essay Outline Generator', description: 'Generate an outline for an essay.', category: 'Education', maxTokens: 300, promptTemplate: 'Generate an outline for an essay about {{input}}' },
  { id: 'word-generator', name: 'Word Generator', description: 'Generate a list of words related to a topic.', category: 'Education', maxTokens: 200, promptTemplate: 'Generate a list of 10 words related to {{input}}' },
  { id: 'vocabulary-expander', name: 'Vocabulary Expander', description: 'Expand vocabulary with synonyms and definitions.', category: 'Education', maxTokens: 300, promptTemplate: 'Provide 5 synonyms and definitions for the word {{input}}' },
  { id: 'math-word-problem', name: 'Math Word Problem Creator', description: 'Create math word problems.', category: 'Education', maxTokens: 200, promptTemplate: 'Create a math word problem about {{input}}' },
  { id: 'answer-finder', name: 'Answer Finder', description: 'Provide answers to educational questions.', category: 'Education', maxTokens: 500, promptTemplate: 'Provide a detailed answer to the question: {{input}}' },
  { id: 'history-teller', name: 'History Teller', description: 'Narrate a historical event or topic.', category: 'Education', maxTokens: 500, promptTemplate: 'Narrate the history of {{input}} in a storytelling format' },
  { id: 'study-schedule', name: 'Study Schedule Maker', description: 'Create a study schedule.', category: 'Education', maxTokens: 300, promptTemplate: 'Create a weekly study schedule for {{input}}' },
  { id: 'lesson-plan', name: 'Lesson Plan Generator', description: 'Generate a lesson plan for teachers.', category: 'Education', maxTokens: 500, promptTemplate: 'Generate a lesson plan for a class about {{input}}' },
  { id: 'worksheet-creator', name: 'Worksheet Creator', description: 'Create a worksheet for students.', category: 'Education', maxTokens: 300, promptTemplate: 'Create a worksheet for students about {{input}}' },
  { id: 'group-activity', name: 'Group Activity Assignor', description: 'Design a group activity for learning.', category: 'Education', maxTokens: 300, promptTemplate: 'Design a group activity for students about {{input}}' },
  { id: 'language-learning', name: 'Language Learning', description: 'Provide language learning exercises.', category: 'Education', maxTokens: 500, promptTemplate: 'Provide 5 language learning exercises for {{input}}' },

  // Translation and Localization Tools
  { id: 'translate-en-es', name: 'Translate to Spanish', description: 'Translate text to Spanish.', category: 'Translation', maxTokens: 500, promptTemplate: 'Translate the following text to Spanish: {{input}}' },
  { id: 'translate-en-fr', name: 'Translate to French', description: 'Translate text to French.', category: 'Translation', maxTokens: 500, promptTemplate: 'Translate the following text to French: {{input}}' },
  { id: 'localize-en-uk', name: 'Localize to British English', description: 'Localize text to British English.', category: 'Translation', maxTokens: 500, promptTemplate: 'Localize the following text to British English: {{input}}' },
  { id: 'localize-en-us', name: 'Localize to American English', description: 'Localize text to American English.', category: 'Translation', maxTokens: 500, promptTemplate: 'Localize the following text to American English: {{input}}' },

  // Technical Writing Tools
  { id: 'api-docs', name: 'Write API Documentation', description: 'Generate API documentation.', category: 'Technical', maxTokens: 700, promptTemplate: 'Write API documentation for an endpoint about {{input}}' },
  { id: 'user-manual', name: 'Write User Manual', description: 'Create a user manual section.', category: 'Technical', maxTokens: 700, promptTemplate: 'Write a user manual section for {{input}}' },
  { id: 'faq', name: 'Generate FAQ', description: 'Create an FAQ section.', category: 'Technical', maxTokens: 500, promptTemplate: 'Generate an FAQ section for {{input}}' },
  { id: 'error-message', name: 'Write Error Message', description: 'Create a user-friendly error message.', category: 'Technical', maxTokens: 200, promptTemplate: 'Write a user-friendly error message for {{input}}' },
  { id: 'code-generator', name: 'Code Generator', description: 'Generate code snippets for a given task.', category: 'Technical', maxTokens: 500, promptTemplate: 'Generate a code snippet for {{input}}' },
  { id: 'bug-fixer', name: 'Bug Fixer', description: 'Suggest fixes for code bugs.', category: 'Technical', maxTokens: 500, promptTemplate: 'Suggest a fix for the following code bug: {{input}}' },

  // Social Media Tools
  { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate hashtags for a topic.', category: 'Social Media', maxTokens: 100, promptTemplate: 'Generate 5 hashtags for {{input}}' },
  { id: 'tweet-thread', name: 'Write Tweet Thread', description: 'Create a Twitter thread.', category: 'Social Media', maxTokens: 300, promptTemplate: 'Write a 3-part Twitter thread about {{input}}' },
  { id: 'linkedin-post', name: 'Write LinkedIn Post', description: 'Create a LinkedIn post.', category: 'Social Media', maxTokens: 300, promptTemplate: 'Write a LinkedIn post about {{input}}' },
  { id: 'instagram-caption', name: 'Instagram Caption', description: 'Generate an Instagram caption.', category: 'Social Media', maxTokens: 200, promptTemplate: 'Write an Instagram caption for a post about {{input}}' },

  // Lifestyle Tools
  { id: 'travel-planner', name: 'Travel Planner', description: 'Plan a travel itinerary.', category: 'Lifestyle', maxTokens: 500, promptTemplate: 'Create a travel itinerary for a trip to {{input}}' },
  { id: 'recipe-generator', name: 'Recipe Generator', description: 'Generate a recipe based on ingredients or theme.', category: 'Lifestyle', maxTokens: 500, promptTemplate: 'Generate a recipe for {{input}}' },
  { id: 'meal-plan', name: 'Meal Plan Suggestor', description: 'Suggest a weekly meal plan.', category: 'Lifestyle', maxTokens: 500, promptTemplate: 'Suggest a weekly meal plan for {{input}}' },
  { id: 'daily-menu', name: 'Daily Lunch and Dinner Menu', description: 'Suggest a daily lunch and dinner menu.', category: 'Lifestyle', maxTokens: 300, promptTemplate: 'Suggest a lunch and dinner menu for a day based on {{input}}' },

  // Wellness Tools
  { id: 'dream-interpreter', name: 'AI Dream Interpreter', description: 'Interpret the meaning of a dream.', category: 'Wellness', maxTokens: 300, promptTemplate: 'Interpret the meaning of a dream about {{input}}' },
  { id: 'stress-buster', name: 'Stress Buster Chat', description: 'Provide tips to reduce stress.', category: 'Wellness', maxTokens: 300, promptTemplate: 'Provide 5 tips to reduce stress related to {{input}}' },
  { id: 'symptom-explainer', name: 'Symptom Explainer', description: 'Explain possible causes of symptoms.', category: 'Wellness', maxTokens: 500, promptTemplate: 'Explain possible causes of the symptom {{input}}' },
  { id: 'counselor', name: 'Counselor', description: 'Provide advice for emotional well-being.', category: 'Wellness', maxTokens: 500, promptTemplate: 'Provide advice for emotional well-being related to {{input}}' },
  { id: 'motivational-quote', name: 'Motivational Quote Generator', description: 'Generate a motivational quote.', category: 'Wellness', maxTokens: 100, promptTemplate: 'Generate a motivational quote about {{input}}' },
  { id: 'mental-wellness', name: 'Mental Wellness Coach', description: 'Provide guidance for mental wellness.', category: 'Wellness', maxTokens: 500, promptTemplate: 'Provide guidance for mental wellness related to {{input}}' },

  // Social Tools
  { id: 'virtual-chat', name: 'Virtual Chat Companions', description: 'Simulate a conversation with a virtual companion.', category: 'Social', maxTokens: 500, promptTemplate: 'Simulate a conversation with a virtual companion about {{input}}' },

  // Finance Tools
  { id: 'financial-advisor', name: 'Financial Advisor', description: 'Provide financial advice and tips.', category: 'Finance', maxTokens: 500, promptTemplate: 'Provide financial advice for {{input}}' },

  // Pet Care Tools
  { id: 'pet-care', name: 'Pet Care Expert', description: 'Provide pet care advice.', category: 'Pet Care', maxTokens: 500, promptTemplate: 'Provide pet care advice for {{input}}' },

  // Sustainability Tools
  { id: 'sustainability-advisor', name: 'Sustainability Advisor', description: 'Provide tips for sustainable living.', category: 'Sustainability', maxTokens: 500, promptTemplate: 'Provide 5 tips for sustainable living related to {{input}}' },

  // DIY Tools
  { id: 'diy-expert', name: 'DIY Expert', description: 'Provide DIY project ideas and instructions.', category: 'DIY', maxTokens: 500, promptTemplate: 'Provide a DIY project idea and instructions for {{input}}' },

  // Miscellaneous Tools
  { id: 'text-expander', name: 'Expand Text', description: 'Expand a short text into a longer version.', category: 'Miscellaneous', maxTokens: 700, promptTemplate: 'Expand the following text into a longer version: {{input}}' },
  { id: 'text-contractor', name: 'Contract Text', description: 'Shorten a long text.', category: 'Miscellaneous', maxTokens: 300, promptTemplate: 'Shorten the following text: {{input}}' },
  { id: 'keyword-density', name: 'Keyword Density', description: 'Analyze keyword density in text.', category: 'Miscellaneous', maxTokens: 300, promptTemplate: 'Analyze the keyword density in the following text: {{input}}' },
  { id: 'readability-score', name: 'Readability Score', description: 'Calculate the readability score of text.', category: 'Miscellaneous', maxTokens: 200, promptTemplate: 'Calculate the readability score of the following text: {{input}}' },
  { id: 'text-to-speech-prompt', name: 'Text-to-Speech Prompt', description: 'Generate a prompt for text-to-speech.', category: 'Miscellaneous', maxTokens: 200, promptTemplate: 'Generate a text-to-speech prompt for {{input}}' },
  { id: 'acronym-expander', name: 'Expand Acronyms', description: 'Expand acronyms in text.', category: 'Miscellaneous', maxTokens: 300, promptTemplate: 'Expand all acronyms in the following text: {{input}}' },
];
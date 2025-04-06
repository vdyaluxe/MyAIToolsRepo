import { Component, OnInit, signal, WritableSignal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AI_TOOLS } from '../../ai-tools-data';
import { AiService } from '../../../../core/services/ai.service';

@Component({
  selector: 'app-tool-execute',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tool-execute.component.html',
  styleUrls: ['./tool-execute.component.scss'],
})
export class ToolExecuteComponent implements OnInit {
  tool = signal<any>(null);
  inputText: string = '';
  outputText: WritableSignal<string[]> = signal([]); // Array to store multiple responses
  loading = signal(false);
  selectedPrompt: string | null = null;
  suggestedPrompts: WritableSignal<string[]> = signal([]);
  @ViewChild('inputBox') inputBox!: ElementRef;

  constructor(private route: ActivatedRoute, private aiService: AiService) {}

  ngOnInit(): void {
    const toolId = this.route.snapshot.paramMap.get('toolId');
    const selectedTool = AI_TOOLS.find(t => t.id === toolId) || { id: 'default', name: 'Generic Tool', description: 'Provide a helpful response.', maxTokens: 500, promptTemplate: 'Respond to: {{input}}' };
    this.tool.set(selectedTool);
    this.loadInitialSuggestions();
  }

  onInputChange() {
    // Move input box to bottom when user starts typing
    if (this.inputText.trim() && !this.outputText().length) {
      this.moveInputToBottom();
    }
  }

  executeTool(): void {
    if (!this.inputText.trim() || this.loading()) return;

    this.loading.set(true);
    const tool = this.tool();
    const prompt = tool.promptTemplate.replace('{{input}}', this.inputText);
    this.inputText = ''; // Clear input after execution
    this.outputText.update(texts => [...texts, '']); // Add placeholder for new response

    this.aiService.executeTextTool(prompt, 'gpt-4o-mini', tool.maxTokens || 500, tool).subscribe({
      next: (result) => {
        this.outputText.update(texts => {
          const updated = [...texts];
          updated[updated.length - 1] = result;
          return updated;
        });
        this.loading.set(false);
        this.generateSuggestedPrompts(result);
      },
      error: (err) => {
        this.outputText.update(texts => {
          const updated = [...texts];
          updated[updated.length - 1] = 'Error processing request.';
          return updated;
        });
        this.loading.set(false);
      },
    });
  }

  clearChat(): void {
    this.inputText = '';
    this.outputText.set([]);
    this.suggestedPrompts.set([]);
    this.moveInputToCenter(); // Reset input box position
  }

  copyOutput(index: number): void {
    const text = this.outputText()[index];
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(() => alert('Failed to copy.'));
    }
  }

  selectPrompt(prompt: string) {
    this.inputText = prompt;
    this.selectedPrompt = prompt;
    this.moveInputToBottom();
  }

  private loadInitialSuggestions(): void {
    // Initial dynamic suggestions when page loads
    this.aiService.getSuggestedPrompts('Welcome to the tool!', this.tool().id, this.tool()).subscribe({
      next: (prompts) => this.suggestedPrompts.set(prompts),
      error: () => this.suggestedPrompts.set([]),
    });
  }

  private generateSuggestedPrompts(response: string): void {
    this.aiService.getSuggestedPrompts(response, this.tool().id, this.tool()).subscribe({
      next: (prompts) => this.suggestedPrompts.set(prompts),
      error: () => this.suggestedPrompts.set([]),
    });
  }

  private moveInputToBottom(): void {
    if (this.inputBox) {
      this.inputBox.nativeElement.style.position = 'fixed';
      this.inputBox.nativeElement.style.bottom = '20px';
      this.inputBox.nativeElement.style.left = '50%';
      this.inputBox.nativeElement.style.transform = 'translateX(-50%)';
    }
  }

  private moveInputToCenter(): void {
    if (this.inputBox) {
      this.inputBox.nativeElement.style.position = 'relative';
      this.inputBox.nativeElement.style.bottom = 'auto';
      this.inputBox.nativeElement.style.left = 'auto';
      this.inputBox.nativeElement.style.transform = 'none';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.executeTool();
    }
  }
}
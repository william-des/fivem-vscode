import * as vscode from "vscode";
import { NativeFunction } from "../types/nativeFunction";

export class CompletionItemProvider implements vscode.CompletionItemProvider {
	private natives: { name: string; completionItem: vscode.CompletionItem }[] = [];

	constructor(natives: NativeFunction[]) {
		for (const native of natives) {
			this.addNative(native);
		}
	}

	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken,
		context: vscode.CompletionContext
	): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
		const wordRange = document.getWordRangeAtPosition(new vscode.Position(position.line, position.character - 1));
		if (!wordRange) return;

		const text = document.getText(wordRange).toLowerCase();

		return this.natives.filter((n) => n.name.indexOf(text) != -1).map((n) => n.completionItem);
	}

	private addNative(native: NativeFunction) {
		const completionItem = new vscode.CompletionItem(native.name, vscode.CompletionItemKind.Function);

		completionItem.documentation = new vscode.MarkdownString();

		const params = native.params.map((p) => `${p.name}: ${p.type}`).join(", ");
		completionItem.documentation.appendCodeblock(
			`${native.name}(${params})${native.results && `: ${native.results}`}`
		);

		if (native.description) {
			completionItem.documentation.appendMarkdown(`  \n\n${native.description}`);
		}

		this.natives.push({ name: native.name.toLowerCase(), completionItem });
	}
}

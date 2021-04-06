import * as vscode from "vscode";
import { NativeFunction } from "../types/nativeFunction";

export class HoverProvider implements vscode.HoverProvider {
	private natives: { [key: string]: vscode.MarkdownString[] } = {};

	constructor(natives: NativeFunction[]) {
		for (const native of natives) {
			this.addNative(native);
		}
	}

	provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.Hover> {
		const hoveredWordRange = document.getWordRangeAtPosition(position, /[\w]+/);
		if (!hoveredWordRange) return;
		const hoveredWord = document.getText(hoveredWordRange);

		const native = this.natives[hoveredWord];
		return !!native && new vscode.Hover(native, hoveredWordRange);
	}

	private addNative(native: NativeFunction) {
		const markdown = [];

		const params = native.params.map((p) => `${p.name}: ${p.type}`).join(", ");
		const header = new vscode.MarkdownString().appendCodeblock(`${native.name}(${params})  \n`);
		markdown.push(header);

		if (native.description) {
			const description = new vscode.MarkdownString().appendMarkdown(native.description);
			markdown.push(description);
		}

		this.natives[native.name] = markdown;
	}
}

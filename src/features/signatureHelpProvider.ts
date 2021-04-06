import * as vscode from "vscode";
import { NativeFunction } from "../types/nativeFunction";

export class SignatureHelpProvider implements vscode.SignatureHelpProvider {
	private natives: { [key: string]: vscode.SignatureInformation } = {};

	constructor(natives: NativeFunction[]) {
		for (const native of natives) {
			this.addNative(native);
		}
	}

	provideSignatureHelp(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken,
		context: vscode.SignatureHelpContext
	): vscode.ProviderResult<vscode.SignatureHelp> {
		const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
		let currentParameter = 0;
		let nestedOpened = 0;
		let nestedClosed = 0;
		let parametersStart = textBeforeCursor.length;

		while (parametersStart > -1) {
			if (textBeforeCursor.charAt(parametersStart) == "," && nestedOpened == nestedClosed) {
				currentParameter++;
			} else if (textBeforeCursor.charAt(parametersStart) == ")") {
				nestedClosed++;
			} else if (textBeforeCursor.charAt(parametersStart) == "(") {
				nestedOpened++;
			}

			if (textBeforeCursor.charAt(parametersStart) == "(" && nestedOpened > nestedClosed) break;

			parametersStart--;
		}

		const methodNameRange = document.getWordRangeAtPosition(
			new vscode.Position(position.line, parametersStart),
			/[\w\.]+/
		);
		if (!methodNameRange) return;

		const methodName = document.getText(methodNameRange);
		const signature = this.natives[methodName];
		if (!signature) return;

		let signatureHelp = new vscode.SignatureHelp();
		signatureHelp.activeParameter = currentParameter;
		signatureHelp.activeSignature = 0;
		signatureHelp.signatures.push(signature);

		return signatureHelp;
	}

	private addNative(native: NativeFunction) {
		const params = native.params.map((p) => `${p.name}: ${p.type}`).join(", ");
		const signature = new vscode.SignatureInformation(`${native.name}(${params})`);

		if (native.description) {
			signature.documentation = new vscode.MarkdownString().appendMarkdown(native.description);
		}

		if (native.params) {
			for (const param of native.params) {
				const paramInfos = new vscode.ParameterInformation(
					`${param.name}: ${param.type}`,
					new vscode.MarkdownString(param.description)
				);
				signature.parameters.push(paramInfos);
			}
		}

		this.natives[native.name] = signature;
	}
}

import * as vscode from "vscode";
import { CompletionItemProvider } from "./features/completionItemProvider";
import { HoverProvider } from "./features/hoverProvider";
import { SignatureHelpProvider } from "./features/signatureHelpProvider";
import { NativeService } from "./data/nativeService";

export async function activate(context: vscode.ExtensionContext) {
	console.log("Extension fivem-vscode loading");

	const natives = await NativeService.getAllNatives();

	let disposable = vscode.languages.registerHoverProvider("lua", new HoverProvider(natives));
	context.subscriptions.push(disposable);

	disposable = vscode.languages.registerSignatureHelpProvider("lua", new SignatureHelpProvider(natives), "(", ",");
	context.subscriptions.push(disposable);

	disposable = vscode.languages.registerCompletionItemProvider("lua", new CompletionItemProvider(natives));
	context.subscriptions.push(disposable);

	console.log("Extension fivem-vscode activated !");
}

export function deactivate() {}

import fetch from "node-fetch";
import { DocumentationResponse } from "../types/documentationResponse";
import { NativeFunction } from "../types/nativeFunction";
import { NativeParam } from "../types/nativeParam";

const documentationUrls = [
	"https://runtime.fivem.net/doc/natives.json",
	"https://runtime.fivem.net/doc/natives_cfx.json",
];

export class DocumentationService {
	static async getAllNatives(): Promise<NativeFunction[]> {
		const nativeArrays = await Promise.all(documentationUrls.map((url) => this.fetchNatives(url)));

		const allNatives: NativeFunction[] = [];

		for (const natives of nativeArrays) {
			allNatives.push(...natives);
		}
		
		return allNatives;
	}

	private static async fetchNatives(url: string): Promise<NativeFunction[]> {
		const response = await fetch(url);
		const responseData = (await response.json()) as DocumentationResponse;

		const natives: NativeFunction[] = [];

		for (const section of Object.values(responseData)) {
			for (const native of Object.values(section)) {
				if (native.name) {
					native.name = this.parseNativeName(native.name);
					native.description = native.description && this.parseNativeDescription(native.description);
					native.params = this.parseNativeParams(native.params);
					native.results = native.results && this.parseType(native.results);
					natives.push(native);
				}
			}
		}

		return natives;
	}

	private static parseNativeName(rawName: string) {
		return rawName
			.split("_")
			.filter((n) => n.length > 0)
			.map((n) => n.substr(0, 1) + n.substr(1).toLowerCase())
			.join("");
	}

	private static parseNativeDescription(rawDescription: string) {
		const from = rawDescription.startsWith("```") ? 3 : 0;
		const to = rawDescription.endsWith("```") ? rawDescription.length - 3 : rawDescription.length;
		return rawDescription.substr(from, to - from);
	}

	private static parseNativeParams(params: NativeParam[]) {
		return params.map((p) => ({ ...p, type: this.parseType(p.type) }));
	}

	private static parseType(rawType: string) {
		const type = rawType.replace("*", "");

		switch (type) {
			case "int":
			case "float":
			case "long":
				return "number";
			case "BOOL":
				return "boolean";
			case "char":
				return "string";
			case "Vector3":
				return "vector3";
			case "Any":
				return "any";
			case "void":
				return "";
			default:
				return type;
		}
	}
}

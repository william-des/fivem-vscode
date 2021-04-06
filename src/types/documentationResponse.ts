import { NativeFunction } from "./nativeFunction";

export interface DocumentationResponse {
	[key: string]: { [key: string]: NativeFunction };
}


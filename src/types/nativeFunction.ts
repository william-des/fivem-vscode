import { NativeParams } from "./nativeParams";

export interface NativeFunction {
	name: string;
	type: string;
	description?: string;
	params: NativeParams[];
}

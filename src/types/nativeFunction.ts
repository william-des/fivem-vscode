import { NativeParam } from "./nativeParam";

export interface NativeFunction {
	name: string;
	type: string;
	description?: string;
	params: NativeParam[];
	results?: string;
}

import { ModuleStatus } from "./enum/ModuleStatus";
import { ModuleType } from "./enum/ModuleType";

export type ModuleData = {
	name: string;
	type: ModuleType;
	status: ModuleStatus;
};

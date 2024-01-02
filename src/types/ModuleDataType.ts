import { ModuleStatus } from "../util/enum/ModuleStatus";
import { ModuleType } from "../util/enum/ModuleType";

export type ModuleData = {
	name: string;
	type: ModuleType;
	status: ModuleStatus;
};

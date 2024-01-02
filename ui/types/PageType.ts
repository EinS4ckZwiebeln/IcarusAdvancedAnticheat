export type DashboardData = {
	players: number;
	modulesAmount: number;
	violations: number;
	chartDays: string[];
	chartValue: number[];
	nodeMemory: number;
	cpuModel: string;
	platform: string;
};

enum ModuleType {
	TYPE_TICK = "TICK",
	TYPE_EVENT = "EVENT",
}

type ModuleData = {
	name: string;
	type: ModuleType;
	status: boolean;
};

export type ModulesData = {
	disabledModules: number;
	unloadedModules: number;
	activeModules: number;
	moduleData: ModuleData[];
};

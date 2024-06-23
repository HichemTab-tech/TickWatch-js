// noinspection JSUnusedGlobalSymbols

declare module "tickwatchjs" {

    type PartsKeys = string | { [key: string]: number };

    interface TickWatchSettings {
        partsKeys: PartsKeys[];
        direction: 'up' | 'down';
        startTime: string | null;
        endTime: string | null;
        activeCellClass: string;
        inactiveCellClass: string;
        displayOnly: boolean;
        displaySize: number | null;
    }

    type TickWatchOptions = Partial<TickWatchSettings>;

    interface TickWatchData {
        idSuffix: number;
        settings: TickWatchSettings;
        parts: { [key: string]: number };
        partsLength: number;
        isCounting: boolean;
        timer: NodeJS.Timeout | null;
        current: string | null;
    }

    type TickWatchResult = any[] | any;

    interface TickWatchMethods {
        start(results: any[], data: TickWatchData): any[];
        stop(results: any[], data: TickWatchData): any[];
        set(results: any[], data: TickWatchData, args: any[]): any[];
        clear(results: any[], data: TickWatchData): any[];
        option(results: any[], data: TickWatchData, args: any[]): any[];
        destroy(results: any[], data: TickWatchData): any[];
    }

    interface TickWatchStatic {
        (options?: TickWatchOptions): TickWatchResult;
        (method: "start"): TickWatchResult;
        (method: "stop"): TickWatchResult;
        (method: "set", ...args: any[]): TickWatchResult;
        (method: "clear"): TickWatchResult;
        (method: "option", ...args: any[]): TickWatchResult;
        (method: "destroy"): TickWatchResult;
    }

    export const TickWatch: TickWatchStatic;

    export type { TickWatchOptions, TickWatchSettings, TickWatchData, TickWatchMethods, TickWatchResult };
}
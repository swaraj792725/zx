import { Buffer } from 'node:buffer';
import { Readable } from 'node:stream';
import { type Mode } from 'node:fs';
import { type ProcessPromise } from './core.js';
import { type Duration } from './util.js';
import { type RequestInfo, type RequestInit, minimist } from './vendor.js';
export { versions } from './versions.js';
export declare function tempdir(prefix?: string, mode?: Mode): string;
export declare function tempfile(name?: string, data?: string | Buffer, mode?: Mode): string;
export { tempdir as tmpdir, tempfile as tmpfile };
type ArgvOpts = minimist.Opts & {
    camelCase?: boolean;
    parseBoolean?: boolean;
};
export declare const parseArgv: (args?: string[], opts?: ArgvOpts, defs?: Record<string, any>) => minimist.ParsedArgs;
export declare function updateArgv(args?: string[], opts?: ArgvOpts): void;
export declare const argv: minimist.ParsedArgs;
export declare function sleep(duration: Duration): Promise<void>;
export declare const responseToReadable: (response: Response, rs: Readable) => Readable;
export declare function fetch(url: RequestInfo, init?: RequestInit): Promise<Response> & {
    pipe: {
        (dest: TemplateStringsArray, ...args: any[]): ProcessPromise;
        <D>(dest: D): D;
    };
};
export declare function echo(...args: any[]): void;
export declare function question(query?: string, { choices, input, output, }?: {
    choices?: string[];
    input?: NodeJS.ReadStream;
    output?: NodeJS.WriteStream;
}): Promise<string>;
export declare function stdin(stream?: Readable): Promise<string>;
export interface RetryOptions {
    delay?: Duration | Generator<number>;
    shouldRetry?: (err: unknown, attempt: number) => boolean;
}
export declare function retry<T>(count: number, callback: (attempt: number, lastErr?: unknown) => T): Promise<T>;
export declare function retry<T>(count: number, durationOrOptions: Duration | Generator<number> | RetryOptions, callback: (attempt: number, lastErr?: unknown) => T): Promise<T>;
export declare function expBackoff(max?: Duration, delay?: Duration, jitter?: boolean | number): Generator<number, void, unknown>;
export declare function spinner<T>(callback: () => T): Promise<T>;
export declare function spinner<T>(title: string, callback: () => T): Promise<T>;

export class ConsoleFlags {
    private args: string[];

    constructor() {
        this.args = process.argv.slice(2); // Get CLI arguments
    }

    public get shouldCopyToClipboard(): boolean {
        return this.args.includes('-c');
    }

    public get shouldCommitAndPush(): boolean {
        return this.args.includes('--commitAndPush');
    }
}

export const consoleFlags = new ConsoleFlags();
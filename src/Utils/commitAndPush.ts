import { exec } from "child_process";
import * as util from "node:util";

const execPromise = util.promisify(exec);

export async function commitAndPushChanges() {
    try {
        await execPromise("git add export/*.txt"); // Adjust the path if needed
        await execPromise(`git commit -m "🔄 Auto-update $(date)"`);
        await execPromise("git push origin main"); // Change 'main' to your branch if different
        console.log("✅ Changes committed and pushed.");
    } catch (error) {
        console.error("❌ Error committing/pushing changes:", error);
    }
}
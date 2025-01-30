import type { Config } from '@netlify/functions'
import rebuildSite from '../../functions/rebuildSite.mts';

// Rebuild daily to update any activity data
// e.g. /links/ page
export default async (request: Request) => {
    await rebuildSite('Twice daily rebuild to update activities');
};

// Run every day at midnight and midday
export const config: Config = {
    schedule: '0 1,13 * * *'
};

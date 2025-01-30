declare var process : {
    env: {
        NETLIFY_REBUILD_HOOK: string
    }
}

// Netlify allows you to call a build hook to rebuild your site
// and add trigger_title to the query string to specify the reason for the rebuild.
export default async (triggerTitle: string) => {
    const url = new URL(process.env.NETLIFY_REBUILD_HOOK);
    url.searchParams.append('trigger_title', triggerTitle);

    return await fetch(url.toString(), {
        method: 'POST',
    });
};

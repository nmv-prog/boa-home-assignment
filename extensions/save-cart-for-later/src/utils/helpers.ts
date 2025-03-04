export const extractDomain = (url: string) => {
    const match = url.match(/https:\/\/[^\/]+/);
    return match ? match[0] : null;
};
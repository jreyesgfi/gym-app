export const currentCredentials = ():{ID:string, token:string} => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { ID, token } = params;
    return {ID, token};
}
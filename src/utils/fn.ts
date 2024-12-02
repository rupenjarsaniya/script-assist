export const getIdFromUrl = (url: string): string => {
    const _url = url.split("/");
    const id = _url[_url.length - 2];
    return id;
};

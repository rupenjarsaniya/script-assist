export const getIdFromUrl = (url: string): string => {
    const _url = url.split("/");
    const id = _url[_url.length - 2];
    return id;
};

export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

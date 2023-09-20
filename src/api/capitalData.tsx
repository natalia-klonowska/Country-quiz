const baseApiURL = 'https://restcountries.com/v3.1/capital/';

export function getCapitalData<T>(capital: string): Promise<T> {
    return fetch(baseApiURL + capital)
        .then(response => response.json())
}
const baseApiURL = 'https://restcountries.com/v3.1/';

export function getCapitalData<T>(capital: string): Promise<T> {
    return fetch(baseApiURL + 'capital/' + capital)
        .then(response => response.json())
}

export function getCountryData<T>(country: string): Promise<T> {
    return fetch(baseApiURL + 'name/' + country)
        .then(response => response.json())
}
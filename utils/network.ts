import Axios, { AxiosResponse } from 'axios';

export async function getUrls(urls:string[]): Promise<AxiosResponse<any>[]> {
	let promises:Array<Promise<AxiosResponse<any>>>=[]
	urls.forEach(url => promises.push(Axios.get(url)));
	return await Promise.all(promises);
}
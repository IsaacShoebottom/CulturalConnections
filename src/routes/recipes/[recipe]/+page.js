import { error } from '@sveltejs/kit'; 
  
/** @type {import('./$types').PageLoad} */ 
export async function load({ fetch, params }) { 
	const response = await fetch('./' + params.recipe + '.json') 
	if (response.ok) {
		const data = await response.json();
		return { data };
	} else {
		throw error(404, 'Not found');
	}
}
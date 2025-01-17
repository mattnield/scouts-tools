import axios from 'axios';
import {useApplicationContext} from "@/context/ApplicationContext";

/**
 * Fetch section names from the Online Scout Manager API.
 * @returns A promise resolving to an array of section names.
 */
export async function fetchSectionNames(accessToken: string): Promise<string[]> {
    try {
        console.log(accessToken);
        const response = await axios.get('https://www.onlinescoutmanager.co.uk/ext/generic/startup/?action=getData', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const dataString = response.data;
        const unescapedDataString = decodeURIComponent(dataString);
        const jsonData = JSON.parse(unescapedDataString.replace(/^var data_holder = /, '').replace(/;$/, ''));

        const sectionNames = jsonData.globals.roles.map((role: { sectionname: string }) => role.sectionname);

        return sectionNames;
    } catch (error: any) {
        console.error('Error fetching section names:', error.response?.data || error.message);
        throw new Error('Failed to fetch section names');
    }
}
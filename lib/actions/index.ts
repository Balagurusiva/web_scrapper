"use server"

import { scrapAmazonProduct } from "../scraper";

export async function scrapAndStoreProduct(productUrl : string){
    if(!productUrl) return;

    try {
        const scrapedProduct = await scrapAmazonProduct(productUrl); 

        if(!scrapedProduct) return;

    } catch (error: any) {
        throw new Error(`failed to create/update : ${error.message}`)
    }
}
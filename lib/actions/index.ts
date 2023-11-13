"use server"

import { connect } from "http2";
import { scrapAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mogoose";

export async function scrapAndStoreProduct(productUrl : string){
    if(!productUrl) return;

    try {
        connectToDB()

        const scrapedProduct = await scrapAmazonProduct(productUrl); 

        if(!scrapedProduct) return;

    } catch (error: any) {
        throw new Error(`failed to create/update : ${error.message}`)
    }
}
"use server"
import { revalidatePath } from "next/cache"; 
import { scrapAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mogoose";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../scraper/utils";

export async function scrapAndStoreProduct(productUrl : string){
    if(!productUrl) return;

    try {
        connectToDB()

        const scrapedProduct = await scrapAmazonProduct(productUrl); 
        if(!scrapedProduct) return;

        let product = scrapedProduct

        const existingproduct = await Product.findOne({url : scrapedProduct.url})

        if(existingproduct){
            const updatedpriceHistory : any= [
                ...existingproduct.priceHistory,
                {price:scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedpriceHistory,
                lowestPrice:getLowestPrice(updatedpriceHistory),
                higestPrice:getHighestPrice(updatedpriceHistory),
                averagePrice:getAveragePrice(updatedpriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate({
            url:scrapedProduct.url},
            product,
            {upsert:true, new:true}
        );

        revalidatePath(`/products/$(newProduct._id)`)
    } catch (error: any) {
        throw new Error(`failed to create/update : ${error.message}`)
    }
}

export async function getProductDetail(productId:string){
    try {
        connectToDB()

        const product = await Product.findOne({_id:productId})
        if(!product) return null
        return product
    } catch (error) {
        console.log(error)
    }
}

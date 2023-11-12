import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractPrice } from './utils'

export const scrapAmazonProduct = async (url: string) =>{

    const userName = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0
    const options = {
        auth:{
            username : `${userName}-session-${session_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try { 
        const response =await axios.get(url, options)
        const $ = cheerio.load(response.data)

        const title = $('#productTitle').text().trim()
        const currentPrice  = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        )     
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-bse.a-color-price')
        )
        const images = 
           $('#imgBlkFront').attr('data-a-dynamic-image') ||
           $('#landingImage').attr('data-a-dynamic-image') ||
           '{}'

        const currency = extractcurrency($('.a-price-symbol'))

        const imageUrls = Object.keys(JSON.parse(images))
        const outOfStock = $('#availability span').text().trim().toLowerCase() === "currently unavailable"

        console.log({title,currentPrice,originalPrice, outOfStock,imageUrls})   
    } catch (error : any) {
        throw new Error(`Failed to scrape product : ${error.message}`)
    }

}
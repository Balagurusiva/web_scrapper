"use server"

import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice  } from './utils'

export const scrapAmazonProduct = async (url: string) =>{
    if(!url) return

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
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,'')

        const imageUrls = Object.keys(JSON.parse(images))
        const outOfStock = $('#availability span').text().trim().toLowerCase() === "currently unavailable"
        const description = extractDescription($)
        const reviewCount =120

        const data = {
            url,
            currency:currency || "₹",
            image:imageUrls[0],
            title,
            currentPrice:Number(currentPrice) || Number(originalPrice),
            originalPrice:Number(originalPrice) || Number(currentPrice),
            priceHistory:[],
            discountRate:Number(discountRate),
            category:"category",
            reviewCount:Number(reviewCount),
            stars:4.5,
            isOutOfStock:outOfStock,
            description,
            lowestPrice:Number(currentPrice) || Number(originalPrice),
            highestPrice:Number(originalPrice) || Number(currentPrice),
            averagePrice:Number(currentPrice) || Number(originalPrice),
        }
        return data
    } catch (error : any) {
         console.log(error)
    }

}
import PriceInfoCard from "@/components/PriceInfoCard"
import ProductCard from "@/components/ProductCard"
import { getProductById, getsimilarProducts  } from "@/lib/actions"
import { formatNumber } from "@/lib/scraper/utils"
import { Model } from "mongoose"
import { redirect } from "next/dist/server/api-utils"
import Image from "next/image"
import Link from "next/link"

type props = {
  params : {id : string}
}

const Product = async ({params:{id}}:props) => {
    const product = await getProductById(id)
     

    if(!product) return redirect('/') 

    const similarProduct = await getsimilarProducts(id)
 
  return (
      <div className="product-container">
        <div className="flex gap-28 xl:flex-row flex-col">
            <div className="product-image ">
                <Image 
                   src = {product.image}
                   alt = {product.title}
                   width = {300}
                   height={250}
                   className ='  mx-auto my-auto object-contain'
                />
            </div>
            <div className="flex-1 flex flex-col ">
                <div className="flex justify-between items-start gap-5 flex-wrap pb=6">
                    <div className="flex flex-col gap-3">
                        <p className="text-[28px] text-white opacity-80 font-semibold">
                            {product.title}
                        </p>
                        <Link 
                           href={product.url} 
                           target = '_blank'
                           className = "text-base text-white opacity-50"
                           >
                            Visit Product
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image 
                                  src = '/assets/icons/red-heart.svg'
                                  alt="heart"
                                  width= {20}
                                  height={20} 
                                />

                                <p className="text-base font-semibold text-[#e15c67]">{product.reviewCount}</p>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image 
                                  src = '/assets/icons/bookmark.svg'
                                  alt = 'save'
                                  width = {20}
                                  height={20}
                                />
                             </div>

                             <div className="p-2 bg-white-200 rounded-10">
                                <Image 
                                  src = '/assets/icons/share.svg'
                                  alt = 'share'
                                  width = {20}
                                  height={20}
                                />
                             </div>
                        </div> 
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-white-100 font-bold">
                                {product.currency} {formatNumber(product.currentPrice) }
                            </p>

                            <p className="text-[21px] text-white-100 font-bold opacity-50 line-through">
                                {product.currency} {formatNumber(product.originalPrice) }
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex">
                                <div className="product-stars">
                                    <Image 
                                      src = '/assets/icons/star.svg'
                                      alt = 'star'
                                      width={16}
                                      height={16}
                                    />
                                    <p className="text-sm text-primary-orange font-semibold">
                                        {product.stars || '25'}
                                    </p>
                                </div>

                                <div className="product-reviews">
                                    <Image 
                                      src = '/assets/icons/comment.svg'
                                      alt = 'review'
                                      width={16}
                                      height={16}
                                    />
                                    <p className="text-sm text-secondary font-semibold">
                                        {product.reviewCount} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-white  ">
                                <span className="text-[#8bf58b] font-semibold">93% </span> of
                                buyers have recommended this.
                            </p>
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                             <PriceInfoCard 
                                 title = "Current Price"
                                 iconSrc = '/assets/icons/price-tag.svg'
                                 value = {`${product.currency} ${formatNumber(product.currentPrice)}`} 
                             />
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                             <PriceInfoCard 
                                 title = "Average Price"
                                 iconSrc = '/assets/icons/chart.svg'
                                 value = {`${product.currency} ${formatNumber(product.averagePrice)}`} 
                             />
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                             <PriceInfoCard 
                                 title = "Heighest Price"
                                 iconSrc = '/assets/icons/arrow-up.svg'
                                 value = {`${product.currency} ${formatNumber(product.hightestPrice)}`} 
                             />
                        </div>
                    </div>

                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">
                             <PriceInfoCard 
                                 title = "Lowest Price"
                                 iconSrc = '/assets/icons/arrow-down.svg'
                                 value = {`${product.currency} ${formatNumber(product.lowestPrice)}`} 
                             />
                        </div>
                    </div>
                </div>
                <Model />
            </div>     
        </div>
        <div className="flex flex-col gap-16 ">
                <div className="felx flex-col gap-5">
                    <h3 className="text-2xl   font-semibold">
                        Product Description
                    </h3>

                    <div className="flex flex-col gap-4">
                        {product?.description?.split('.')}
                    </div>

                    <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
                        <Image src='/assets/icons/bag.svg' alt='check' width={22} height={22} />
                        <Link href='/' className="text-base text-white"> Buy now</Link>
                    </button>
                </div>
                {similarProduct && similarProduct?.length > 0 &&  (
                    <div className="py-14 flex flex-col gap-2 w-full">
                        <p className="section-text">Similar Products</p>

                        <div className="flex flex-wrap gap-10 mt-7 w-full">
                            {similarProduct.map((productItem:any) =>(
                                <ProductCard key={productItem._id} product ={productItem} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
      </div>
  )
}

export default Product
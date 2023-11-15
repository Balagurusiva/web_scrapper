import { getProductById  } from "@/lib/actions"
import { redirect } from "next/dist/server/api-utils"
import Image from "next/image"
import Link from "next/link"

type props = {
  params : {id : string}
}

const Product = async ({params:{id}}:props) => {
    const product = await getProductById(id)

    if(!product) return redirect('/') 
  return (
      <div className="product-container">
        <div className="flex gap-28 xl:flex-row flex-col">
            <div className="product-image ">
                <Image 
                   src = {product.image}
                   alt = {product.title}
                   width = {250}
                   height={250}
                   className ='mx-auto object-contain'
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

                        <div className="flex items-center gap=3">
                            <div className="product-hearts">
                                <Image 
                                  src = '/assets/icons/red-heart.svg'
                                  alt="heart"
                                  width= {20}
                                  height={20} 
                                />

                                <p className="text-base font-semibold text-[#e15c67]">{product.reviewCount}</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Product
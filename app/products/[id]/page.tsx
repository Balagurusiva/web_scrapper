type props = {
  params : {id : string}
}

const Product = ({params:{id}}:props) => {
  return (
    <div>product detail {id}</div>
  )
}

export default Product
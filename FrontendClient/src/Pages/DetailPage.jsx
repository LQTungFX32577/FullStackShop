import { useParams, useRouteLoaderData } from "react-router-dom"
import ProductItem from "../Components/ProductItem";


function DetailPage() {
 
    const { productId } = useParams();
    const Data = useRouteLoaderData('root');

    const Item = Data.filter((data) => {
        return data.name.includes(`${productId}`)
    })
    console.log(Data);
    
     return (
        <>
            <ProductItem Item={Item}/>
        </>
    )
}
export default DetailPage
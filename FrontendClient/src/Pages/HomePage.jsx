import HomeBanner from "../Components/HomeBaner"
import {  json, useRouteLoaderData } from 'react-router-dom';
 function HomePage() {
    const data = useRouteLoaderData('root');
    
    return (
        <>
        {<HomeBanner products={data}/>}     
        </>
    )
}
export default HomePage
export async function loadEvents() {
    const response = await fetch('http://localhost:3100/shop/products');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch events.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }
  

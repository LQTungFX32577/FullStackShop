import { useEffect, useState } from "react";

export function useFetch(api, state) {
    const [value, setValue] = useState();
    useEffect(() => {
        const API = async() => {
          const response = await fetch(api);
          const hotelData = await response.json();
          setValue(hotelData)
        };
        API();
      },[state])
      return value
}
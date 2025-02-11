import {
  useQuery,
  useIsMutating,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const Products = () => {
  // fetch data
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://67aabfbe65ab088ea7e76193.mockapi.io/mockapi/p1/product");
          let data= response.data
        console.log(data); // Log the API response data
        return data; // Return the data if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
console.log(data);

  return (
    <>
    {/* <div className="container">
      {data.map((userid,product)=>(
        <div key={id}>
          <div>
            {product.name}
          </div>
        </div>
      ))}

    </div> */}
    </>
  );
};

export default Products;

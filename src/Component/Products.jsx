import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
//fetching data

const FetchData = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/carts");
    console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Deleting function
const deletePost = async (id) => {
  try {
    await axios.delete(`https://dummyjson.com/carts/${id}`);
    return id; // Return the deleted cart ID
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const Products = () => {
  const queryClient = useQueryClient();

  // fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: FetchData,
  });

  console.log(data);

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["products"], (oldData) => {
        if (!oldData || !oldData.carts) return oldData;
        return {
          ...oldData,
          carts: oldData.carts.filter((cart) => cart.id !== deletedId), // Correct filtering
        };
      });
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;
//update mutation
const updateMutation= useMutation({
  mutationFn: async(id)=>{
    const { value: text } = await Swal.fire({
      input: "test",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });
    if (text) {
      Swal.fire(text);
    }
  }
})
  return (
    <>
      {data?.carts?.map((cart) => (
        <div key={cart.id}>
          <h3>Cart ID: {cart.id}</h3>
          {cart.products.map((product) => (
            <div key={product.id}>
              <p>Product Name: {product.title}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
          <button onClick={() => deleteMutation.mutate(cart.id)}>delet</button>
          <button onClick={() => updateMutation.mutate(cart.id)}>post</button>
        </div>
      ))}
    </>
  );
};

export default Products;

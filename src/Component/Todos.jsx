import {
  useQuery,
  useIsMutating,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const Todos = () => {
// fetch data
const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get("https://dummyjson.com/todos");
      return response.data.todos;
    },
  });


  async function getData() {
    try {
      await axios("https://dummyjson.com/carts")
        .then((res) => console.log(res.data))
        .catch(console.error(e.message));
    } catch  {
      console.log(e.message);
    }
  }
  getData()
  return (
    <>
      <div>
       hello
      </div>
    </>
  );
};

export default Todos;

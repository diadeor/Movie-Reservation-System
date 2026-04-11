import axios from "axios";

const useFetch = (method: "get" | "delete" = "get") => {
  const getReq = async (url: string) => {
    try {
      const { data: resp } = await axios({ method, url, withCredentials: true });
      // console.log(resp);
      if (resp.success || resp.Response === "True") {
        return { data: resp, error: null };
      } else {
        return { data: null, error: resp.message ?? resp.Error };
      }
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };
  return getReq;
};

export default useFetch;

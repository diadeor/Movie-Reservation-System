import axios from "axios";

const useFetch = () => {
  const getReq = async (url: string) => {
    try {
      const { data: resp } = await axios.get(url);
      // console.log(resp);
      if (resp.success || resp.Response === "True") {
        return { data: resp, error: "" };
      } else {
        return { data: "", error: resp.message };
      }
    } catch (error) {
      return { data: "", error: "There has been an error" };
    }
  };
  return getReq;
};

export default useFetch;

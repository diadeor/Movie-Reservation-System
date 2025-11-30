import axios from "axios";

const useFetch = (url: string) => {
  const getReq = async () => {
    try {
      const { data: resp } = await axios.get(url);
      if (resp.success) {
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

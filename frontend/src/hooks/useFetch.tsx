import axios from "axios";

const useFetch = (creds = true) => {
  const getReq = async (url: string) => {
    try {
      const { data: resp } = await axios.get(url, { withCredentials: creds });
      // console.log(resp);
      if (resp.success || resp.Response === "True") {
        return { data: resp, error: null };
      } else {
        return { data: null, error: resp.message ? resp.message : resp.Error };
      }
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };
  return getReq;
};

export default useFetch;

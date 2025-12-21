import axios from "axios";

const usePut = (url: string) => {
  const putReq = async (body: Object) => {
    try {
      const { data } = await axios.put(url, body, {
        withCredentials: true,
        validateStatus: () => true,
      });
      if (data.success) {
        return { data, error: null };
      } else {
        return { data: null, error: data.error };
      }
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };
  return putReq;
};

export default usePut;

import axios from "axios";

const usePost = (url: string) => {
  const postReq = async (body: Object) => {
    try {
      const { data } = await axios.post(url, body, {
        withCredentials: true,
        validateStatus: () => true,
      });
      if (data.success) {
        return { data, error: null };
      } else {
        return { data: null, error: data.message };
      }
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };
  return postReq;
};

export default usePost;

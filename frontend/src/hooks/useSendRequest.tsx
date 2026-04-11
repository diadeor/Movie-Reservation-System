import axios from "axios";

const useSendRequest = (url: string, method: "post" | "put" = "post") => {
  const req = async (body: Record<string, unknown>) => {
    try {
      const options = {
        withCredentials: true,
        validateStatus: () => true,
      };
      const { data } = await axios({ method, url, data: body, ...options });
      return data.success ? { data, error: null } : { data: null, error: data.error };
    } catch (error) {
      return { data: null, error: "There has been an error" };
    }
  };
  return req;
};

export default useSendRequest;

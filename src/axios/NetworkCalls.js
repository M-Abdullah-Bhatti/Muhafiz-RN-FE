import axiosInstance from ".";

export const GetAllData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    // console.log("data: ", data);
    if (data?.status) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: "No data found" };
    }
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
      message: error.response?.data.message || "An error occurred",
    };
  }
};

export const GetSingleData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.get(endpoint);
    if (data?.data) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: "No data found" };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message || "An error occurred",
    };
  }
};

export const DeleteSingleData = async (endpoint) => {
  try {
    const { data } = await axiosInstance.delete(endpoint);

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const PostData = async (endpoint, body) => {
  try {
    const { data } = await axiosInstance.post(endpoint, body);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const EditData = async (endpoint, body) => {
  try {
    const { data } = await axiosInstance.put(endpoint, body);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

// try {
//     setLoading(true);
//     const response = await PostData(`/api/inquiry/createInquiry`, values);

//     if (response?.status) {
//       toast.success(response?.message);
//       setLoading(false);
//       navigate("/");
//     } else {
//       toast.error(response);
//     }
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//     setLoading(true);
//   } finally {
//     setLoading(false);
//   }

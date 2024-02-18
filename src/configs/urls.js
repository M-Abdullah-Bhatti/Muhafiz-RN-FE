export const API_BASE_URL = "http://192.168.100.35:3001";

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN = getApiUrl("/users/signin");
export const SIGNUP = getApiUrl("/users/signup");
export const sendEmail = getApiUrl("/users/sendemail");
export const VerifyOtp = getApiUrl("/users/verifyOtp");
export const UpdatePassword = getApiUrl("/users/updatePassword");
export const CreateGoal = getApiUrl("/goals/create");

// post:
export const CreatePost = "/post/createPost";
export const GetAllPostsEndPoint = getApiUrl("/post/allPosts");
export const GetAllNotifications = getApiUrl(
  "/notification/getAllNotificationsForUser"
);
export const AddLikeOnPost = getApiUrl("/like/addLikesOnPost");

// contact:
export const CreateContact = "/contact/createContact";
export const GetMyContact = "/contact/getSingleContact";

// incident
export const CreateIncident = "/incident/createIncident";
export const GetMyIncidents = "/incident/allIncidents";

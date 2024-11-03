import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = () => token; //added this for debugging.

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error("Error creating object:", error);
    throw error;
  }
};

const update = async (oldBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("old token", token);
  console.log(config);
  const newBlog = {
    title: oldBlog.title,
    author: oldBlog.author,
    url: oldBlog.url,
    likes: oldBlog.likes + 1,
    user: oldBlog.user._id,
  };
  try {
    const response = await axios.put(
      `${baseUrl}/${oldBlog.id}`,
      newBlog,
      config
    );
    console.log("here is the response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating object:", error);
    throw error;
  }
};

export default { getAll, setToken, create, getToken, update };

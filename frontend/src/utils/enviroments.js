const dev_enviroments = {
  img_endpoint: import.meta.env.VITE_DEV_IMAGES_DIR,
  base_url: import.meta.env.VITE_DEV_API_URL,
};

const prod_env = {
  img_endpoint: import.meta.env.VITE_PROD_IMAGES_DIR,
  base_url: import.meta.env.VITE_PROD_API_URL,
};

const enviroments = import.meta.env.MODE === "production" ? prod_env : dev_enviroments;

export default enviroments;

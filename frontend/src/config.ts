const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL,
    endpoints: {
      images: `${import.meta.env.VITE_API_URL}/api/images`,
      descriptions: `${import.meta.env.VITE_API_URL}/api/descriptions`,
      vote: `${import.meta.env.VITE_API_URL}/api/vote`,
    },
  },
};

export default config;
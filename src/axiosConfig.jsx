import axios from "axios";

// let isRefreshing = false;
// let refreshSubscribers = [];
// Axios 기본 설정
const instance = axios.create({
  baseURL: "https://cuk.comatching.site",
  withCredentials: true,
});

// // 요청 인터셉터 설정
// instance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 리프레시 후 대기 중인 요청들을 처리하는 함수
// const processQueue = (error) => {
//   refreshSubscribers.forEach((callback) => {
//     if (error) {
//       callback(Promise.reject(error));
//     } else {
//       callback();
//     }
//   });
//   refreshSubscribers = [];
// };

// // 응답 인터셉터 설정
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.data?.code === "SEC-001" && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           refreshSubscribers.push((error) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(instance(originalRequest));
//             }
//           });
//         });
//       }

//       isRefreshing = true;
//       originalRequest._retry = true;

//       try {
//         await axios.post(
//           "https://cuk.comatching.site/auth/refresh",
//           {},
//           { withCredentials: true }
//         );
//         processQueue();
//         return instance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.code === "SEC-001" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("토큰 재요청");
        await axios.post(
          "https://cuk.comatching.site/auth/refresh",
          {},
          { withCredentials: true }
        );
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

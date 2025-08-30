// import axios from "axios";
// // import { AxiosError } from "axios";
// // import type { AxiosError } from "axios";

// const BASE_URL = "http://127.0.0.1:8001";

// // const MODEL_BASE_URL = `${BASE_URL}/get_chart_data`;
// const CHART_DATA_API = `${BASE_URL}/forecast_chart_data`;

// // const DIAGNOS_ADD_API = `${BASE_URL}/diagnosis/addDiagnos`;
// // const DIAGNOS_GET_API = `${BASE_URL}/diagnosis/getDiagnosis`;

// interface DiagnosisFormData {
//   [key: string]: any; // Update with actual structure if known
// }

// // interface ApiErrorResponse {
// // //   message?: string;
// //   error?: string;
// // }

// export const  getForecastChartData  = async (
//   ticker : string,
// //   formData: DiagnosisFormData
// ): Promise<void> => {
//   try {
//     console.log("In Diag Service");
//     await axios.post(`${CHART_DATA_API}/${ticker}`);


//     console.log("Upload successful");
//   } catch (err) {
//     // const err = error as AxiosError<ApiErrorResponse>;
//     console.error(
//       "Upload error:",
//       err.response?.data || "Something went wrong!"
//     );
//     throw err.response?.data || "Something went wrong!";
//   }
// };


import axios from "axios";
// import type { AxiosError } from "axios";

const BASE_URL = "http://127.0.0.1:8001";

const MODEL_BASE_URL = `${BASE_URL}/get_chart_data`;
// Note: The variable CHART_DATA_API is commented out in your original code,
// but the code below assumes you want to use it for a POST request.
// However, your backend is a GET request, so we should change the method.

interface DiagnosisFormData {
  [key: string]: any; // Update with actual structure if known
}

interface ApiErrorResponse {
  error?: string;
}

export const getForecastChartData = async (
  ticker: string,
  // formData: DiagnosisFormData // Not used for a GET request
): Promise<void> => {
  try {
    console.log("Fetching chart data...");
    // The backend endpoint is a GET request, not a POST
    // We also use the correct variable MODEL_BASE_URL
    const response = await axios.get(`${MODEL_BASE_URL}/${ticker}`);

    console.log("Data fetched successfully:", response.data);
  } catch (err) {
    // const error = err as AxiosError<ApiErrorResponse>;
    console.error(
      "Fetch error:",
      err.response?.data || "Something went wrong!"
    );
    throw err.response?.data || "Something went wrong!";
  }
};
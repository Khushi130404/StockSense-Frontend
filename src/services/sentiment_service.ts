// services/sentiment_service.ts
import axios from "axios";

const SENTIMENT_TRIGGER_URL = "http://127.0.0.1:8000/sentimentTrigger/";

export interface SentimentResponse {
  tweet: string;
  prediction: string;
}

export const triggerSentimentAnalysis =
  async (): Promise<SentimentResponse> => {
    try {
      const response = await axios.get<SentimentResponse>(
        SENTIMENT_TRIGGER_URL
      );
      console.log("Sentiment analysis triggered:", response.data);
      return response.data;
    } catch (err: any) {
      console.error(
        "Error fetching sentiment:",
        err.response?.data || err.message
      );
      throw err.response?.data || "Something went wrong!";
    }
  };

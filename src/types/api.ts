export interface IdeaCleanupResponse {
  refinedIdea: string;
}

export interface ApiResponse {
  output: string;
  timestamp: string;
  message: string;
}

export interface ApiError {
  error: string;
} 
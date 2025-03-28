export const serverConfig = {
  api: {
    endpoints: {
      ideaCleanup: 'https://n8n.lotsgoingon.com/webhook/03431c36-af8a-4b88-b0f1-813acda1e12d'
    },
    headers: {
      'api-key': 'ai-frames-auth'
    }
  }
} as const;

// Type for the server configuration
export type ServerConfig = typeof serverConfig; 
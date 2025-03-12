// Declare modules without type definitions
declare module "bcrypt";
declare module "cors";
declare module "jsonwebtoken";
declare module "some-other-module"; // Add as needed

// Extend Node.js types for environment variables
declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: "development" | "production" | "test";
        DATABASE_URL: string;
        JWT_SECRET: string;
        API_KEY: string;
        CLOUD_STORAGE_BUCKET: string; // Example for cloud storage
    }
}

// Extend Express types for custom middleware and user authentication
declare namespace Express {
    interface Request {
        userId?: string; // Attach user information to the request object after authentication
    }

    interface Response {
        sendSuccess: <T>(data: T, message?: string) => void; // Custom success response helper
        sendError: (message: string, statusCode?: number) => void; // Custom error response helper
    }
}

// Define custom types for user payloads and JWT tokens
interface UserPayload {
    id: string;
    email: string;
    role: "user" | "admin" | "moderator"; // Add roles specific to your app
    iat?: number; // Issued at timestamp
    exp?: number; // Expiration timestamp
}

// Define custom error types
interface ApiError extends Error {
    statusCode?: number; // HTTP status code for the error
    isOperational?: boolean; // To differentiate between handled and unhandled errors
}

// Utility types
type PaginatedResponse<T> = {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    data: T[];
};

// Extend JWT for custom payload
declare module "jsonwebtoken" {
    export interface JwtPayload extends UserPayload {}
}

// Commonly used generic types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// Middleware function type for easier typing
type Middleware = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => void;

// Decla

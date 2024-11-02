export const USER_API_END_POINT = 
    process.env.NODE_ENV === 'production' 
        ? "https://ankurmishra.online/api/v1/user" 
        : 'http://localhost:4000/api/v1/user';

export const TWEET_API_END_POINT = 
    process.env.NODE_ENV === 'production' 
        ? "https://ankurmishra.online/api/v1/tweet" 
        : 'http://localhost:4000/api/v1/tweet';

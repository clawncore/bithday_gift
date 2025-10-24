"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Validate environment variables
if (!supabaseUrl) {
    console.warn("Missing SUPABASE_URL environment variable");
    console.warn("Please set SUPABASE_URL in your .env file");
}
if (!supabaseServiceRoleKey) {
    console.warn("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
    console.warn("Please set SUPABASE_SERVICE_ROLE_KEY in your .env file");
}
// Create Supabase client with service role key for server-side operations
// If environment variables are missing, create a client that will show errors when used
exports.supabase = supabaseUrl && supabaseServiceRoleKey
    ? (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey)
    : (0, supabase_js_1.createClient)("http://missing-url.supabase.co", "missing-key");

import type { SupabaseClient } from "@supabase/supabase-js";
import type { CredentialResponse } from "google-one-tap";

declare global {
    interface Window {
        handleLoginWithGoogle: (response: CredentialResponse) => Promise<void>;
        supabase: SupabaseClient;
    }
}
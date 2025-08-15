import { createClient } from "@supabase/supabase-js";
import { showNotification } from "./notification";
import type { CredentialResponse } from "google-one-tap";
import type { UserProfile } from "./types";
import { customPrompt } from "./customPrompt";

export const supabaseUrl = "https://onplezeeluinclfalmyo.supabase.co";
export const supabaseKey = "sb_publishable_RSIsE-cpvT-PtZzF8f-b9w_8-4QRNhM";

window.supabase = createClient(
    supabaseUrl,
    supabaseKey
);

export const supabase = window.supabase;
export let uprofile: UserProfile | null = null;
window.handleLoginWithGoogle = async (response: CredentialResponse) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential
    });

    if (error) {
        console.error('Login failed:', error);
        showNotification('Login failed. Please try again.', 'error');
    } else {
        showNotification('Login successful!', 'success');
        handleLoginSuccess(data.user);
    }
};


window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!error && user) {
        handleLoginSuccess(user);
    }
});

async function handleLoginSuccess(user: any) {
    document.getElementById('logged-in')!.setAttribute('data-logged-in', '1');
    uprofile = { id: user.id };
    const { data: profile, error } = await supabase
        .from('u_profiles')
        .select('display_name')
        .eq('id', user.id)
    // .single();

    if (error) {
        console.error('Error loading user profile:', error);
        showNotification('Failed to load user profile. Please try again.', 'error');
    } else if (profile[0]) {
        uprofile = {
            id: user.id,
            display_name: profile[0].display_name
        };
        showNotification(`Welcome back, ${uprofile.display_name}!`, 'success');

    } else {
        const displayName = await customPrompt('Please configure your display name:', 'Your Name');
        if (!displayName) {
            showNotification('Please configure your display name.', 'error');
            return;
        }
        uprofile = {
            id: user.id,
            display_name: displayName || 'Anonymous'
        };
        const { error: insertError } = await supabase
            .from('u_profiles')
            .insert([{ id: user.id, display_name: displayName }]);
        if (insertError) {
            console.error('Error inserting user profile:', insertError);
            showNotification('Failed to save user profile. Please try again.', 'error');
        } else {
            showNotification('User profile saved successfully!', 'success');
        }
    }
}
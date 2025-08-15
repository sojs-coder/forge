export function customPrompt(message: string, defaultValue: string): Promise<string | null> {
    return new Promise((resolve) => {
        const promptBox = document.getElementById('custom-prompt')!;
        const messageElement = document.getElementById('custom-prompt-message')!;
        const inputElement = document.getElementById('custom-prompt-input')! as HTMLInputElement;
        const okButton = document.getElementById('custom-prompt-ok')!;
        const cancelButton = document.getElementById('custom-prompt-cancel')!;

        messageElement.textContent = message;
        inputElement.value = defaultValue;
        promptBox.style.display = 'flex';

        const closePrompt = (value: string | null) => {
            promptBox.style.display = 'none';
            inputElement.removeEventListener('keydown', onKeyDown);
            okButton.onclick = null;
            cancelButton.onclick = null;
            resolve(value);
        };

        okButton.onclick = () => closePrompt(inputElement.value);
        cancelButton.onclick = () => closePrompt(null);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                closePrompt(inputElement.value);
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                closePrompt(null);
            }
        };

        inputElement.addEventListener('keydown', onKeyDown);
        inputElement.focus();
        inputElement.select();
    });
}
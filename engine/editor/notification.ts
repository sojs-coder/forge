const container = document.querySelector('.notification-container');

export function showNotification(message: string, type: "info" | "error" | "success") {
    // Implementation for showing a notification
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerText = message;
    if (!container) {
        alert(message);
        return;
    }
    container.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500); // Wait for fade-out animation to finish
    }, 3000);
}

export function prompt(message: string, fields: string[]): Promise<string[]> {
    const div = document.createElement('div');
    div.className = 'prompt-container';
    div.innerHTML = `<div class="prompt-message">${message}</div>`;
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = field;
        input.className = 'prompt-input';
        div.appendChild(input);
    });
    const button = document.createElement('button');
    button.innerText = 'Submit';
    button.className = 'prompt-button';
    div.appendChild(button);

    document.body.appendChild(div);

    return new Promise((resolve) => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        };
        const handleSubmit = () => {
            const values = Array.from(div.querySelectorAll('.prompt-input') as NodeListOf<HTMLInputElement>).map((input: HTMLInputElement) => input.value);
            button.removeEventListener('click', handleSubmit);
            document.removeEventListener('keydown', handleKeyDown);
            div.remove();
            resolve(values);
        }
        button.addEventListener('click', handleSubmit);
        document.addEventListener('keydown', handleKeyDown);
    });
}

export function pleaseLogin() {
    showNotification('Please log in to continue.', 'info');
    const loginHTML = `<div class="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="filled_black"
     data-text="continue_with"
     data-size="large"
     data-logo_alignment="left">
</div>`
    const loginContainer = document.createElement('div');
    loginContainer.className = 'login-container';
    const explanation = document.createElement('div');
    explanation.className = 'login-explanation';
    const h3 = document.createElement('h3');
    h3.innerText = 'Log In or Sign Up';
    explanation.appendChild(h3);
    loginContainer.appendChild(explanation);
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'login-button-container';
    buttonContainer.innerHTML = loginHTML;
    loginContainer.appendChild(buttonContainer);

    document.body.appendChild(loginContainer);

    const mutationObserver = new MutationObserver((_, __) => {
        const loggedInElement = document.getElementById('logged-in');
        if (loggedInElement && loggedInElement.getAttribute('data-logged-in') === '1') {
            loginContainer.remove();
            mutationObserver.disconnect();
        }
    });
    mutationObserver.observe(document.getElementById('logged-in')!, {
        attributes: true,
        attributeFilter: ['data-logged-in']
    });


}
function showToast(message, type = 'error') {
    const toast = document.createElement('div');
    toast.style.cssText = `
    padding: 15px 25px;
    background: ${type === 'error' ? '#ff4444' : '#4CAF50'};
    color: white;
    border-radius: 4px;
    margin-top: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  `;
    toast.textContent = message;

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add this to your CSS or style tag
document.head.insertAdjacentHTML('beforeend', `
<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }
</style>
`);

// Initialize spinner and interceptors
const spinner = document.getElementById('loading-spinner');
let requestCount = 0;

function manageSpinner() {
    spinner.style.display = requestCount > 0 ? 'flex' : 'none';
}

// Request interceptor
axios.interceptors.request.use(config => {
    requestCount++;
    manageSpinner();
    return config;
});

// Response interceptors
axios.interceptors.response.use(
    response => {
        requestCount--;
        manageSpinner();

        // Optional: Show success toast for specific requests
        if (response.config.method === 'post' || response.config.method === 'put') {
            showToast('عملیات با موفقیت انجام شد!', 'success');
        }

        return response;
    },
    error => {
        requestCount--;
        manageSpinner();

        let errorMessage = 'خطای شبکه';

        if (error.response) {
            // Server responded with a status code outside 2xx
            switch (error.response.status) {
                case 400:
                    errorMessage = 'درخواست نامعتبر';
                    break;
                case 401:
                    errorMessage = 'دسترسی غیرمجاز';
                    break;
                case 403:
                    errorMessage = 'خطای عدم دسترسی';
                    break;
                case 404:
                    errorMessage = 'منبع پیدا نشد';
                    break;
                case 500:
                    errorMessage = 'خطای سرور';
                    break;
                default:
                    errorMessage = `Error: ${error.response.status}`;
            }
        }

        showToast(errorMessage);
        return Promise.reject(error);
    }
);
import Swal from 'sweetalert2';

// Custom theme for SweetAlert2 to match our app design
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
        popup: 'swal-rtl',
    },
});

// Success toast notification
export function showSuccess(message: string) {
    Toast.fire({
        icon: 'success',
        title: message,
    });
}

// Error toast notification
export function showError(message: string) {
    Toast.fire({
        icon: 'error',
        title: message,
    });
}

// Info toast notification
export function showInfo(message: string) {
    Toast.fire({
        icon: 'info',
        title: message,
    });
}

// Warning toast notification
export function showWarning(message: string) {
    Toast.fire({
        icon: 'warning',
        title: message,
    });
}

// Confirmation dialog
export async function showConfirm(
    title: string,
    text: string,
    confirmText: string = 'نعم',
    cancelText: string = 'إلغاء',
    isDanger: boolean = false
): Promise<boolean> {
    const result = await Swal.fire({
        title,
        text,
        icon: isDanger ? 'warning' : 'question',
        showCancelButton: true,
        confirmButtonColor: isDanger ? '#ef4444' : 'hsl(250, 85%, 60%)',
        cancelButtonColor: '#64748b',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true,
        customClass: {
            popup: 'swal-rtl',
        },
    });

    return result.isConfirmed;
}

// Loading dialog
export function showLoading(title: string = 'جارٍ التحميل...') {
    Swal.fire({
        title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        },
        customClass: {
            popup: 'swal-rtl',
        },
    });
}

// Close any open dialog
export function closeAlert() {
    Swal.close();
}

// Input dialog
export async function showInput(
    title: string,
    placeholder: string = '',
    inputValue: string = ''
): Promise<string | null> {
    const result = await Swal.fire({
        title,
        input: 'text',
        inputPlaceholder: placeholder,
        inputValue,
        showCancelButton: true,
        confirmButtonColor: 'hsl(250, 85%, 60%)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'تأكيد',
        cancelButtonText: 'إلغاء',
        customClass: {
            popup: 'swal-rtl',
            input: 'swal-input-rtl',
        },
    });

    return result.isConfirmed ? result.value : null;
}

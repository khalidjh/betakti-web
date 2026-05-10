interface ToastItem {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'error';
  timeout: number;
}

class ToastStore {
  items = $state<ToastItem[]>([]);

  push(message: string, variant: ToastItem['variant'] = 'info', timeout = 3000): void {
    const id = crypto.randomUUID();
    this.items.push({ id, message, variant, timeout });
    setTimeout(() => this.remove(id), timeout);
  }

  remove(id: string): void {
    const i = this.items.findIndex((t) => t.id === id);
    if (i >= 0) this.items.splice(i, 1);
  }
}

export const toasts = new ToastStore();

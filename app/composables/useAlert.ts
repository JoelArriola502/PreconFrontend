
export const useAlert = () => {
  const toast = useToast();

  const alertSuccess = (message: string, summary?: string) => {
    toast.add({
      severity: 'success',
      summary: summary || 'Éxito',
      detail: message,
      life: 3000
    });
  };

  const alertError = (message: string, summary?: string) => {
    toast.add({
      severity: 'error',
      summary: summary || 'Error',
      detail: message,
      life: 3000
    });
  };

  const alertWarning = (message: string, summary?: string) => {
    toast.add({
      severity: 'warn',
      summary: summary || 'Advertencia',
      detail: message,
      life: 3000
    });
  };

  const alertInfo = (message: string, summary?: string) => {
    toast.add({
      severity: 'info',
      summary: summary || 'Información',
      detail: message,
      life: 3000
    });
  };

  return {
    alertSuccess,
    alertError,
    alertWarning,
    alertInfo
  };
};
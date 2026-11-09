export function showToast(type = 'info', message = '', duration = 4000) {
  if (typeof document === 'undefined') return;
  let container = document.getElementById('app-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'app-toast-container';
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '0.5rem';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.minWidth = '200px';
  toast.style.maxWidth = '320px';
  toast.style.padding = '0.7rem 0.9rem';
  toast.style.borderRadius = '0.5rem';
  toast.style.boxShadow = '0 6px 18px rgba(15,23,42,0.15)';
  toast.style.color = '#fff';
  toast.style.fontSize = '0.9rem';
  toast.style.opacity = '0';
  toast.style.transition = 'transform 200ms ease, opacity 200ms ease';
  toast.style.transform = 'translateY(-6px)';

  if (type === 'success') {
    toast.style.background = 'linear-gradient(90deg,#16A34A,#059669)';
  } else if (type === 'error') {
    toast.style.background = 'linear-gradient(90deg,#DC2626,#B91C1C)';
  } else {
    toast.style.background = 'linear-gradient(90deg,#2563EB,#1D4ED8)';
  }

  container.appendChild(toast);

  // entrance
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  const timeoutId = setTimeout(() => {
    // exit
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
      // remove container if empty
      if (container && container.childElementCount === 0 && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 200);
  }, duration);

  // allow manual close on click
  toast.addEventListener('click', () => {
    clearTimeout(timeoutId);
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 200);
  });
}

import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ToastAlert({ toast }) {
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 150,
      background: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6',
      color: '#ffffff',
      padding: '0.8rem 1.4rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      fontWeight: '700',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      animation: 'floatAnim 0.3s ease'
    }}>
      {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {toast.message}
    </div>
  );
}

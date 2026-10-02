import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StorageInfo {
  used: number;
  diagrams: number;
  otherData: number;
}

export const StorageManager: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation('app');
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    used: 0,
    diagrams: 0,
    otherData: 0
  });

  useEffect(() => {
    calculateStorage();
  }, []);

  const calculateStorage = () => {
    let totalSize = 0;
    let diagramsSize = 0;
    let otherSize = 0;

    for (const key in localStorage) {
      const value = localStorage.getItem(key);
      if (value) {
        const size = new Blob([value]).size;
        totalSize += size;
        
        if (key.startsWith('fossflow-')) {
          diagramsSize += size;
        } else {
          otherSize += size;
        }
      }
    }

    setStorageInfo({
      used: totalSize,
      diagrams: diagramsSize,
      otherData: otherSize
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearOldDiagrams = () => {
    if (window.confirm(t('storageManager.confirmClear'))) {
      const keysToRemove = [];
      for (const key in localStorage) {
        if (key.startsWith('fossflow-')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      calculateStorage();
      alert(t('storageManager.cleared'));
      window.location.reload();
    }
  };

  const exportAllDiagrams = () => {
    const diagrams = localStorage.getItem('fossflow-diagrams');
    if (diagrams) {
      const blob = new Blob([diagrams], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fossflow-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const storagePercentage = (storageInfo.used / (5 * 1024 * 1024)) * 100; // Assume 5MB limit

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h2 style={{ marginTop: 0 }}>{t('storageManager.title')}</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>{t('storageManager.usage')}</h3>
          <div style={{
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            height: '20px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{
              backgroundColor: storagePercentage > 80 ? '#f44336' : storagePercentage > 60 ? '#ff9800' : '#4caf50',
              height: '100%',
              width: `${Math.min(storagePercentage, 100)}%`,
              transition: 'width 0.3s'
            }} />
          </div>
          <p>
            {t('storageManager.used', {
              used: formatBytes(storageInfo.used),
              percent: storagePercentage.toFixed(1)
            })}
          </p>
          <ul style={{ fontSize: '14px' }}>
            <li>{t('storageManager.diagrams', { size: formatBytes(storageInfo.diagrams) })}</li>
            <li>{t('storageManager.otherData', { size: formatBytes(storageInfo.otherData) })}</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>{t('storageManager.actions')}</h3>
          <button 
            onClick={exportAllDiagrams}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('storageManager.exportAll')}
          </button>
          <button 
            onClick={clearOldDiagrams}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('storageManager.clearAll')}
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <strong>{t('storageManager.tipsTitle')}</strong>
          <ul style={{ marginBottom: 0 }}>
            <li>{t('storageManager.tipExport')}</li>
            <li>{t('storageManager.tipDelete')}</li>
            <li>{t('storageManager.tipCache')}</li>
          </ul>
        </div>

        <button 
          onClick={onClose}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {t('storageManager.close')}
        </button>
      </div>
    </div>
  );
};
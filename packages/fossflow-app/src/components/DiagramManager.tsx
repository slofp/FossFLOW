import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { storageManager, DiagramInfo } from '../services/storageService';
import './DiagramManager.css';

interface Props {
  onLoadDiagram: (id: string, data: any) => void;
  currentDiagramId?: string;
  currentDiagramData?: any;
  onClose: () => void;
}

export const DiagramManager: React.FC<Props> = ({
  onLoadDiagram,
  currentDiagramId,
  currentDiagramData,
  onClose
}) => {
  const [diagrams, setDiagrams] = useState<DiagramInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isServerStorage, setIsServerStorage] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { t } = useTranslation('app');

  useEffect(() => {
    loadDiagrams();
  }, []);

  const loadDiagrams = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('DiagramManager: Initializing storage...');
      // Initialize storage if not already done
      await storageManager.initialize();
      const isServer = storageManager.isServerStorage();
      setIsServerStorage(isServer);
      console.log(
        `DiagramManager: Using ${isServer ? 'server' : 'session'} storage`
      );

      // Load diagram list
      const storage = storageManager.getStorage();
      console.log('DiagramManager: Loading diagram list...');
      const list = await storage.listDiagrams();
      console.log(`DiagramManager: Loaded ${list.length} diagrams`);
      setDiagrams(list);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : t('diagramManager.listFailed');
      console.error('DiagramManager error:', err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`DiagramManager: Loading diagram ${id}...`);

      const storage = storageManager.getStorage();
      const data = await storage.loadDiagram(id);

      console.log(`DiagramManager: Successfully loaded diagram ${id}`);
      onLoadDiagram(id, data);

      // Small delay to ensure parent component finishes state updates
      await new Promise((resolve) => {
        return setTimeout(resolve, 100);
      });

      onClose();
    } catch (err) {
      console.error(`DiagramManager: Failed to load diagram ${id}:`, err);
      setError(err instanceof Error ? err.message : t('diagramManager.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('alert.confirmDelete'))) {
      return;
    }

    try {
      const storage = storageManager.getStorage();
      await storage.deleteDiagram(id);
      await loadDiagrams(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : t('diagramManager.deleteFailed'));
    }
  };

  const handleCopyShareLink = (id: string) => {
    const shareUrl = `${window.location.origin}/display/${id}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert(t('diagramManager.shareCopied', { url: shareUrl }));
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');

        // Safely remove the temporary element
        try {
          if (textArea.parentNode === document.body) {
            document.body.removeChild(textArea);
          }
        } catch (err) {
          console.warn('Failed to remove temporary textarea:', err);
        }

        alert(t('diagramManager.shareCopied', { url: shareUrl }));
      });
  };

  const handleSave = async () => {
    if (!saveName.trim()) {
      setError(t('alert.enterDiagramName'));
      return;
    }

    try {
      const storage = storageManager.getStorage();

      // Check if a diagram with this name already exists (excluding current diagram)
      const existingDiagram = diagrams.find((d) => {
        return d.name === saveName.trim() && d.id !== currentDiagramId;
      });

      if (existingDiagram) {
        const confirmOverwrite = window.confirm(
          t('diagramManager.confirmOverwrite', { name: saveName })
        );
        if (!confirmOverwrite) {
          return;
        }

        // Delete the existing diagram first
        await storage.deleteDiagram(existingDiagram.id);
      }

      /**
       * Icon Persistence: Save ALL icons (default + imported)
       *
       * currentDiagramData comes from parent's currentModel/diagramData which includes:
       * - All default icon collections (isoflow, aws, gcp, azure, kubernetes)
       * - All imported custom icons (collection='imported')
       *
       * This ensures when loading, we have the complete icon set and don't lose
       * any custom imported icons.
       */
      const dataToSave = {
        ...currentDiagramData,
        name: saveName
      };

      console.log(
        `DiagramManager: Saving diagram with ${dataToSave.icons?.length || 0} icons`
      );
      const importedCount = (dataToSave.icons || []).filter((icon: any) => {
        return icon.collection === 'imported';
      }).length;
      console.log(`DiagramManager: Including ${importedCount} imported icons`);

      if (currentDiagramId) {
        // Update existing
        await storage.saveDiagram(currentDiagramId, dataToSave);
      } else {
        // Create new
        await storage.createDiagram(dataToSave);
      }

      setShowSaveDialog(false);
      setSaveName('');
      await loadDiagrams(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : t('diagramManager.saveFailed'));
    }
  };

  return (
    <div className="diagram-manager-overlay">
      <div className="diagram-manager">
        <div className="diagram-manager-header">
          <h2>{t('diagramManager.title')}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="storage-info">
          <span
            className={`storage-badge ${isServerStorage ? 'server' : 'local'}`}
          >
            {isServerStorage
              ? `🌐 ${t('diagramManager.serverStorage')}`
              : `💾 ${t('diagramManager.localStorage')}`}
          </span>
          {isServerStorage && (
            <span className="storage-note">
              {t('diagramManager.serverStorageNote')}
            </span>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="diagram-manager-actions">
          <button
            className="action-button primary"
            onClick={() => {
              setSaveName(currentDiagramData?.name || t('status.untitled'));
              setShowSaveDialog(true);
            }}
          >
            💾 {t('diagramManager.saveCurrent')}
          </button>
        </div>

        {loading ? (
          <div className="loading">{t('diagramManager.loadingList')}</div>
        ) : (
          <div className="diagram-list">
            {diagrams.length === 0 ? (
              <div className="empty-state">
                <p>{t('diagramManager.empty')}</p>
                <p className="hint">{t('diagramManager.emptyHint')}</p>
              </div>
            ) : (
              diagrams.map((diagram) => {
                return (
                  <div key={diagram.id} className="diagram-item">
                    <div className="diagram-info">
                      <h3>{diagram.name}</h3>
                      <span className="diagram-meta">
                        {t('diagramManager.lastModified', {
                          date: diagram.lastModified.toLocaleString()
                        })}
                        {diagram.size &&
                          ` • ${(diagram.size / 1024).toFixed(1)} KB`}
                      </span>
                    </div>
                    <div className="diagram-actions">
                      <button
                        className="action-button"
                        onClick={() => {
                          return handleLoad(diagram.id);
                        }}
                        disabled={loading}
                      >
                        {loading ? t('diagramManager.loading') : t('diagramManager.load')}
                      </button>
                      <button
                        className="action-button share"
                        onClick={() => {
                          return handleCopyShareLink(diagram.id);
                        }}
                        title={t('diagramManager.shareTooltip')}
                      >
                        {t('diagramManager.share')}
                      </button>
                      <button
                        className="action-button danger"
                        onClick={() => {
                          return handleDelete(diagram.id);
                        }}
                        disabled={loading}
                      >
                        {t('diagramManager.delete')}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="save-dialog">
            <h3>{t('diagramManager.saveTitle')}</h3>
            <input
              type="text"
              placeholder={t('diagramManager.namePlaceholder')}
              value={saveName}
              onChange={(e) => {
                return setSaveName(e.target.value);
              }}
              onKeyDown={(e) => {
                return e.key === 'Enter' && handleSave();
              }}
              autoFocus
            />
            <div className="dialog-buttons">
              <button onClick={handleSave}>{t('diagramManager.save')}</button>
              <button
                onClick={() => {
                  return setShowSaveDialog(false);
                }}
              >
                {t('diagramManager.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

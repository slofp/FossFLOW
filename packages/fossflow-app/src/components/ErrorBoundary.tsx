import { useTranslation } from 'react-i18next';
import './ErrorBoundary.css';

interface ErrorBoundaryFallbackUIProps {
  error: Error;
}

export default function ErrorBoundaryFallbackUI({
  error
}: ErrorBoundaryFallbackUIProps) {
  const { t } = useTranslation('app');

  const onRefreshButtonPressed = () => {
    window.location.reload();
  };

  const onReportButtonPressed = () => {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    const githubUrl = new URL(
      'https://github.com/Abrar74774/FossFLOW/issues/new'
    );
    githubUrl.searchParams.set('title', `Error: ${error.message}`);
    githubUrl.searchParams.set(
      'body',
      `## Error Details\n\n\`\`\`\n${JSON.stringify(errorDetails, null, 2)}\n\`\`\`\n\n## Steps to Reproduce\n1. \n2. \n3. \n\n## Expected Behavior\n\n## Actual Behavior\n\n## Environment\n- Browser: ${navigator.userAgent}\n- URL: ${window.location.href}\n- Timestamp: ${new Date().toISOString()}`
    );

    window.open(githubUrl.toString(), '_blank');
  };

  return (
    <div className="error-page-container">
      <div className="error-container">
        <div className="error-header">
          <p>⚠️ {t('errorPage.title')}</p>
        </div>
        <div className="error-content">
          <p>
            <strong>{t('errorPage.errorLabel')}</strong> {error.message}
          </p>
          {error.stack && (
            <details style={{ marginTop: '10px' }}>
              <summary
                style={{ cursor: 'pointer', fontSize: '12px', color: '#666' }}
              >
                {t('errorPage.showDetails')}
              </summary>
              <pre
                style={{
                  fontSize: '11px',
                  color: '#666',
                  margin: '10px 0 0 0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  maxHeight: '200px',
                  overflow: 'auto'
                }}
              >
                {error.stack}
              </pre>
            </details>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: '4px',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#0c5460'
          }}
        >
          <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>
            📋 {t('errorPage.beforeReporting')}
          </p>
          <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
            <li>
              {t('errorPage.checkReported')}{' '}
              <a
                href="https://github.com/Abrar74774/FossFLOW/issues"
                target="_"
              >
                {t('errorPage.here')}👀
              </a>
            </li>
            <li>{t('errorPage.tryRefresh')}</li>
            <li>{t('errorPage.onlyNew')}</li>
          </ul>
          <p style={{ margin: 0, fontSize: '13px' }}>
            <strong>{t('errorPage.noteLabel')}</strong>{' '}
            {t('errorPage.noteMessage')}
          </p>
        </div>

        <div className="error-footer">
          <button className="error-button" onClick={onReportButtonPressed}>
            📋 {t('errorPage.report')}
          </button>
          <button
            className="error-button refresh-button"
            onClick={onRefreshButtonPressed}
          >
            🔄 {t('errorPage.refresh')}
          </button>
        </div>
      </div>
    </div>
  );
}

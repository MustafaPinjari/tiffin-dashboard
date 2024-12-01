import { Application } from '@nativescript/core';
import { QRScanner } from 'nativescript-qr-scanner';
import { WebView } from '@nativescript/core';

export function App() {
  const onScanResult = (result: string) => {
    if (result.startsWith('https://')) {
      const webView = new WebView();
      webView.src = result;
      Application.getRootView().content = webView;
    }
  };

  return (
    <flexboxLayout flexDirection="column" justifyContent="center" alignItems="center">
      <label text="Scan QR Code to access Tiffin Tracker" class="text-center p-10" />
      <QRScanner
        onScanResult={onScanResult}
        class="qr-scanner"
      />
    </flexboxLayout>
  );
}
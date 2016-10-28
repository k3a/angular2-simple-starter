import './polyfills'
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootloader } from '@angularclass/hmr';

// depending on the env mode, enable prod mode or add debugging modules
if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (HMR) {
  bootloader(main);
} else {
  if (document.readyState === 'complete') {
    main();
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

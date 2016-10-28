import './polyfills.aot'
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

// depending on the env mode, enable prod mode or add debugging modules
if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();

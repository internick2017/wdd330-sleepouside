import { loadHeaderFooter } from '../js/utils.mjs';

// Load header and footer
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadHeaderFooter();
    // Add any product page specific JavaScript here
  } catch (error) {
    console.error('Error initializing product page:', error);
  }
});

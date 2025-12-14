/**
 * content.js (v18 - The Sharpshooter)
 *
 * This version combines every successful discovery from our entire process.
 * The v17 test proved the gentle nudge fails to summon the button.
 * We are returning to the user-confirmed method (Arrow Key) but with a more
 * precise target: the video element itself, not the container.
 *
 * This is the final, definitive script.
 */

if (!window.jumpAheadInterval) {
  console.log('Jump Ahead [v18]: The Sharpshooter is active.');

  const scriptStartTime = Date.now();
  let hasInteractedWithCurrentPromo = false;

  const attemptToSkip = () => {
    // 5-second grace period to prevent the "impulsive bump"
    if (Date.now() - scriptStartTime < 5000) {
      return;
    }

    // Always check for the button first.
    const allButtons = document.querySelectorAll('button');
    for (const button of allButtons) {
      if (button.textContent.includes('Jump ahead') && button.offsetParent !== null) {
        console.log('[v18] TARGET ACQUIRED! Clicking "Jump ahead" button.');
        button.click();
        clearInterval(window.jumpAheadInterval);
        window.jumpAheadInterval = null;
        console.log('[v18] Success. Scanner stopped.');
        return;
      }
    }

    // Patiently wait for the real promotion overlay.
    const promoOverlay = document.querySelector('.ytp-paid-content-overlay');
    if (promoOverlay && promoOverlay.offsetParent !== null) {
      if (!hasInteractedWithCurrentPromo) {
        console.log('[v18] Promotion overlay detected! Firing the sharpshooter...');
        hasInteractedWithCurrentPromo = true;

        // The most precise target: the video element itself.
        const videoElement = document.querySelector('.html5-main-video');
        
        if (videoElement) {
          // Perform the full human emulation on the precise target.
          videoElement.focus();
          videoElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, bubbles: true }));
          setTimeout(() => {
             videoElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, bubbles: true }));
             console.log('[v18] Sharpshooter shot dispatched to the video element.');
          }, 50);
        } else {
            console.log('[v18] Could not find the .html5-main-video element to target.');
        }
      }
    } else {
      hasInteractedWithCurrentPromo = false;
    }
  };

  window.jumpAheadInterval = setInterval(attemptToSkip, 100);

} else {
  console.log('Jump Ahead [v18]: Scanner is already running.');
}
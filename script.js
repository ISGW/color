const color = document.querySelector('input[type="color"]');

// Function to convert HEX to HSL
function hexToHSL(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0;
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return [Math.round(h * 360) + 'deg', Math.round(s * 100) + '%', Math.round(l * 100) + '%'];
}

const form = document.querySelector('.ui-color-palette');
color.addEventListener('input', () => {
  const [h, s, l] = hexToHSL(color.value);
  form.style.setProperty('--h', h);
  form.style.setProperty('--s', s);
  form.style.setProperty('--l', l);
});

// Function to copy the HEX value to the clipboard
function copyHexToClipboard() {
  navigator.clipboard.writeText(color.value).then(() => {
    alert('HEX value copied: ' + color.value); // Alert the user that the HEX has been copied
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Adding a button to copy the HEX value
const copyButton = document.createElement('button');
copyButton.textContent = 'Copy HEX';
form.appendChild(copyButton);

// Event listener for the copy button
copyButton.addEventListener('click', copyHexToClipboard);

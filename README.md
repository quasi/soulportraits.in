# Soul Portraits - Photography Portfolio

A simple static HTML website showcasing the photography portfolio of Abhijit Rao.

## Features

- **Random Image Ordering**: Images are displayed in random order on each page load
- **Masonry Layout**: Uses Masonry.js for responsive grid layout
- **Lightbox Gallery**: Click any image to view it in a full-screen lightbox
- **Image Descriptions**: Displays camera/equipment information when available
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use arrow keys to navigate in lightbox, ESC to close

## File Structure

```
soulportraits.in/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
├── images.js           # Image data (filename and descriptions)
├── images/             # Image assets folder
│   ├── portrait_1.jpeg
│   ├── portrait_2.jpeg
│   └── ... (60 total images)
└── README.md           # This file
```

## How to Run

1. **Local Development Server**:
   ```bash
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser

2. **Direct File Opening**:
   Simply open `index.html` in a web browser

## Technical Details

- **Masonry.js**: Used for responsive grid layout
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **Responsive CSS**: Mobile-first design approach
- **Lazy Loading**: Images load as needed for better performance

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Customization

To add or modify images:
1. Add image files to the `images/` folder
2. Update the `imageList` array in `images.js` with filename and description
3. Refresh the page to see changes

## Design Inspiration

The design is based on the provided mockups (`pots-index.png` and `pots-iv.png`) with a clean, minimalist approach that puts focus on the photography.
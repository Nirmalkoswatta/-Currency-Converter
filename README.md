# Currency Converter Pro 💱

A modern, feature-rich currency converter application with real-time exchange rates, dark mode, multi-language support, and advanced features.

![Currency Converter Pro](https://img.shields.io/badge/Currency-Converter-blue?style=for-the-badge&logo=money&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Features

### ✅ Basic Features (MVP)
- **Input Amount**: Clean, responsive amount input field
- **Currency Selection**: Dropdown menus with flag emojis for easy identification
- **Convert Button**: One-click conversion with loading animation
- **Real-time Results**: Live display of converted amounts
- **Exchange Rate API**: Integration with Frankfurter API for real-time rates

### 🌟 Advanced Features

#### 💾 Save Preferred Currencies
- **Local Storage**: Automatically saves last used currency pairs
- **Quick Access**: Favorite currency pairs for instant loading
- **Persistent Settings**: Preferences saved across browser sessions

#### 🏳️ Currency Flags
- **Visual Enhancement**: Flag emojis for each currency
- **Easy Recognition**: Quick visual identification of currencies
- **Professional Look**: Clean, modern interface design

#### 🔄 Swap Button
- **One-Click Swap**: Instantly swap 'From' and 'To' currencies
- **Smooth Animation**: 180-degree rotation with scaling effect
- **Auto-Convert**: Automatically converts after swapping

#### 📅 Historical Data
- **Date Picker**: Select any historical date for exchange rates
- **Comparison Tool**: Compare historical vs current rates
- **Chart Visualization**: 7-day trend chart using Chart.js
- **Interactive Charts**: Hover effects and responsive design

#### 🌙 Dark Mode
- **Theme Toggle**: Switch between light and dark themes
- **Auto-Save**: Theme preference saved in localStorage
- **Smooth Transition**: CSS animations for theme changes
- **System Integration**: Respects user's system preferences

#### 🌐 Multi-language Support
- **English & Sinhala**: Full translation support
- **Easy Extension**: Simple JSON-based translation system
- **Dynamic Updates**: Live language switching without reload

## 🎨 Design Features

### Modern UI/UX
- **Clean Layout**: Two-column responsive design
- **Soft Shadows**: Elegant depth with CSS shadows
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: CSS transitions and transforms
- **Loading States**: Visual feedback during API calls

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Flexible Grid**: CSS Grid and Flexbox layout
- **Touch-Friendly**: Large buttons and touch targets
- **Adaptive Interface**: UI adjusts to different screen orientations

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for real-time exchange rates)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   # OR download and extract the ZIP file
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your web browser
   # Or use a local server for best experience
   ```

3. **Optional: Local Server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

### API Configuration (Optional)

For enhanced rate limits, you can get a free API key:

1. Visit [ExchangeRate-API](https://app.exchangerate-api.com/sign-up)
2. Sign up for a free account
3. Copy your API key
4. Replace `'YOUR_API_KEY'` in `script.js` line 5

```javascript
this.apiKey = 'your-actual-api-key-here';
```

## 📁 Project Structure

```
Currency Converter/
│
├── index.html          # Main HTML structure
├── style.css           # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🔧 Technical Details

### APIs Used
- **Primary**: [Frankfurter API](https://www.frankfurter.app/) - Free, reliable, no API key required
- **Fallback**: Mock exchange rates for offline demo
- **Historical**: Same API for historical exchange rate data

### Technologies
- **HTML5**: Semantic markup and modern structure
- **CSS3**: Variables, Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ features, async/await
- **Chart.js**: Interactive charts and visualizations
- **Font Awesome**: Icons and visual elements

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 💡 Usage Guide

### Basic Conversion
1. Enter amount in the "From" field
2. Select source currency from dropdown
3. Select target currency from dropdown
4. Click "Convert" or wait for auto-conversion

### Advanced Features
- **Swap Currencies**: Click the swap button (⇄) between currency fields
- **Save Favorites**: Click "Save Current Pair" to add to favorites
- **Load Favorites**: Click any favorite pair to load it
- **Historical Rates**: Select a date and click "Get Historical Rate"
- **Theme Toggle**: Click the moon/sun icon in the header
- **Language**: Use the language dropdown to switch languages

### Keyboard Shortcuts
- **Enter**: Convert when amount field is focused
- **Auto-Convert**: Automatic conversion on input change

## 🎯 Features in Detail

### 🔄 Auto-Conversion
The app automatically converts currencies as you type, providing instant feedback without clicking the convert button.

### 💾 Persistent Storage
- **Favorites**: Saved currency pairs
- **Theme**: Light/dark mode preference
- **Language**: Selected language preference
- **Last Used**: Most recent currency pair

### 📊 Data Visualization
- **Real-time Chart**: 7-day exchange rate trend
- **Interactive**: Hover for detailed information
- **Responsive**: Adapts to different screen sizes
- **Theme-Aware**: Colors change with dark/light mode

### 🌍 Supported Currencies
- **USD** 🇺🇸 US Dollar
- **EUR** 🇪🇺 Euro
- **GBP** 🇬🇧 British Pound
- **JPY** 🇯🇵 Japanese Yen
- **LKR** 🇱🇰 Sri Lankan Rupee
- **INR** 🇮🇳 Indian Rupee
- **CAD** 🇨🇦 Canadian Dollar
- **AUD** 🇦🇺 Australian Dollar
- **CHF** 🇨🇭 Swiss Franc
- **CNY** 🇨🇳 Chinese Yuan

## 🔧 Customization

### Adding New Currencies
1. Update the select options in `index.html`
2. Add flag emoji to `getCurrencyFlag()` function in `script.js`
3. Update fallback rates in `getFallbackRate()` function

### Adding New Languages
1. Add translation object to `translations` in `script.js`
2. Add option to language select in `index.html`
3. Add `data-translate` attributes to new elements

### Styling Customization
- CSS variables in `:root` for easy color customization
- Modular CSS structure for easy modifications
- Dark mode variables for theme consistency

## 🐛 Troubleshooting

### Common Issues

**Conversion not working:**
- Check internet connection
- Verify API is accessible
- Check browser console for errors

**Chart not displaying:**
- Ensure Chart.js is loading from CDN
- Check if canvas element exists
- Verify no JavaScript errors

**Favorites not saving:**
- Check if localStorage is enabled
- Verify browser supports localStorage
- Check for private/incognito mode restrictions

## 🚀 Performance Features

### Optimizations
- **Debounced Auto-Convert**: Prevents excessive API calls
- **Caching**: Stores recent exchange rates temporarily
- **Lazy Loading**: Charts load only when needed
- **Error Handling**: Graceful fallbacks for API failures

### Best Practices
- **Progressive Enhancement**: Works without JavaScript (basic functionality)
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **SEO Friendly**: Semantic HTML structure
- **Mobile Optimized**: Touch-friendly interface

## 📱 Mobile Experience

### Mobile-Specific Features
- **Touch Gestures**: Optimized for touch interactions
- **Responsive Layout**: Single-column layout on small screens
- **Large Buttons**: Easy tap targets
- **Swipe Gestures**: Consider adding swipe-to-swap

## 🔐 Security

### Data Privacy
- **No Personal Data**: App doesn't collect personal information
- **Local Storage Only**: Data stored locally in browser
- **HTTPS APIs**: Secure API connections
- **No Tracking**: No analytics or tracking scripts

## 📈 Future Enhancements

### Planned Features
- **More Currencies**: Expand supported currency list
- **Rate Alerts**: Notifications for target exchange rates
- **Offline Mode**: Cached rates for offline use
- **Export Data**: CSV export of conversion history
- **Calculator Mode**: Advanced calculation features

### Advanced Features
- **Cryptocurrency**: Support for crypto currencies
- **Bank Rates**: Integration with local bank rates
- **Rate Predictions**: AI-powered rate predictions
- **Social Features**: Share conversion results

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the documentation

## 🙏 Acknowledgments

- **Frankfurter API** for free exchange rate data
- **Chart.js** for beautiful chart visualizations
- **Font Awesome** for icons
- **MDN Web Docs** for web standards reference

---

**Made with ❤️ for currency conversion needs**

*Last updated: July 2025*
#   C u r r e n c y - C o n v e r t e r  
 
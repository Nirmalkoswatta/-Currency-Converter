// Currency Converter Pro - JavaScript Implementation
class CurrencyConverter {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // You can get a free API key from exchangerate-api.com
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest/';
        this.frankfurterUrl = 'https://api.frankfurter.app';
        this.currentChart = null;
        this.favorites = this.loadFavorites();
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.translations = {
            en: {
                from: 'From',
                to: 'To',
                convert: 'Convert',
                exchangeRate: 'Exchange Rate:',
                loading: 'Loading exchange rates...',
                favorites: 'Favorite Currency Pairs',
                saveFavorite: 'Save Current Pair',
                historical: 'Historical Exchange Rates',
                getHistorical: 'Get Historical Rate',
                footerText: 'Powered by real-time exchange rates from ExchangeRate-API',
                conversionSuccess: 'Conversion completed successfully!',
                conversionError: 'Error converting currencies. Please try again.',
                favoriteAdded: 'Currency pair added to favorites!',
                favoriteExists: 'This currency pair is already in favorites.',
                favoriteRemoved: 'Currency pair removed from favorites.',
                historicalError: 'Error fetching historical data.',
                invalidAmount: 'Please enter a valid amount.',
                sameCurrency: 'Please select different currencies.',
                networkError: 'Network error. Please check your connection.'
            },
            si: {
                from: 'සිට',
                to: 'දක්වා',
                convert: 'පරිවර්තනය කරන්න',
                exchangeRate: 'විනිමය අනුපාතය:',
                loading: 'විනිමය අනුපාත පූරණය වෙමින්...',
                favorites: 'ප්‍රියතම මුදල් යුගල',
                saveFavorite: 'වර්තමාන යුගලය සුරකින්න',
                historical: 'ඓතිහාසික විනිමය අනුපාත',
                getHistorical: 'ඓතිහාසික අනුපාතය ලබා ගන්න',
                footerText: 'ExchangeRate-API වෙතින් තත්‍ය කාලීන විනිමය අනුපාත',
                conversionSuccess: 'පරිවර්තනය සාර්ථකව සම්පූර්ණ විය!',
                conversionError: 'මුදල් පරිවර්තනයේ දෝෂයක්. කරුණාකර නැවත උත්සාහ කරන්න.',
                favoriteAdded: 'මුදල් යුගලය ප්‍රියතමයන්ට එකතු කරන ලදී!',
                favoriteExists: 'මෙම මුදල් යුගලය දැනටමත් ප්‍රියතමයන්හි ඇත.',
                favoriteRemoved: 'මුදල් යුගලය ප්‍රියතමයන්ගෙන් ඉවත් කරන ලදී.',
                historicalError: 'ඓතිහාසික දත්ත ලබා ගැනීමේ දෝෂයක්.',
                invalidAmount: 'කරුණාකර වලංගු ප්‍රමාණයක් ඇතුළත් කරන්න.',
                sameCurrency: 'කරුණාකර විවිධ මුදල් තෝරන්න.',
                networkError: 'ජාල දෝෂයක්. කරුණාකර ඔබගේ සම්බන්ධතාවය පරීක්ෂා කරන්න.'
            }
        };

        this.init();
    }

    init() {
        this.initializeTheme();
        this.initializeLanguage();
        this.bindEvents();
        this.renderFavorites();
        this.loadPreferredCurrencies();
        this.setDefaultDate();
        this.performInitialConversion();
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    initializeLanguage() {
        document.getElementById('languageSelect').value = this.currentLanguage;
        this.updateLanguage();
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Language change
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            localStorage.setItem('language', this.currentLanguage);
            this.updateLanguage();
        });

        // Convert button
        document.getElementById('convertButton').addEventListener('click', () => this.convertCurrency());

        // Swap button
        document.getElementById('swapButton').addEventListener('click', () => this.swapCurrencies());

        // Auto-convert on input change
        document.getElementById('fromAmount').addEventListener('input', () => this.autoConvert());
        document.getElementById('fromCurrency').addEventListener('change', () => this.autoConvert());
        document.getElementById('toCurrency').addEventListener('change', () => this.autoConvert());

        // Save favorite
        document.getElementById('saveFavoriteButton').addEventListener('click', () => this.saveFavorite());

        // Historical data
        document.getElementById('getHistoricalButton').addEventListener('click', () => this.getHistoricalRate());

        // Enter key on amount input
        document.getElementById('fromAmount').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertCurrency();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.initializeTheme();
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLanguage][key]) {
                element.textContent = this.translations[this.currentLanguage][key];
            }
        });
    }

    async convertCurrency() {
        const amount = parseFloat(document.getElementById('fromAmount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        // Validation
        if (!amount || amount <= 0) {
            this.showMessage(this.translations[this.currentLanguage].invalidAmount, 'error');
            return;
        }

        if (fromCurrency === toCurrency) {
            this.showMessage(this.translations[this.currentLanguage].sameCurrency, 'warning');
            return;
        }

        this.showLoading(true);

        try {
            const rate = await this.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = (amount * rate).toFixed(2);
            
            this.displayResult(convertedAmount, rate, fromCurrency, toCurrency);
            this.savePreferredCurrencies(fromCurrency, toCurrency);
            this.showMessage(this.translations[this.currentLanguage].conversionSuccess, 'success');
            this.loadChart(fromCurrency, toCurrency);
            
        } catch (error) {
            console.error('Conversion error:', error);
            this.showMessage(this.translations[this.currentLanguage].conversionError, 'error');
        }

        this.showLoading(false);
    }

    async autoConvert() {
        const amount = parseFloat(document.getElementById('fromAmount').value);
        if (!amount || amount <= 0) return;

        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        if (fromCurrency === toCurrency) return;

        try {
            const rate = await this.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = (amount * rate).toFixed(2);
            this.displayResult(convertedAmount, rate, fromCurrency, toCurrency, false);
        } catch (error) {
            console.error('Auto-conversion error:', error);
        }
    }

    async getExchangeRate(from, to) {
        try {
            // Using Frankfurter API as primary (free and reliable)
            const response = await fetch(`${this.frankfurterUrl}/latest?from=${from}&to=${to}`);
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            // Fallback: Mock exchange rates for demo purposes
            console.warn('Using fallback exchange rates');
            return this.getFallbackRate(from, to);
        }
    }

    getFallbackRate(from, to) {
        // Mock exchange rates for demo purposes
        const rates = {
            'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110, 'LKR': 320, 'INR': 74, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45 },
            'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129, 'LKR': 377, 'INR': 87, 'CAD': 1.47, 'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.59 },
            'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 151, 'LKR': 438, 'INR': 101, 'CAD': 1.71, 'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.83 },
            'JPY': { 'USD': 0.0091, 'EUR': 0.0077, 'GBP': 0.0066, 'LKR': 2.91, 'INR': 0.67, 'CAD': 0.011, 'AUD': 0.012, 'CHF': 0.0084, 'CNY': 0.059 },
            'LKR': { 'USD': 0.0031, 'EUR': 0.0027, 'GBP': 0.0023, 'JPY': 0.34, 'INR': 0.23, 'CAD': 0.0039, 'AUD': 0.0042, 'CHF': 0.0029, 'CNY': 0.020 },
            'INR': { 'USD': 0.014, 'EUR': 0.011, 'GBP': 0.0099, 'JPY': 1.49, 'LKR': 4.32, 'CAD': 0.017, 'AUD': 0.018, 'CHF': 0.012, 'CNY': 0.087 },
            'CAD': { 'USD': 0.80, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 88, 'LKR': 256, 'INR': 59, 'AUD': 1.08, 'CHF': 0.74, 'CNY': 5.16 },
            'AUD': { 'USD': 0.74, 'EUR': 0.63, 'GBP': 0.54, 'JPY': 81, 'LKR': 237, 'INR': 55, 'CAD': 0.93, 'CHF': 0.68, 'CNY': 4.78 },
            'CHF': { 'USD': 1.09, 'EUR': 0.93, 'GBP': 0.79, 'JPY': 119, 'LKR': 348, 'INR': 80, 'CAD': 1.36, 'AUD': 1.47, 'CNY': 7.02 },
            'CNY': { 'USD': 0.15, 'EUR': 0.13, 'GBP': 0.11, 'JPY': 17, 'LKR': 49.6, 'INR': 11.5, 'CAD': 0.19, 'AUD': 0.21, 'CHF': 0.14 }
        };

        if (from === to) return 1;
        return rates[from]?.[to] || 1;
    }

    displayResult(amount, rate, from, to, animate = true) {
        const resultElement = document.getElementById('toAmount');
        const rateElement = document.getElementById('rateDisplay');
        const resultContainer = document.querySelector('.result-container');

        // Animate result
        if (animate) {
            resultContainer.classList.add('animate');
            setTimeout(() => resultContainer.classList.remove('animate'), 600);
        }

        resultElement.textContent = amount;
        rateElement.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

        // Add bounce animation
        resultElement.classList.add('bounce');
        setTimeout(() => resultElement.classList.remove('bounce'), 600);
    }

    swapCurrencies() {
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        document.getElementById('fromCurrency').value = toCurrency;
        document.getElementById('toCurrency').value = fromCurrency;

        // Trigger conversion
        this.autoConvert();
    }

    showLoading(show) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const convertButton = document.getElementById('convertButton');

        if (show) {
            loadingIndicator.classList.remove('hidden');
            convertButton.disabled = true;
            convertButton.style.opacity = '0.6';
        } else {
            loadingIndicator.classList.add('hidden');
            convertButton.disabled = false;
            convertButton.style.opacity = '1';
        }
    }

    showMessage(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--warning-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            font-size: 14px;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);

        // Add CSS animations if not already present
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Favorites functionality
    saveFavorite() {
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const pair = `${fromCurrency}-${toCurrency}`;

        if (this.favorites.includes(pair)) {
            this.showMessage(this.translations[this.currentLanguage].favoriteExists, 'warning');
            return;
        }

        this.favorites.push(pair);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.renderFavorites();
        this.showMessage(this.translations[this.currentLanguage].favoriteAdded, 'success');
    }

    loadFavorites() {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    }

    renderFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        favoritesList.innerHTML = '';

        this.favorites.forEach(pair => {
            const [from, to] = pair.split('-');
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <div class="favorite-info">
                    <span>${this.getCurrencyFlag(from)} ${from} → ${this.getCurrencyFlag(to)} ${to}</span>
                </div>
                <button class="remove-favorite" onclick="currencyConverter.removeFavorite('${pair}')">
                    <i class="fas fa-times"></i>
                </button>
            `;

            favoriteItem.addEventListener('click', (e) => {
                if (!e.target.closest('.remove-favorite')) {
                    this.loadFavoritePair(from, to);
                }
            });

            favoritesList.appendChild(favoriteItem);
        });
    }

    removeFavorite(pair) {
        this.favorites = this.favorites.filter(fav => fav !== pair);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.renderFavorites();
        this.showMessage(this.translations[this.currentLanguage].favoriteRemoved, 'success');
    }

    loadFavoritePair(from, to) {
        document.getElementById('fromCurrency').value = from;
        document.getElementById('toCurrency').value = to;
        this.autoConvert();
    }

    getCurrencyFlag(currency) {
        const flags = {
            'USD': '🇺🇸', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵', 'LKR': '🇱🇰',
            'INR': '🇮🇳', 'CAD': '🇨🇦', 'AUD': '🇦🇺', 'CHF': '🇨🇭', 'CNY': '🇨🇳'
        };
        return flags[currency] || '🏳️';
    }

    savePreferredCurrencies(from, to) {
        localStorage.setItem('preferredFrom', from);
        localStorage.setItem('preferredTo', to);
    }

    loadPreferredCurrencies() {
        const preferredFrom = localStorage.getItem('preferredFrom');
        const preferredTo = localStorage.getItem('preferredTo');

        if (preferredFrom) {
            document.getElementById('fromCurrency').value = preferredFrom;
        }
        if (preferredTo) {
            document.getElementById('toCurrency').value = preferredTo;
        }
    }

    // Historical data functionality
    setDefaultDate() {
        const dateInput = document.getElementById('historicalDate');
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateInput.value = weekAgo.toISOString().split('T')[0];
        dateInput.max = today.toISOString().split('T')[0];
    }

    async getHistoricalRate() {
        const date = document.getElementById('historicalDate').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        if (!date) {
            this.showMessage('Please select a date.', 'warning');
            return;
        }

        try {
            const response = await fetch(`${this.frankfurterUrl}/${date}?from=${fromCurrency}&to=${toCurrency}`);
            if (!response.ok) throw new Error('Historical data not available');
            
            const data = await response.json();
            const rate = data.rates[toCurrency];
            
            this.displayHistoricalResult(date, rate, fromCurrency, toCurrency);
        } catch (error) {
            console.error('Historical data error:', error);
            this.showMessage(this.translations[this.currentLanguage].historicalError, 'error');
        }
    }

    displayHistoricalResult(date, rate, from, to) {
        const resultDiv = document.getElementById('historicalResult');
        resultDiv.className = 'historical-result';
        resultDiv.innerHTML = `
            <h4>Historical Exchange Rate</h4>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Rate:</strong> 1 ${from} = ${rate.toFixed(4)} ${to}</p>
            <p><strong>Comparison:</strong> ${this.getHistoricalComparison(rate, from, to)}</p>
        `;
    }

    getHistoricalComparison(historicalRate, from, to) {
        // This is a simplified comparison - in a real app, you'd compare with current rate
        return `Historical rate for ${from} to ${to}`;
    }

    // Chart functionality
    async loadChart(from, to) {
        try {
            const chartData = await this.getChartData(from, to);
            this.renderChart(chartData, from, to);
        } catch (error) {
            console.error('Chart loading error:', error);
        }
    }

    async getChartData(from, to) {
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        try {
            const response = await fetch(
                `${this.frankfurterUrl}/${startDate.toISOString().split('T')[0]}..${endDate.toISOString().split('T')[0]}?from=${from}&to=${to}`
            );
            
            if (!response.ok) throw new Error('Chart data not available');
            
            const data = await response.json();
            return this.formatChartData(data.rates, to);
        } catch (error) {
            // Return mock data for demo
            return this.getMockChartData();
        }
    }

    formatChartData(rates, currency) {
        const labels = Object.keys(rates);
        const data = labels.map(date => rates[date][currency]);
        
        return { labels, data };
    }

    getMockChartData() {
        const labels = [];
        const data = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            labels.push(date.toLocaleDateString());
            data.push((Math.random() * 0.1 + 0.85).toFixed(4)); // Mock exchange rate
        }
        
        return { labels, data };
    }

    renderChart(chartData, from, to) {
        const ctx = document.getElementById('exchangeRateChart').getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: `${from} to ${to}`,
                    data: chartData.data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim()
                        }
                    },
                    y: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim()
                        }
                    }
                }
            }
        });
    }

    performInitialConversion() {
        // Perform initial conversion on page load
        setTimeout(() => {
            this.autoConvert();
        }, 500);
    }
}

// Initialize the currency converter when the page loads
let currencyConverter;

document.addEventListener('DOMContentLoaded', () => {
    currencyConverter = new CurrencyConverter();
});

// Export for global access (for remove favorite functionality)
window.currencyConverter = currencyConverter;

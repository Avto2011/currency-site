const API_URL =
    "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json";


// ==========================================
// DOM
// ==========================================

const fromAmount = document.getElementById("fromAmount");
const toAmount = document.getElementById("toAmount");

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const swapButton = document.getElementById("swapButton");

const conversionText =
    document.getElementById("conversionText");

const rateText =
    document.getElementById("rateText");

const status =
    document.getElementById("status");

const ratesGrid =
    document.getElementById("ratesGrid");


// ==========================================
// CURRENCY INFORMATION
// ==========================================

const currencyInfo = {

    GEL: {
        name: "Georgian Lari",
        flag: "🇬🇪"
    },

    USD: {
        name: "US Dollar",
        flag: "🇺🇸"
    },

    EUR: {
        name: "Euro",
        flag: "🇪🇺"
    },

    GBP: {
        name: "British Pound",
        flag: "🇬🇧"
    },

    TRY: {
        name: "Turkish Lira",
        flag: "🇹🇷"
    },

    RUB: {
        name: "Russian Ruble",
        flag: "🇷🇺"
    },

    AMD: {
        name: "Armenian Dram",
        flag: "🇦🇲"
    },

    AZN: {
        name: "Azerbaijani Manat",
        flag: "🇦🇿"
    },

    CNY: {
        name: "Chinese Yuan",
        flag: "🇨🇳"
    },

    JPY: {
        name: "Japanese Yen",
        flag: "🇯🇵"
    },

    CHF: {
        name: "Swiss Franc",
        flag: "🇨🇭"
    },

    CAD: {
        name: "Canadian Dollar",
        flag: "🇨🇦"
    },

    AUD: {
        name: "Australian Dollar",
        flag: "🇦🇺"
    },

    PLN: {
        name: "Polish Zloty",
        flag: "🇵🇱"
    },

    CZK: {
        name: "Czech Koruna",
        flag: "🇨🇿"
    },

    SEK: {
        name: "Swedish Krona",
        flag: "🇸🇪"
    },

    NOK: {
        name: "Norwegian Krone",
        flag: "🇳🇴"
    },

    DKK: {
        name: "Danish Krone",
        flag: "🇩🇰"
    }

};


// ==========================================
// RATES
// ==========================================

let rates = {};


// ==========================================
// CREATE CURRENCY SELECTS
// ==========================================

function createCurrencyOptions() {

    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";


    Object.keys(currencyInfo).forEach(code => {

        const currency = currencyInfo[code];


        const fromOption =
            document.createElement("option");

        fromOption.value = code;

        fromOption.textContent =
            `${currency.flag} ${currency.name} (${code})`;


        const toOption =
            document.createElement("option");

        toOption.value = code;

        toOption.textContent =
            `${currency.flag} ${currency.name} (${code})`;


        fromCurrency.appendChild(fromOption);
        toCurrency.appendChild(toOption);

    });


    // Default
    fromCurrency.value = "GEL";
    toCurrency.value = "USD";
}


// ==========================================
// LOAD NBG DATA
// ==========================================

async function loadRates() {

    try {

        status.textContent =
            "Loading official NBG rates...";


        const response =
            await fetch(API_URL);


        if (!response.ok) {
            throw new Error(
                `API error: ${response.status}`
            );
        }


        const data =
            await response.json();


        if (
            !data ||
            !Array.isArray(data) ||
            !data[0] ||
            !Array.isArray(data[0].currencies)
        ) {

            throw new Error(
                "Unexpected API response"
            );

        }


        rates = {};


        // GEL is our base currency
        rates.GEL = {
            code: "GEL",
            rate: 1,
            quantity: 1
        };


        // Add NBG currencies
        data[0].currencies.forEach(currency => {

            if (
                currency.code &&
                currency.rate !== undefined &&
                currency.quantity !== undefined
            ) {

                rates[currency.code] = currency;

            }

        });


        status.textContent =
            "✓ Official NBG rates loaded";


        convert();

        displayPopularRates();

    }

    catch (error) {

        console.error(
            "Failed to load currency rates:",
            error
        );


        status.textContent =
            "⚠ Failed to load exchange rates";


        conversionText.textContent =
            "Rates unavailable";


        rateText.textContent =
            "Please check your internet connection.";

    }

}


// ==========================================
// GET GEL VALUE OF 1 CURRENCY
// ==========================================

function getGelRate(code) {

    if (code === "GEL") {
        return 1;
    }


    const currency =
        rates[code];


    if (!currency) {
        return null;
    }


    return (
        Number(currency.rate) /
        Number(currency.quantity)
    );

}


// ==========================================
// CONVERTER
// ==========================================

function convert() {

    if (Object.keys(rates).length === 0) {
        return;
    }


    const amount =
        Number(fromAmount.value);


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        toAmount.value = "0.00";

        conversionText.textContent =
            "Enter a valid amount";

        rateText.textContent = "";

        return;

    }


    const fromCode =
        fromCurrency.value;

    const toCode =
        toCurrency.value;


    const fromRate =
        getGelRate(fromCode);

    const toRate =
        getGelRate(toCode);


    if (
        fromRate === null ||
        toRate === null
    ) {

        return;

    }


    /*
        Convert source currency → GEL
    */

    const amountInGel =
        amount * fromRate;


    /*
        Convert GEL → target currency
    */

    const result =
        amountInGel / toRate;


    toAmount.value =
        formatNumber(result, 2);


    conversionText.textContent =
        `${formatNumber(amount, 2)} ${fromCode} = ${formatNumber(result, 2)} ${toCode}`;


    /*
        Calculate:

        1 FROM = X TO
    */

    const oneUnit =
        fromRate / toRate;


    rateText.textContent =
        `1 ${fromCode} = ${formatNumber(oneUnit, 4)} ${toCode}`;

}


// ==========================================
// NUMBER FORMAT
// ==========================================

function formatNumber(
    number,
    decimals = 2
) {

    return Number(number).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    );

}


// ==========================================
// SWAP
// ==========================================

swapButton.addEventListener(
    "click",
    () => {

        const currentFrom =
            fromCurrency.value;

        const currentTo =
            toCurrency.value;


        fromCurrency.value =
            currentTo;

        toCurrency.value =
            currentFrom;


        convert();

    }
);


// ==========================================
// LIVE CONVERSION
// ==========================================

fromAmount.addEventListener(
    "input",
    convert
);


fromCurrency.addEventListener(
    "change",
    convert
);


toCurrency.addEventListener(
    "change",
    convert
);


// ==========================================
// POPULAR RATES
// ==========================================

function displayPopularRates() {

    ratesGrid.innerHTML = "";


    const popularCurrencies = [
        "USD",
        "EUR",
        "GBP",
        "TRY",
        "RUB",
        "AMD",
        "AZN",
        "CNY"
    ];


    popularCurrencies.forEach(code => {

        if (!rates[code]) {
            return;
        }


        const info =
            currencyInfo[code];


        const gelRate =
            getGelRate(code);


        const card =
            document.createElement("div");


        card.className =
            "rate-card";


        card.innerHTML = `

            <div class="rate-flag">
                ${info.flag}
            </div>

            <div class="rate-code">
                ${code}
            </div>

            <div class="rate-name">
                ${info.name}
            </div>

            <div class="rate-value">
                ${formatNumber(gelRate, 4)} GEL
            </div>

        `;


        ratesGrid.appendChild(card);

    });

}


// ==========================================
// START
// ==========================================

createCurrencyOptions();

loadRates();


// ==========================================
// UPDATE EVERY 30 MINUTES
// ==========================================

setInterval(
    loadRates,
    30 * 60 * 1000
);
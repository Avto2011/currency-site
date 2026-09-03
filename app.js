/* ============================================
   CurrencyFlow — JavaScript
   National Bank of Georgia API
============================================ */


/* ---------- API ---------- */

const API_URL =
    "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json";


/* ---------- DOM ---------- */

const fromAmount =
    document.getElementById("fromAmount");

const toAmount =
    document.getElementById("toAmount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const swapButton =
    document.getElementById("swapButton");

const conversionText =
    document.getElementById("conversionText");

const rateText =
    document.getElementById("rateText");

const status =
    document.getElementById("status");

const ratesGrid =
    document.getElementById("ratesGrid");

const refreshButton =
    document.getElementById("refreshButton");

const lastUpdated =
    document.getElementById("lastUpdated");

const languageButton =
    document.getElementById("languageButton");


/* ============================================
   CURRENCY INFORMATION
============================================ */

const currencyInfo = {

    GEL: {
        name: "Georgian Lari",
        nameKa: "ქართული ლარი",
        flag: "🇬🇪"
    },

    USD: {
        name: "US Dollar",
        nameKa: "აშშ დოლარი",
        flag: "🇺🇸"
    },

    EUR: {
        name: "Euro",
        nameKa: "ევრო",
        flag: "🇪🇺"
    },

    GBP: {
        name: "British Pound",
        nameKa: "ბრიტანული ფუნტი",
        flag: "🇬🇧"
    },

    TRY: {
        name: "Turkish Lira",
        nameKa: "თურქული ლირა",
        flag: "🇹🇷"
    },

    RUB: {
        name: "Russian Ruble",
        nameKa: "რუსული რუბლი",
        flag: "🇷🇺"
    },

    AMD: {
        name: "Armenian Dram",
        nameKa: "სომხური დრამი",
        flag: "🇦🇲"
    },

    AZN: {
        name: "Azerbaijani Manat",
        nameKa: "აზერბაიჯანული მანათი",
        flag: "🇦🇿"
    },

    CNY: {
        name: "Chinese Yuan",
        nameKa: "ჩინური იუანი",
        flag: "🇨🇳"
    },

    JPY: {
        name: "Japanese Yen",
        nameKa: "იაპონური იენი",
        flag: "🇯🇵"
    },

    CHF: {
        name: "Swiss Franc",
        nameKa: "შვეიცარიული ფრანკი",
        flag: "🇨🇭"
    },

    CAD: {
        name: "Canadian Dollar",
        nameKa: "კანადური დოლარი",
        flag: "🇨🇦"
    },

    AUD: {
        name: "Australian Dollar",
        nameKa: "ავსტრალიური დოლარი",
        flag: "🇦🇺"
    },

    PLN: {
        name: "Polish Zloty",
        nameKa: "პოლონური ზლოტი",
        flag: "🇵🇱"
    },

    CZK: {
        name: "Czech Koruna",
        nameKa: "ჩეხური კრონა",
        flag: "🇨🇿"
    },

    SEK: {
        name: "Swedish Krona",
        nameKa: "შვედური კრონა",
        flag: "🇸🇪"
    },

    NOK: {
        name: "Norwegian Krone",
        nameKa: "ნორვეგიული კრონა",
        flag: "🇳🇴"
    },

    DKK: {
        name: "Danish Krone",
        nameKa: "დანიური კრონა",
        flag: "🇩🇰"
    }

};


/* ============================================
   TRANSLATIONS
============================================ */

const translations = {

    en: {

        navHome: "Home",
        navRates: "Exchange Rates",
        navConverter: "Converter",

        badge: "🇬🇪 Official Georgian exchange rates",

        heroTitle: "Currency conversion",
        heroTitleAccent: "made simple.",

        heroDescription:
            "Convert Georgian Lari and other currencies using official exchange rates from Georgia's National Bank.",

        startConverting:
            "Start converting →",

        converterSmallTitle:
            "CURRENCY CONVERTER",

        converterTitle:
            "Convert your money",

        converterDescription:
            "Choose currencies and enter the amount you want to convert.",

        youSend:
            "You send",

        youReceive:
            "You receive",

        refresh:
            "Refresh",

        ratesSmallTitle:
            "TODAY'S RATES",

        ratesTitle:
            "Popular currencies",

        ratesDescription:
            "Official exchange rates provided by the National Bank of Georgia.",

        infoTitle:
            "Official exchange rates",

        infoDescription:
            "CurrencyFlow uses official exchange-rate data provided by the National Bank of Georgia. Actual bank and exchange-office rates may differ.",

        sourceLink:
            "Visit National Bank of Georgia →",

        footerDescription:
            "Simple and fast currency conversion.",

        footerRates:
            "Official rates by NBG",

        loading:
            "Loading official NBG rates...",

        loaded:
            "✓ Official NBG rates loaded",

        error:
            "⚠ Failed to load exchange rates",

        connection:
            "Please check your internet connection.",

        invalid:
            "Enter a valid amount",

        unavailable:
            "Rates unavailable",

        lastUpdated:
            "Last updated",

        perUnit:
            "per 1 unit"

    },


    ka: {

        navHome: "მთავარი",
        navRates: "კურსები",
        navConverter: "კონვერტერი",

        badge: "🇬🇪 საქართველოს ოფიციალური კურსები",

        heroTitle: "ვალუტის კონვერტაცია",
        heroTitleAccent: "მარტივად.",

        heroDescription:
            "გადააკონვერტირე ქართული ლარი და სხვა ვალუტები საქართველოს ეროვნული ბანკის ოფიციალური კურსებით.",

        startConverting:
            "კონვერტაციის დაწყება →",

        converterSmallTitle:
            "ვალუტის კონვერტერი",

        converterTitle:
            "გადააკონვერტირე თანხა",

        converterDescription:
            "აირჩიე ვალუტები და შეიყვანე სასურველი თანხა.",

        youSend:
            "აგზავნი",

        youReceive:
            "იღებ",

        refresh:
            "განახლება",

        ratesSmallTitle:
            "დღევანდელი კურსები",

        ratesTitle:
            "პოპულარული ვალუტები",

        ratesDescription:
            "საქართველოს ეროვნული ბანკის მიერ მოწოდებული ოფიციალური კურსები.",

        infoTitle:
            "ოფიციალური გაცვლითი კურსები",

        infoDescription:
            "CurrencyFlow იყენებს საქართველოს ეროვნული ბანკის ოფიციალურ გაცვლით კურსებს. ბანკებისა და ვალუტის გადამცვლელი პუნქტების რეალური კურსები შეიძლება განსხვავდებოდეს.",

        sourceLink:
            "საქართველოს ეროვნული ბანკი →",

        footerDescription:
            "მარტივი და სწრაფი ვალუტის კონვერტაცია.",

        footerRates:
            "ოფიციალური კურსები — სებ",

        loading:
            "ოფიციალური კურსების ჩატვირთვა...",

        loaded:
            "✓ ოფიციალური კურსები ჩაიტვირთა",

        error:
            "⚠ კურსების ჩატვირთვა ვერ მოხერხდა",

        connection:
            "შეამოწმე ინტერნეტთან კავშირი.",

        invalid:
            "შეიყვანე სწორი თანხა",

        unavailable:
            "კურსები მიუწვდომელია",

        lastUpdated:
            "ბოლო განახლება",

        perUnit:
            "1 ერთეულზე"

    }

};


/* ============================================
   STATE
============================================ */

let rates = {};

let currentLanguage =
    localStorage.getItem("currencyflow-language") || "en";


/* ============================================
   LANGUAGE
============================================ */

function t(key) {

    return (
        translations[currentLanguage][key] ||
        translations.en[key] ||
        key
    );

}


function updateLanguage() {

    document.documentElement.lang =
        currentLanguage === "ka"
            ? "ka"
            : "en";


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            element.textContent =
                t(key);

        });


    languageButton.textContent =
        currentLanguage === "en"
            ? "🇬🇪 KA"
            : "🇬🇧 EN";


    updateLastUpdatedText();

    displayPopularRates();

    if (Object.keys(rates).length > 0) {
        convert();
    }

}


languageButton.addEventListener(
    "click",
    () => {

        currentLanguage =
            currentLanguage === "en"
                ? "ka"
                : "en";

        localStorage.setItem(
            "currencyflow-language",
            currentLanguage
        );

        updateLanguage();

    }
);


/* ============================================
   CURRENCY OPTIONS
============================================ */

function createCurrencyOptions() {

    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";


    Object.keys(currencyInfo)
        .forEach(code => {

            const currency =
                currencyInfo[code];


            const name =
                currentLanguage === "ka"
                    ? currency.nameKa
                    : currency.name;


            const text =
                `${currency.flag} ${name} (${code})`;


            const fromOption =
                document.createElement("option");

            fromOption.value =
                code;

            fromOption.textContent =
                text;


            const toOption =
                document.createElement("option");

            toOption.value =
                code;

            toOption.textContent =
                text;


            fromCurrency.appendChild(
                fromOption
            );

            toCurrency.appendChild(
                toOption
            );

        });


    fromCurrency.value = "GEL";
    toCurrency.value = "USD";

}


/* ============================================
   LOAD NBG DATA
============================================ */

async function loadRates() {

    refreshButton.classList.add(
        "loading"
    );

    refreshButton.disabled = true;


    status.className =
        "status";

    status.textContent =
        t("loading");


    try {

        const response =
            await fetch(
                `${API_URL}?t=${Date.now()}`,
                {
                    cache: "no-store"
                }
            );


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
            !Array.isArray(
                data[0].currencies
            )
        ) {

            throw new Error(
                "Unexpected API response"
            );

        }


        rates = {};


        /* GEL base */

        rates.GEL = {

            code: "GEL",

            rate: 1,

            quantity: 1

        };


        /* NBG currencies */

        data[0].currencies
            .forEach(currency => {

                if (
                    currency.code &&
                    currency.rate !== undefined &&
                    currency.quantity !== undefined
                ) {

                    rates[currency.code] =
                        currency;

                }

            });


        status.className =
            "status success";

        status.textContent =
            t("loaded");


        updateLastUpdated();

        convert();

        displayPopularRates();

    }

    catch (error) {

        console.error(
            "Failed to load currency rates:",
            error
        );


        status.className =
            "status error";

        status.textContent =
            t("error");


        conversionText.textContent =
            t("unavailable");

        rateText.textContent =
            t("connection");

    }

    finally {

        refreshButton.classList.remove(
            "loading"
        );

        refreshButton.disabled = false;

    }

}


/* ============================================
   LAST UPDATED
============================================ */

let lastUpdateTime = null;


function updateLastUpdated() {

    lastUpdateTime =
        new Date();

    updateLastUpdatedText();

}


function updateLastUpdatedText() {

    if (!lastUpdateTime) {

        lastUpdated.textContent =
            `${t("lastUpdated")}: —`;

        return;

    }


    const formatted =
        lastUpdateTime.toLocaleString(
            currentLanguage === "ka"
                ? "ka-GE"
                : "en-US",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );


    lastUpdated.textContent =
        `${t("lastUpdated")}: ${formatted}`;

}


/* ============================================
   GET GEL RATE
============================================ */

function getGelRate(code) {

    if (code === "GEL") {
        return 1;
    }


    const currency =
        rates[code];


    if (!currency) {
        return null;
    }


    const rate =
        Number(currency.rate);

    const quantity =
        Number(currency.quantity);


    if (
        !Number.isFinite(rate) ||
        !Number.isFinite(quantity) ||
        quantity <= 0
    ) {

        return null;

    }


    return rate / quantity;

}


/* ============================================
   CONVERTER
============================================ */

function convert() {

    if (
        Object.keys(rates).length === 0
    ) {

        return;

    }


    const amount =
        Number(fromAmount.value);


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        toAmount.value =
            "0.00";

        conversionText.textContent =
            t("invalid");

        rateText.textContent =
            "";

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

        conversionText.textContent =
            t("unavailable");

        rateText.textContent =
            "";

        return;

    }


    /*
        Source currency → GEL
    */

    const amountInGel =
        amount * fromRate;


    /*
        GEL → target currency
    */

    const result =
        amountInGel / toRate;


    toAmount.value =
        formatNumber(
            result,
            2
        );


    conversionText.textContent =
        `${formatNumber(amount, 2)} ${fromCode} = ${formatNumber(result, 2)} ${toCode}`;


    /*
        1 FROM = X TO
    */

    const oneUnit =
        fromRate / toRate;


    rateText.textContent =
        `1 ${fromCode} = ${formatNumber(oneUnit, 4)} ${toCode}`;

}


/* ============================================
   NUMBER FORMAT
============================================ */

function formatNumber(
    number,
    decimals = 2
) {

    return Number(number)
        .toLocaleString(
            "en-US",
            {
                minimumFractionDigits:
                    decimals,

                maximumFractionDigits:
                    decimals
            }
        );

}


/* ============================================
   SWAP
============================================ */

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


/* ============================================
   LIVE CONVERSION
============================================ */

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


/* ============================================
   REFRESH
============================================ */

refreshButton.addEventListener(
    "click",
    loadRates
);


/* ============================================
   POPULAR RATES
============================================ */

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


    popularCurrencies.forEach(
        code => {

            if (!rates[code]) {
                return;
            }


            const info =
                currencyInfo[code];


            const gelRate =
                getGelRate(code);


            if (
                !info ||
                gelRate === null
            ) {

                return;

            }


            const name =
                currentLanguage === "ka"
                    ? info.nameKa
                    : info.name;


            const card =
                document.createElement(
                    "div"
                );


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
                    ${name}
                </div>

                <div class="rate-value">
                    ${formatNumber(gelRate, 4)} GEL
                </div>

                <div class="rate-caption">
                    ${t("perUnit")}
                </div>

            `;


            ratesGrid.appendChild(card);

        }
    );

}


/* ============================================
   INITIALIZE
============================================ */

createCurrencyOptions();

updateLanguage();

loadRates();


/* ============================================
   AUTO UPDATE
   Every 30 minutes
============================================ */

setInterval(
    loadRates,
    30 * 60 * 1000
);
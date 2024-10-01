// utils/BaseMerchantTest.ts
import {
  test as playwrightTest,
  expect
} from "@playwright/test";
async function closeContextWithTimeout(context, timeout) {
  let timeoutHandle;
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      console.warn(`Context close timeout reached (${timeout}ms).`);
      resolve();
    }, timeout);
  });
  try {
    await Promise.race([context.close(), timeoutPromise]);
  } catch (error) {
    console.warn("Failed to close context within the timeout:", error);
  } finally {
    clearTimeout(timeoutHandle);
  }
}
var test = playwrightTest.extend({
  context: async ({ context }, use) => {
    await context.route("**/*", (route) => {
      const url = route.request().url();
      if (url.includes("ads") || url.includes("doubleclick") || url.includes("pinterest") || url.includes("linkedin") || url.includes("google-analytics") || url.includes("googletagmanager") || url.includes("facebook") || url.includes("segment.io") || url.includes("api.retailer.croissant.com/v0/events/") || url.includes("https://plausible.io/api") || url.includes("https://static.klaviyo.com/") || url.includes("https://events.bouncex.net/") || url.includes("triggerbee.com") || url.includes("gorgias.chat")) {
        return route.abort();
      } else {
        return route.continue();
      }
    });
    await use(context);
    await context.unroute("**/*");
    for (const page of context.pages()) {
      await page.close();
    }
    await closeContextWithTimeout(context, 3e4);
  }
});

// merchant/monitors/clear.weather/clear.weather.monitor.test.ts
import { v4 as uuidv4 } from "uuid";

// config.ts
var defaultConfig = {
  privacyPolicy: "https://croissant.com/privacy-policy",
  termsAndConditionsPage: "https://croissant.com/terms-and-conditions",
  email: {
    static_empty: "quality+staticempty@croissant.com",
    qa_base: "croissantquality@gmail.com"
  },
  password: "Croissant123!"
};
var config = {
  environment: "Integration",
  seeded_account_api_key: "GT1DiWRlQg8a0yyszjMfl6N1jenhknTZ3L5NiDMD",
  aws: {
    region: process.env.AWS_REGION || "us-east-2",
    userPoolId: process.env.AWS_USER_POOL_ID || "us-east-2_8QUNjtOSs"
  },
  teststore: {
    url: process.env.SHOPIFY_URL || "http://croissant-integration.myshopify.com",
    password: process.env.SHOPIFY_PASSWORD || "Croissant123!",
    eligibleItemLocations: [
      "products/evi-oversized-striped-cashmere-sweater"
    ],
    ineligibleItemLocation: "products/anatole-ring-amethyst",
    pricingUrl: "https://api.retailer.int.croissant.com/v0/prices",
    merchantId: "0",
    storeCredit: true,
    autoOptIn: false,
    abbreviatedContent: false
  },
  favorite_daughter: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "49159143577",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  herve_leger: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "44961398952",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  lela_rose: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "13135151161",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  daughter_lessons: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "55970267341",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  webster: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  orage: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "",
    storeCredit: false,
    autoOptIn: true,
    abbreviatedContent: false
  },
  eleven_six: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  seezona: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  cambridge: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "",
    merchantId: "",
    storeCredit: true,
    autoOptIn: false,
    abbreviatedContent: false
  },
  rue_sophie: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "https://api.retailer.croissant.com/v0/prices",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  abc: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "https://api.retailer.croissant.com/v0/prices",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  hatch: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "https://api.retailer.croissant.com/v0/prices",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  clearweather: {
    url: "",
    eligibleItemLocations: [""],
    ineligibleItemLocation: "",
    pricingUrl: "https://api.retailer.croissant.com/v0/prices",
    merchantId: "",
    storeCredit: false,
    autoOptIn: false,
    abbreviatedContent: false
  },
  api: {
    events: {
      api_url: "https://api.event.int.croissant.com/v0"
    },
    shopify_store: {
      retailer: {
        domain: "croissant-integration.myshopify.com",
        name: "Croissant Integration",
        id: "60011544715",
        test_product_id: "40859471872139"
      },
      merchantCredentials: {
        clientId: "51tuc8dtec3mqif4ukbqgp2grv",
        //SHOPIFY-croissant-integration App Client
        clientSecret: "rrvp4ar58ffd7hp1eushkjaq0hi3hpscgsi6hbbao68d9b4enee"
      }
    },
    test_shell: {
      retailer: {
        clientId: process.env.RETAILER_CLIENT_ID || "37odivkgh3oeqrcbiromop60n9",
        //SHOPIFY-Croissant Test Shop shell
        clientSecret: process.env.RETAILER_CLIENT_SECRET || "hrraetsgbjonu5iuqfhm115mleuvr5eage0t7iovh0cbeopgrep",
        api_url: process.env.API_URL || "https://api.retailer.int.croissant.com/v0",
        retailer_product_id: "6987644469387"
      }
    },
    admin: {
      clientId: process.env.ADMIN_CLIENT_ID || "1coaarunvrsh35himfnecduij",
      clientSecret: process.env.ADMIN_CLIENT_SECRET || "qkg1jp1fn1l38o66d5ofhquc1d5ulqit6cjjhbh4m2qpd0kejqb",
      api_url: process.env.API_URL || "https://api.admin.int.croissant.com"
    },
    consumer: {
      username: process.env.CONSUMER_USERNAME || "quality@croissant.com",
      password: process.env.CONSUMER_PASSWORD || "",
      userpool: process.env.CONSUMER_USERPOOL || "us-east-2_p006FmkeS"
    }
  },
  webapp: {
    url: "http://app.int.croissant.com",
    urlHttps: "https://app.int.croissant.com",
    static_username: "quality+static52518160@croissant.com",
    static_password: "Croissant123!"
  },
  website: {
    url: "https://int.croissant.com"
  }
};
if (process.env.TARGET_ENVIRONMENT === "Sandbox") {
  config = {
    environment: "Sandbox",
    seeded_account_api_key: "iNekj0vJtS79d1UECawyW9qvvq6UVdaT4EP3YVcB",
    aws: {
      region: process.env.AWS_REGION || "us-east-2",
      userPoolId: process.env.AWS_USER_POOL_ID || "us-east-2_a34BuRYVl"
    },
    teststore: {
      url: process.env.SHOPIFY_URL || "http://croissant-sandbox.myshopify.com",
      password: process.env.SHOPIFY_PASSWORD || "Croissant123!",
      eligibleItemLocations: [
        "products/evelina-quilted-padded-vegan-leather-jacket"
      ],
      ineligibleItemLocation: "products/scalp-masajeador",
      pricingUrl: "https://api.retailer.sbx.croissant.com/v0/prices",
      merchantId: "0",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    favorite_daughter: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "49159143577",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    herve_leger: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "44961398952",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    lela_rose: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "13135151161",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    daughter_lessons: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "55970267341",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    webster: {
      url: "https://mcstaging2.thewebster.com",
      eligibleItemLocations: [
        "shop/1056857-rhps23sw04826610-crewneck-sweatshirt-vintage-sand.html"
      ],
      ineligibleItemLocation: "shop/1130291-745757-zam4b-checked-blazer-pink.html?_gl=1*adged6*_ga*MTMxNzMzNzMwMS4xNjk5NjQ5ODQw*_ga_N50JYC6P70*MTcwMjQ5NjY2Ny4xOC4xLjE3MDI0OTgyNTMuNTAuMC4w#size=653",
      pricingUrl: "https://api.retailer.sbx.croissant.com/v0/prices",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    orage: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "",
      storeCredit: false,
      autoOptIn: true,
      abbreviatedContent: false
    },
    eleven_six: {
      url: "https://7lutc8x1hj3fvd1n-57254903962.shopifypreview.com",
      eligibleItemLocations: ["products/vaida-sweater-citron"],
      ineligibleItemLocation: "products/sophia-hat-ivory",
      pricingUrl: "",
      merchantId: "57254903962",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    seezona: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    cambridge: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "",
      storeCredit: true,
      autoOptIn: false,
      abbreviatedContent: false
    },
    rue_sophie: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    abc: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    hatch: {
      url: "https://cns0msox5kr3v4ua-19918975.shopifypreview.com/",
      eligibleItemLocations: [
        "products/the-maternity-lenora-romper?variant=39556950491313?color=charcoal",
        "products/the-dion-sweater-dress?variant=43639980916913?color=sand",
        "products/the-hatch-boyfriend-maternity-jean?variant=42419724353713?color=destroyed-light-wash",
        "products/the-ultra-soft-before-during-after-maternity-legging?variant=32735039062125?color=black",
        "products/the-carolina-dress-2?variant=43366958334129"
      ],
      ineligibleItemLocation: "products/belly-oil-1",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "19918975",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    clearweather: {
      url: "",
      eligibleItemLocations: [""],
      ineligibleItemLocation: "",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    api: {
      events: {
        api_url: "https://api.event.sbx.croissant.com/v0"
      },
      shopify_store: {
        retailer: {
          domain: "croissant-sandbox.myshopify.com",
          name: "Croissant Sandbox",
          id: "65662681339",
          test_product_id: "43667673219323"
        },
        merchantCredentials: {
          clientId: "2uu09m6i82p4cit110ejdl1300",
          //SHOPIFY-croissant-sandbox App Client
          clientSecret: "6gh10nisrjgnhih0hni23rtr9iqqniq6astd49u5kftcr3pjb47"
        }
      },
      test_shell: {
        retailer: {
          clientId: process.env.RETAILER_CLIENT_ID || "vi29a85f8g18r3fbpdc9adgu6",
          //SHOPIFY-Croissant Test Shop shell
          clientSecret: process.env.RETAILER_CLIENT_SECRET || "u4qa7couskao1ad0jgl6na6h381tim2t6dfm47pm4j6p91o6dci",
          api_url: process.env.API_URL || "https://api.retailer.sbx.croissant.com/v0",
          retailer_product_id: "43664478142715"
        }
      },
      admin: {
        clientId: process.env.ADMIN_CLIENT_ID || "3d6fi1kjfvn2k82pe9eli4pnua",
        clientSecret: process.env.ADMIN_CLIENT_SECRET || "oak48gdualludq4gbhqk87840b0p93aubiogom0ncds2omgb8g3",
        api_url: process.env.API_URL || "https://api.admin.sbx.croissant.com"
      },
      consumer: {
        username: process.env.CONSUMER_USERNAME || "quality@croissant.com",
        password: process.env.CONSUMER_PASSWORD || "",
        userpool: process.env.CONSUMER_USERPOOL || ""
      }
    },
    webapp: {
      url: "http://app.sbx.croissant.com",
      urlHttps: "https://app.sbx.croissant.com",
      static_username: "quality+static10504140@croissant.com",
      static_password: "Croissant123!"
    },
    website: {
      url: "https://sbx.croissant.com"
    }
  };
}
if (process.env.TARGET_ENVIRONMENT === "Production") {
  config = {
    environment: "Production",
    seeded_account_api_key: "",
    aws: {
      region: process.env.AWS_REGION || "us-east-2",
      userPoolId: process.env.AWS_USER_POOL_ID || "us-east-2_uo5VhVry5"
    },
    teststore: {
      url: "",
      password: "",
      eligibleItemLocations: [],
      ineligibleItemLocation: "",
      pricingUrl: "",
      merchantId: "",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    favorite_daughter: {
      url: "https://shopfavoritedaughter.com",
      eligibleItemLocations: [
        "products/the-favorite-pant-vienna",
        "products/the-crop-ex-boyfriend-shirt-warm-sand",
        "products/favorite-daughter-heart-logo-sweatshirt-gardenia-new",
        "products/the-masha-super-high-rise-wide-leg-crop-dublin",
        "products/the-valentina-shortie-dallas"
      ],
      ineligibleItemLocation: "products/gift-card",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "49159143577",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    herve_leger: {
      url: "https://herveleger.com",
      eligibleItemLocations: [
        "products/the-beth-dress-902",
        "products/the-bella-dress-439",
        "products/the-maeve-dress-080",
        "products/icon-high-waist-silk-wide-leg-pants-400",
        "products/the-maya-leggings-001"
      ],
      ineligibleItemLocation: "products/e-gift-card-1",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "44961398952",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    lela_rose: {
      url: "https://www.lelarose.com",
      eligibleItemLocations: [
        "products/watercolor-floral-cotton-voile-isabel-dress",
        "products/pigment-linen-seamed-column-dress",
        "products/satin-crepe-ruffle-shoulder-detail-maxi-dress",
        "products/printed-crepe-demi-pant",
        "products/enchanted-cotton-sateen-grace-pant"
      ],
      ineligibleItemLocation: "products/lela-rose-x-elizabeth-lake-stache-your-drink-here-cocktail-napkins-set-of-4",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "13135151161",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    daughter_lessons: {
      url: "https://daughterlessonsnyc.com",
      eligibleItemLocations: [
        "products/better-than-your-ex-windbreaker",
        "products/heartbreaker-legging-1",
        "products/light-work-jogger",
        "products/uptown-oversized-crew",
        "products/twenty-four-seven-sport-coat"
      ],
      ineligibleItemLocation: "products/dl-city-tee",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "55970267341",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    webster: {
      url: "https://www.thewebster.com",
      eligibleItemLocations: [
        "shop/1106127-ia3962-x-wales-bonner-nylon-andorak-jacket-clear-mint.html",
        "shop/1258320-h2005-711-w711-medium-lotus-tote-bag-neutral.html",
        "shop/1234500-rhss24ha14973309-x-the-webster-knit-script-bucket-hat-black.html",
        "shop/1203406-bpz0arp0ux305-embroidered-canvas-cap-khaki.html",
        "shop/1272440-8085403-snip-shoulder-bag-ruby.html"
      ],
      ineligibleItemLocation: "shop/1129878-548334-xjfwm-mushroom-cotton-jersey-t-shirt-black.html",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "0c2e41a9-b2b7-4175-b750-b9ec1c89ff9f",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    orage: {
      url: "https://us.orage.com",
      eligibleItemLocations: [
        "products/chic-chocs-3l-jacket-j11002",
        "products/cliff-3l-bib-l20606",
        "products/albert-fleece-layering-j10210",
        "products/pheonix-hybrid-layering-pant-l20704",
        "products/altitude-gilltek-hoodie-jacket-l10707"
      ],
      ineligibleItemLocation: "products/fisherman-beanie-j50906",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "49558519968",
      storeCredit: false,
      autoOptIn: true,
      abbreviatedContent: false
    },
    eleven_six: {
      url: "https://eleven-six.co",
      eligibleItemLocations: [
        "products/luna-cardi-multi-color",
        "products/iola-crochet-top-black",
        "products/lila-crochet-shirt",
        "products/shawl-collar",
        "products/nick-sweater-navy-tweed"
      ],
      ineligibleItemLocation: "products/gift-cards-1",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "57254903962",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    seezona: {
      url: "https://www.seezona.com",
      eligibleItemLocations: [
        "product/nazli-ceren-ines-jersey-long-dress-in-noire-unique-67900843",
        "product/sepi-agari-raphaella-in-salt-82072342",
        "product/marina-raphael-baby-riviera-in-silver-ribbed-leather-seezona-new-fashion-25075",
        "product/yvon-jasmine-fashion-style-47733053",
        "product/ila-uma-cut-out-linen-midi-dress-fashion-style-10379062"
      ],
      ineligibleItemLocation: "product/malo-008-popcorn-edp-fashion-style-44916",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "af1c5caa-eda1-4fbf-8798-f727b459a39a",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    cambridge: {
      url: "https://us.cambridgesatchel.com",
      eligibleItemLocations: [
        "products/poppy-bag-in-leather-french-grey",
        "products/the-daisy-leather-handbag-navy",
        "products/music-leather-briefcase-oxblood",
        "products/traveller-crossbody-bags-racing-green",
        "products/bowls-crossbody-bag-racing-green-celtic-grain"
      ],
      ineligibleItemLocation: "products/the-clip-on-pouch-surf",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "24187083",
      storeCredit: true,
      autoOptIn: false,
      abbreviatedContent: false
    },
    rue_sophie: {
      url: "https://ruesophie.com",
      eligibleItemLocations: [
        "products/s224dy897?variant=42861794492598",
        "products/s224dy911",
        "products/s124ss406-lav-ash",
        "products/s124jy860-cement",
        "products/s124dy865-blush"
      ],
      ineligibleItemLocation: "products/gift-card",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "57754124470",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    abc: {
      url: "https://advisoryboardcrystals.com",
      eligibleItemLocations: [
        "products/abc-hoodie-2024",
        "products/abc-123-hologram-long-sleeve-tee-ss24-heather-grey",
        "products/abc-123-hologram-french-terry-zip-up-hoodie-ss24-dark-heather-grey",
        "products/abc-northeast-western-top-coat-ss24-blue",
        "products/abc-r-i-p-society-quarter-zip-ss24"
      ],
      ineligibleItemLocation: "products/black-diamond-dealer-necklace",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "25198821438",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    hatch: {
      url: "https://www.hatchcollection.com",
      eligibleItemLocations: [
        "products/the-maternity-lenora-romper?variant=39556950491313?color=charcoal",
        "products/the-dion-sweater-dress?variant=43639980916913?color=sand",
        "products/the-hatch-boyfriend-maternity-jean?variant=42419724353713?color=destroyed-light-wash",
        "products/the-ultra-soft-before-during-after-maternity-legging?variant=32735039062125?color=black",
        "products/the-carolina-dress-2?variant=43366958334129"
      ],
      ineligibleItemLocation: "products/belly-oil-1",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "19918975",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    clearweather: {
      url: "https://clearweatherbrand.com",
      eligibleItemLocations: [
        "products/continental-white",
        "products/continental-jet-black",
        "products/aries",
        "products/aries-2",
        "products/qualifier-bright-white"
      ],
      ineligibleItemLocation: "products/qualifier-tee",
      pricingUrl: "https://api.retailer.croissant.com/v0/prices",
      merchantId: "64616661144",
      storeCredit: false,
      autoOptIn: false,
      abbreviatedContent: false
    },
    api: {
      events: {
        api_url: "https://api.event.croissant.com/v0"
      },
      shopify_store: {
        retailer: {
          domain: "croissantstore.myshopify.com",
          name: "Croissant Demo",
          id: "62144446627",
          test_product_id: "42919001915555"
        },
        merchantCredentials: {
          clientId: "20nqd336rogs6t7l88ajdl3a7c",
          clientSecret: "ohepl1rif1f88gvmlva34n2sl9r0kpm7p4bvqd5ne2t5fk55qss"
        }
      },
      test_shell: {
        retailer: {
          clientId: process.env.RETAILER_CLIENT_ID || "",
          clientSecret: process.env.RETAILER_CLIENT_SECRET || "",
          api_url: process.env.API_URL || "https://api.retailer.croissant.com/v0",
          retailer_product_id: "42919001915555"
        }
      },
      admin: {
        clientId: process.env.ADMIN_CLIENT_ID || "to61ootcf5kre1uoh6lqic15s",
        clientSecret: process.env.ADMIN_CLIENT_SECRET || "1pnhiu6q9gn90ppobvts3tnrjdt3afrb55oaj6k1liseq91nvqu4",
        api_url: process.env.API_URL || "https://api.admin.croissant.com"
      },
      consumer: {
        username: process.env.CONSUMER_USERNAME || "quality@croissant.com",
        password: process.env.CONSUMER_PASSWORD || "",
        userpool: process.env.CONSUMER_USERPOOL || ""
      }
    },
    webapp: {
      url: "http://app.croissant.com",
      urlHttps: "https://app.croissant.com",
      static_username: "",
      static_password: ""
    },
    website: {
      url: "https://www.croissant.com"
    }
  };
}
var config_default = { ...config, ...defaultConfig };

// utils/TestUtils.ts
import fs from "fs";
import path from "path";
import { test as test2, expect as expect3 } from "@playwright/test";

// utils/HttpClient.ts
import axios from "axios";
var httpClient = axios.create({
  maxContentLength: 100 * 1024 * 1024,
  timeout: 180 * 1e3
});
var HttpClient = class {
  static async httpPost(endpoint, headers2, body) {
    return await httpClient.post(endpoint, body, { headers: headers2 }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
  static async httpPut(endpoint, headers2, body) {
    return await httpClient.put(endpoint, body, { headers: headers2 }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
  static async httpPatch(endpoint, headers2, body) {
    return await httpClient.patch(endpoint, body, { headers: headers2 }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
  static async httpDelete(endpoint, headers2) {
    return await httpClient.delete(endpoint, { headers: headers2 });
  }
  static async httpGet(endpoint, headers2 = {}, queryParams = {}) {
    return await httpClient.get(endpoint, {
      headers: headers2,
      params: queryParams
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
};

// utils/RetailerApiClient.ts
var headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: ""
};
var EventsClient = class {
  static async postPerformanceMeasurement(url, testRunId2, fcp, lt, plt, ppl, startTime, merchantId, component) {
    let request = {
      type: "performance-measurement",
      event: {},
      partitionKey: "performance-measurement"
    };
    if (component = "TOGGLE" /* TOGGLE */) {
      request.event = {
        url,
        test_run_id: testRunId2,
        first_contentful_paint: String(fcp),
        page_load_time: String(lt),
        perceived_toggle_load_time: String(plt),
        percent_of_page_load_to_toggle_visible: String(ppl),
        timestamp: new Date(startTime).toISOString(),
        merchant_id: merchantId
      };
    }
    if (component = "BADGE" /* BADGE */) {
      request.event = {
        url,
        test_run_id: testRunId2,
        first_contentful_paint: String(fcp),
        page_load_time: String(lt),
        perceived_badge_load_time: String(plt),
        percent_of_page_load_to_badge_visible: String(ppl),
        timestamp: new Date(startTime).toISOString(),
        merchant_id: merchantId
      };
    }
    let response = await HttpClient.httpPost(
      `${config_default.api.events.api_url}/track`,
      headers,
      JSON.stringify(request)
    );
    console.log(JSON.stringify(request));
    console.log(response.data);
    return response;
  }
};

// utils/VisualUtils.ts
import { expect as expect2 } from "@playwright/test";
var screenshotCaptureMap = /* @__PURE__ */ new Map();
var VisualUtils = class _VisualUtils {
  static async compareElementToBaseLineImage(element, maskLocators = []) {
    if (process.env.SCREENSHOT_COMPARE === "true") {
      await WebTestUtils.waitForLocatorToBeVisible(element);
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      await expect2(element).toHaveScreenshot({
        omitBackground: true,
        maxDiffPixelRatio: 0.1,
        mask: maskLocators
      });
    }
  }
  static async CaptureNScreenshotsOnly(name, element, max_screenshots = 3, maskLocators = []) {
    let currentScreenshotsCount = screenshotCaptureMap.get(name) ?? 0;
    if (currentScreenshotsCount <= max_screenshots) {
      await _VisualUtils.compareElementToBaseLineImage(element, maskLocators);
      screenshotCaptureMap.set(name, currentScreenshotsCount + 1);
    }
  }
};

// utils/TestUtils.ts
var WebTestUtils = class {
  static async addLocatorHandler(page, locator, name, times = 1) {
    await page.addLocatorHandler(
      locator,
      async (locator2) => {
        if (await locator2.isVisible()) {
          await this.clickDynamicLocator(locator2, 1e4);
          console.log`Clicked ${name} Button`;
        }
      },
      { times }
    );
  }
  static async clickDynamicLocator(locator, timeout = 2500, attempt = 0) {
    const retries = 4;
    if (attempt >= retries) {
      console.log(`Failed to click locator after ${attempt} attempts.`);
      return false;
    }
    try {
      let isVisible = await this.waitForLocatorToBeVisible(
        locator,
        timeout
      );
      if (!isVisible) {
        throw new Error("Locator was not visible after waiting.");
      }
      await locator.click({ force: true, timeout: 1e3 });
      console.log(
        `${locator.toString()} was successfully clicked. Validating it is closed.`
      );
      isVisible = await this.waitForLocatorToBeVisible(locator, 1e3);
      if (!isVisible) {
        return true;
      } else {
        throw new Error("Locator did not close after clicking.");
      }
    } catch (e) {
      console.log(
        `${locator.toString()} error: ${e.message}. Attempt ${attempt + 1}/${retries}.`
      );
      return await this.clickDynamicLocator(
        locator,
        timeout,
        attempt + 1
      );
    }
  }
  static async cleanText(text) {
    return text.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/\u200B/g, "").trim();
  }
  static async waitForCondition(action, check, errorMessage, timeout = 1e4, retryInterval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const result = await action();
        if (check(result)) {
          return check(result);
        }
      } catch (e) {
        console.log(e);
      }
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
    }
    throw new Error(errorMessage);
  }
  static async waitForLocatorToBeVisible(locator, timeout = 1e4) {
    try {
      await locator.waitFor({ state: "visible", timeout });
    } catch (error) {
      return false;
    }
    return true;
  }
  static async getCleanedText(locator, timeout) {
    let text = "";
    let textContent = null;
    try {
      textContent = await Promise.race([
        locator.textContent({
          timeout: timeout / 20
        }),
        locator.innerText({
          timeout: timeout / 20
        })
      ]);
      if (textContent) text = await this.cleanText(textContent) || "";
    } catch (error) {
    }
    return text;
  }
  static async waitForLocatorToContainText(locator, expectedText, timeout = 1e4, retryInterval = 500) {
    return await this.waitForCondition(
      async () => {
        await this.waitForLocatorToBeVisible(locator, timeout / 20);
        const cleanedText = await this.getCleanedText(locator, timeout);
        if (!cleanedText.includes(expectedText)) {
          console.log("Waiting for text failed");
          console.log(`Locator: ${locator}`);
          console.log(`Text: ${cleanedText}`);
        }
        return cleanedText.includes(expectedText);
      },
      (result) => result === true,
      `Timeout: Expected textContent '${expectedText}' but did not find it within ${timeout / 1e3} seconds.`,
      timeout,
      retryInterval
    );
  }
  static async waitForLocatorToContainValue(locator, expectedValue, timeout = 1e4) {
    let result = false;
    await test2.step(`Wait for locator to contain value`, async () => {
      result = await this.waitForCondition(
        () => locator.inputValue({ timeout: timeout / 10 }),
        (value) => value && value.includes(expectedValue),
        `Timeout: Expected value '${expectedValue}' but did not find it within ${timeout / 1e3} seconds`,
        timeout
      );
    });
    return result;
  }
  static async waitForLocatorToBeHidden(locator, timeout = 1e4) {
    return await test2.step(`Wait for locator to be hidden`, async () => {
      try {
        await locator.waitFor({ state: "hidden", timeout });
        return true;
      } catch (error) {
        console.log(
          `Locator (${locator}) was not hidden within ${timeout / 1e3} seconds. Continuing.`
        );
        return false;
      }
    });
  }
  static async validateLocatorLink(locator, expectedValue) {
    await test2.step(`Validate Locator Link`, async () => {
      await this.waitForLocatorToBeVisible(locator);
      let link = await locator.locator("a").getAttribute("href");
      expect3(link).toBe(expectedValue);
    });
  }
  static async centerMouse(page, viewportSize = { width: 1920, height: 1080 }) {
    await test2.step("Move mouse", async () => {
      const x = viewportSize.width / 2;
      const y = viewportSize.height / 2;
      await page.mouse.move(x, y);
    });
  }
  static async jigglePage(page) {
    await test2.step("Scroll page back and forth", async () => {
      await page.mouse.wheel(0, 15);
      await page.mouse.wheel(0, -15);
    });
  }
};
var MerchantTestUtils = class _MerchantTestUtils {
  static async parsePricingResponse(pricingResponse, storeCredit, multiplier = 1) {
    let resalePriceDollars;
    if (pricingResponse) {
      const responseBody = await pricingResponse.json();
      console.log(`Pricing Response: ${JSON.stringify(responseBody)}`);
      const resalePriceCents = parseInt(
        storeCredit ? responseBody.storeCredit.resalePrice : responseBody.cash.resalePrice
      );
      if (!isNaN(resalePriceCents)) {
        resalePriceDollars = resalePriceCents / 100 * multiplier;
        return Number(resalePriceDollars);
      } else {
        throw new Error("Invalid resale price in the response.");
      }
    } else {
      throw new Error("Pricing response empty!");
    }
  }
  static async addToCart(page, addToCartButton, timeout = 1e4) {
    await test2.step("Add to cart", async () => {
      await WebTestUtils.waitForLocatorToBeVisible(addToCartButton);
      await addToCartButton.click({ force: true, timeout });
      await page.waitForLoadState("load");
    });
  }
  static async openPDPWithToggle(page, toggle, url, testRunId2, merchantId, expectedEligibility = true, timeout = 6e4) {
    await test2.step(`Open ${url}`, async () => {
      let toggleLoadedTime = null;
      let startTime = (/* @__PURE__ */ new Date()).getTime();
      await page.goto(url, { timeout });
      if (expectedEligibility) {
        await WebTestUtils.centerMouse(page);
        await WebTestUtils.jigglePage(page);
        await WebTestUtils.waitForLocatorToBeVisible(
          toggle.toggle,
          1e4
        );
        toggleLoadedTime = (/* @__PURE__ */ new Date()).getTime();
      }
      await page.waitForLoadState("domcontentloaded");
      let domContentLoadedTime = (/* @__PURE__ */ new Date()).getTime();
      console.log(`DOM Loaded Time: ${domContentLoadedTime - startTime}`);
      await page.waitForLoadState("load");
      let pageLoadTime = (/* @__PURE__ */ new Date()).getTime();
      if (expectedEligibility) {
        const firstContentfulPaint = await page.evaluate(() => {
          const [fcp] = performance.getEntriesByType("paint").filter(
            (entry) => entry.name === "first-contentful-paint"
          );
          return fcp ? Math.round(fcp.startTime) : null;
        });
        if (firstContentfulPaint !== null) {
          if (toggleLoadedTime !== null) {
            let perceivedToggleLoadTime = toggleLoadedTime - startTime - firstContentfulPaint;
            let totalPageLoadTime = pageLoadTime - startTime;
            let loadPercentageTimeForToggle = perceivedToggleLoadTime / totalPageLoadTime * 100;
            if (process.env.CI && merchantId != "0") {
              await EventsClient.postPerformanceMeasurement(
                url,
                testRunId2,
                firstContentfulPaint,
                totalPageLoadTime,
                perceivedToggleLoadTime,
                Math.round(loadPercentageTimeForToggle),
                startTime,
                merchantId,
                "TOGGLE" /* TOGGLE */
              );
            } else {
              console.log(
                `Time to First Contentful Paint: ${firstContentfulPaint} ms`
              );
              console.log(
                `Time from FCP to Croissant Toggle Visible: ${perceivedToggleLoadTime} ms`
              );
              console.log(
                `Total page load time: ${totalPageLoadTime} ms`
              );
              console.log(
                `Percentage time for Croissant Toggle relative to total page load time from FCP: ${loadPercentageTimeForToggle.toFixed(
                  2
                )}%`
              );
            }
          } else {
            console.log("Toggle not found");
          }
        } else {
          console.log("First Contentful Paint entry not found");
        }
      }
    });
  }
  static async openPDPWithBadge(page, badge, url, testRunId2, merchantId, expectedEligibility = true, timeout = 6e4) {
    await test2.step(`Open ${url}`, async () => {
      let badgeLoadedTime = null;
      let startTime = (/* @__PURE__ */ new Date()).getTime();
      await page.goto(url, { timeout });
      if (expectedEligibility) {
        await WebTestUtils.centerMouse(page);
        await WebTestUtils.jigglePage(page);
        await WebTestUtils.waitForLocatorToBeVisible(
          badge.badge,
          1e4
        );
        badgeLoadedTime = (/* @__PURE__ */ new Date()).getTime();
      }
      await page.waitForLoadState("domcontentloaded");
      let domContentLoadedTime = (/* @__PURE__ */ new Date()).getTime();
      console.log(`DOM Loaded Time: ${domContentLoadedTime - startTime}`);
      await page.waitForLoadState("load");
      let pageLoadTime = (/* @__PURE__ */ new Date()).getTime();
      if (expectedEligibility) {
        const firstContentfulPaint = await page.evaluate(() => {
          const [fcp] = performance.getEntriesByType("paint").filter(
            (entry) => entry.name === "first-contentful-paint"
          );
          return fcp ? Math.round(fcp.startTime) : null;
        });
        if (firstContentfulPaint !== null) {
          if (badgeLoadedTime !== null) {
            let perceivedBadgeLoadTime = badgeLoadedTime - startTime - firstContentfulPaint;
            let totalPageLoadTime = pageLoadTime - startTime;
            let loadPercentageTimeForBadge = perceivedBadgeLoadTime / totalPageLoadTime * 100;
            if (process.env.CI && merchantId != "0") {
              await EventsClient.postPerformanceMeasurement(
                url,
                testRunId2,
                firstContentfulPaint,
                totalPageLoadTime,
                perceivedBadgeLoadTime,
                Math.round(loadPercentageTimeForBadge),
                startTime,
                merchantId,
                "BADGE" /* BADGE */
              );
            } else {
              console.log(
                `Time to First Contentful Paint: ${firstContentfulPaint} ms`
              );
              console.log(
                `Time from FCP to Croissant Badge Visible: ${perceivedBadgeLoadTime} ms`
              );
              console.log(
                `Total page load time: ${totalPageLoadTime} ms`
              );
              console.log(
                `Percentage time for Croissant Badge relative to total page load time from FCP: ${loadPercentageTimeForBadge.toFixed(
                  2
                )}%`
              );
            }
          } else {
            console.log("Badge not found");
          }
        } else {
          console.log("First Contentful Paint entry not found");
        }
      }
    });
  }
  static async closeOverlay(overlayDeclineButton) {
    return await test2.step("Close overlay", async () => {
      try {
        let overlayFound = await WebTestUtils.waitForLocatorToBeVisible(
          overlayDeclineButton
        );
        if (overlayFound) {
          await overlayDeclineButton.click({ timeout: 2e3 });
        }
        return true;
      } catch (error) {
        return false;
      }
    });
  }
  static async validateCroissantOptInLocalStorage(page, expectedValue) {
    await test2.step(`Validate Croissant Opt In Local Storage`, async () => {
      let optInValue = await page.evaluate(
        () => window.localStorage.getItem("croissant_opt_in")
      );
      expect3(optInValue).toBe(expectedValue);
    });
  }
  static sentFiles = /* @__PURE__ */ new Set();
  static messageTimestamp;
  static imageNumber = 1;
  static async compareElementToBaseline(element, maskLocators = []) {
    await test2.step("Capture element screenshot.", async () => {
      await element.screenshot({
        path: process.env.BASE_PATH + `/${this.imageNumber}.png`
      });
      this.imageNumber++;
    });
    if (process.env.SCREENSHOT_COMPARE === "true") {
      await test2.step("Compare element screenshot to baseline.", async () => {
        try {
          await VisualUtils.compareElementToBaseLineImage(
            element,
            maskLocators
          );
        } catch (e) {
          console.log(
            "Error comparing element to baseline:",
            e.message
          );
        }
      });
    }
  }
  static async findMonitorImages(directoryPath) {
    const monitorImages = [];
    const files = await fs.promises.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        const subdirectoryImages = await _MerchantTestUtils.findMonitorImages(filePath);
        monitorImages.push(...subdirectoryImages);
      } else if (file.endsWith(".png") && file.includes("Monitor")) {
        const relativePath = path.relative("screenshots", filePath);
        monitorImages.push(relativePath);
      }
    }
    return monitorImages;
  }
  static async isWithinTimeFrame() {
    const currentDate = /* @__PURE__ */ new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const adjustedHour = currentHour - 4;
    if (adjustedHour === 11 && currentMinutes >= 45) {
      return true;
    } else if (adjustedHour === 12 && currentMinutes <= 15) {
      return true;
    } else {
      return false;
    }
  }
};

// merchant/utils/utils.ts
var monitorProductBadgeOnly = async function(page, merchantConfig, ProductPageClass, testRunId2, options = {}) {
  const { maskLocators = [] } = options;
  test.setTimeout(18e4);
  let pricingResponse;
  await page.setViewportSize({
    width: 1920,
    height: 1080
  });
  page.on("response", (r) => {
    if (r.url().includes(merchantConfig.pricingUrl)) {
      pricingResponse = r;
    }
  });
  const productPage = new ProductPageClass(page);
  const eligibleUrls = [...merchantConfig.eligibleItemLocations];
  let success = false;
  for (const location of eligibleUrls) {
    try {
      await test.step("Open PDP", async () => {
        await productPage.open(location, testRunId2);
      });
      await test.step("Validate Badge", async () => {
        await WebTestUtils.waitForLocatorToBeVisible(
          productPage.buybackBadge.badge
        );
        let resalePriceDollars = await MerchantTestUtils.parsePricingResponse(
          pricingResponse,
          merchantConfig.storeCredit
        );
        await productPage.buybackBadge.validateBadge(
          resalePriceDollars,
          merchantConfig.storeCredit,
          merchantConfig.autoOptIn,
          true,
          maskLocators
        );
      });
      if (productPage.buybackBadgeSecondary) {
        await test.step("Validate Secondary Badge", async () => {
          await WebTestUtils.waitForLocatorToBeVisible(
            productPage.buybackBadgeSecondary.badge
          );
          let resalePriceDollars = await MerchantTestUtils.parsePricingResponse(
            pricingResponse,
            merchantConfig.storeCredit
          );
          await productPage.buybackBadgeSecondary.validateBadge(
            resalePriceDollars,
            merchantConfig.storeCredit,
            merchantConfig.autoOptIn,
            true,
            false,
            maskLocators
          );
        });
      }
      success = true;
      break;
    } catch (error) {
      console.log(
        `Failed to validate PDP for ${location}. Error: ${error}`
      );
    }
  }
  if (!success) {
    throw "All eligible URLs failed. Test could not be completed.";
  }
};

// merchant/components/croissant.buyback.badge.ts
import { test as test5 } from "@playwright/test";

// merchant/components/croissant.info.modal.ts
import { expect as expect5, test as test4 } from "@playwright/test";

// merchant/components/croissant.toggle.toast.ts
import { test as test3, expect as expect4 } from "@playwright/test";
var CroissantToggleToast = class {
  page;
  icon;
  toast;
  constructor(page) {
    this.page = page;
    this.toast = this.page.locator("output#croissant-toast-output");
    this.icon = this.toast.locator("img");
  }
  async validateOptInStatus(toggleStatus) {
    await test3.step("Validate Croissant Opt In Status", async () => {
      await WebTestUtils.waitForLocatorToBeVisible(this.toast);
      if (toggleStatus) {
        await WebTestUtils.waitForLocatorToContainText(
          this.toast,
          "Successfully opted into Croissant!"
        );
        const imgSrc = await this.icon.getAttribute("src");
        expect4(imgSrc).toBe(
          "https://cdn.croissant.com/merchant-components/icons/icon-checkmark-in-circle.svg"
        );
        await MerchantTestUtils.validateCroissantOptInLocalStorage(
          this.page,
          "true"
        );
      } else {
        await WebTestUtils.waitForLocatorToContainText(
          this.toast,
          "You are opted out of Croissant!"
        );
        const imgSrc = await this.icon.getAttribute("src");
        expect4(imgSrc).toBe(
          "https://cdn.croissant.com/merchant-components/icons/icon-close-white.svg"
        );
        await MerchantTestUtils.validateCroissantOptInLocalStorage(
          this.page,
          "false"
        );
      }
    });
  }
};

// merchant/components/croissant.info.modal.ts
var CroissantInfoModal = class {
  infoModal;
  infoModalCloseIcon;
  infoModalContent;
  infoModalFooter;
  infoModalFooterLinks;
  infoModalSubtitle;
  infoModalToggle;
  infoModalToggleText;
  infoModalToggleToast;
  page;
  constructor(page) {
    this.page = page;
    this.infoModal = page.locator("div#croissant-modal");
    this.infoModalCloseIcon = this.infoModal.locator(
      "button#modal-close-btn"
    );
    this.infoModalContent = this.infoModal.locator(
      "ul.croissant-modal-content"
    );
    this.infoModalFooter = this.infoModal.locator(
      "div.croissant-modal-footer"
    );
    this.infoModalFooterLinks = this.infoModal.locator(
      "div.croissant-modal-footer__links"
    );
    this.infoModalSubtitle = this.infoModal.locator(
      "div.croissant-modal-subtitle"
    );
    this.infoModalToggle = this.infoModal.locator(
      'button[data-testid="toggle-modal-button"]'
    );
    this.infoModalToggleText = this.infoModal.locator(
      "span.croissant-modal-toggle__text"
    );
    this.infoModalToggleToast = new CroissantToggleToast(page);
  }
  //
  // NEEDED : ids or better locators for info modal elements
  //
  async clickSlider(toggleState, timeout = 15e3) {
    await test4.step(`Click Croissant toggle`, async () => {
      await WebTestUtils.waitForLocatorToBeVisible(this.infoModalToggle);
      await WebTestUtils.waitForLocatorToContainText(
        this.infoModalToggleText,
        "Opt-In To Guaranteed Buybacks Sitewide"
      );
      await this.infoModalToggle.click({
        timeout,
        force: true
      });
    });
    return !toggleState;
  }
  async validateInfoModalToggle(toggleState = false) {
    await WebTestUtils.waitForLocatorToBeVisible(this.infoModalToggle);
    toggleState = await this.clickSlider(toggleState);
    await this.infoModalToggleToast.validateOptInStatus(toggleState);
    expect5(await this.infoModalToggle.getAttribute("aria-pressed")).toBe(
      toggleState.toString()
    );
    await this.clickSlider(toggleState);
  }
  async validateInfoModal(toggleState = false, storeCredit) {
    await test4.step("Validate Info Modal", async () => {
      await WebTestUtils.waitForLocatorToBeVisible(this.infoModal, 2e4);
      await MerchantTestUtils.compareElementToBaseline(this.infoModal);
      await WebTestUtils.validateLocatorLink(
        this.infoModalSubtitle,
        "https://croissant.com/"
      );
      await this.validateInfoModalToggle(toggleState);
      await expect5(
        this.infoModalFooterLinks.locator("a").nth(0)
      ).toHaveAttribute(
        "href",
        "https://croissant.com/terms-and-conditions"
      );
      await expect5(
        this.infoModalFooterLinks.locator("a").nth(1)
      ).toHaveAttribute("href", "https://croissant.com/privacy-policy");
      await this.infoModalCloseIcon.click({ force: true });
      await WebTestUtils.waitForLocatorToBeHidden(this.infoModal);
    });
  }
};

// merchant/components/croissant.buyback.badge.ts
var CroissantBuybackBadge = class {
  page;
  container;
  badge;
  badgeText;
  infoIcon;
  constructor(page, container, badgeSelector) {
    this.page = page;
    this.container = container;
    this.badge = this.container.locator(badgeSelector);
    this.badgeText = this.container.locator(
      ".croissant-buyback-badge__text.croissant-buyback-badge__text--optedOutGray"
    );
    this.infoIcon = this.badge.locator("span.croissant-text-button").filter({ hasText: /^Learn More$/ }) ?? "";
  }
  async validateBadgeText(resalePriceDollars) {
    await WebTestUtils.waitForLocatorToContainText(
      this.badgeText,
      `$${resalePriceDollars.toLocaleString("en-US")} Eligible Buyback`
    );
  }
  async validateBadge(resalePriceDollars, storeCredit, toggleState = false, eligible = true, mainBadge = true, maskLocators = []) {
    await test5.step(`Validate Croissant Badge`, async () => {
      if (eligible) {
        await WebTestUtils.waitForLocatorToBeVisible(this.badge, 2e4);
        await this.validateBadgeText(resalePriceDollars);
        if (mainBadge) {
          await WebTestUtils.waitForLocatorToBeVisible(this.infoIcon);
          await MerchantTestUtils.compareElementToBaseline(
            this.badge,
            maskLocators
          );
          await this.badge.locator("span.croissant-text-button").click({ force: true, timeout: 1e4 });
          let infoModal = new CroissantInfoModal(this.page);
          await infoModal.validateInfoModal(toggleState, storeCredit);
        } else {
          await MerchantTestUtils.compareElementToBaseline(
            this.badge
          );
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1e4));
        await WebTestUtils.waitForLocatorToBeHidden(this.badge);
      }
    });
  }
};

// merchant/pages/clear.weather.product.page.ts
var ClearWeatherProductPage = class {
  addToCartButton;
  buybackBadge;
  cartButton;
  page;
  variants;
  variantsList;
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator("button.btn--outline.btn--full.btn--primary.btn--add-to-cart");
    this.buybackBadge = new CroissantBuybackBadge(
      this.page,
      this.page.locator("div.product__price__wrap"),
      "croissant-buyback-badge" /* BUYBACK */
    );
    this.cartButton = page.locator("div.header__desktop__button ");
    this.variantsList = page.locator("div.select-popout");
    this.variants = this.variantsList.locator("li");
  }
  async open(location, testRunId2, expectedEligibility = true) {
    const url = `${config_default.clearweather.url}/${location}`;
    await MerchantTestUtils.openPDPWithBadge(
      this.page,
      this.buybackBadge,
      url,
      testRunId2,
      config_default.clearweather.merchantId,
      expectedEligibility
    );
  }
  async addToCart() {
    await MerchantTestUtils.addToCart(this.page, this.addToCartButton);
  }
};

// merchant/monitors/clear.weather/clear.weather.monitor.test.ts
process.env.TARGET_ENVIRONMENT = "Production";
process.env.SCREENSHOT_COMPARE = "true";
var testRunId;
test.beforeAll(async () => {
  testRunId = process.env.CI ? uuidv4() : "local";
});
test("Clearweather Monitor", async ({ page }) => {
  await monitorProductBadgeOnly(
    page,
    config_default.clearweather,
    ClearWeatherProductPage,
    testRunId,
    {
      maskLocators: [
        'span[style*="font-weight: bold;"]:first-child'
      ]
    }
  );
});

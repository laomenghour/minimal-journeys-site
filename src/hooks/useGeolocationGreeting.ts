import { useState, useEffect } from "react";

interface GreetingInfo {
  greeting: string;
  language: string;
  rtl: boolean;
}

const greetings: Record<string, GreetingInfo> = {
  // English-speaking
  US: { greeting: "Hello",        language: "English",    rtl: false },
  GB: { greeting: "Hello",        language: "English",    rtl: false },
  AU: { greeting: "Hello",        language: "English",    rtl: false },
  CA: { greeting: "Hello",        language: "English",    rtl: false },
  NZ: { greeting: "Hello",        language: "English",    rtl: false },
  // Spanish
  ES: { greeting: "Hola",         language: "Spanish",    rtl: false },
  MX: { greeting: "Hola",         language: "Spanish",    rtl: false },
  AR: { greeting: "Hola",         language: "Spanish",    rtl: false },
  CO: { greeting: "Hola",         language: "Spanish",    rtl: false },
  PE: { greeting: "Hola",         language: "Spanish",    rtl: false },
  CL: { greeting: "Hola",         language: "Spanish",    rtl: false },
  // French
  FR: { greeting: "Bonjour",      language: "French",     rtl: false },
  BE: { greeting: "Bonjour",      language: "French",     rtl: false },
  CH: { greeting: "Bonjour",      language: "French",     rtl: false },
  // German
  DE: { greeting: "Hallo",        language: "German",     rtl: false },
  AT: { greeting: "Hallo",        language: "German",     rtl: false },
  // Italian
  IT: { greeting: "Ciao",         language: "Italian",    rtl: false },
  // Portuguese
  PT: { greeting: "Olá",          language: "Portuguese", rtl: false },
  BR: { greeting: "Olá",          language: "Portuguese", rtl: false },
  // Japanese
  JP: { greeting: "こんにちは",    language: "Japanese",   rtl: false },
  // Chinese
  CN: { greeting: "你好",          language: "Chinese",    rtl: false },
  TW: { greeting: "你好",          language: "Chinese",    rtl: false },
  HK: { greeting: "你好",          language: "Chinese",    rtl: false },
  SG: { greeting: "你好",          language: "Chinese",    rtl: false },
  // Korean
  KR: { greeting: "안녕하세요",    language: "Korean",     rtl: false },
  // Southeast Asian
  TH: { greeting: "สวัสดี",        language: "Thai",       rtl: false },
  VN: { greeting: "Xin chào",     language: "Vietnamese", rtl: false },
  KH: { greeting: "សួស្តី",        language: "Khmer",      rtl: false },
  ID: { greeting: "Halo",         language: "Indonesian", rtl: false },
  MY: { greeting: "Halo",         language: "Malay",      rtl: false },
  PH: { greeting: "Kumusta",      language: "Filipino",   rtl: false },
  MM: { greeting: "မင်္ဂလာပါ",    language: "Burmese",    rtl: false },
  LA: { greeting: "ສະບາຍດີ",      language: "Lao",        rtl: false },
  // South Asian
  IN: { greeting: "नमस्ते",        language: "Hindi",      rtl: false },
  PK: { greeting: "آداب",         language: "Urdu",       rtl: true  },
  BD: { greeting: "নমস্কার",       language: "Bengali",    rtl: false },
  LK: { greeting: "ආයුබෝවන්",      language: "Sinhala",    rtl: false },
  // Arabic
  SA: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  AE: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  EG: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  MA: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  IQ: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  JO: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  KW: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  QA: { greeting: "مرحبا",        language: "Arabic",     rtl: true  },
  // Russian / Eastern European
  RU: { greeting: "Привет",       language: "Russian",    rtl: false },
  UA: { greeting: "Привіт",       language: "Ukrainian",  rtl: false },
  BY: { greeting: "Прывітанне",   language: "Belarusian", rtl: false },
  // European
  NL: { greeting: "Hallo",        language: "Dutch",      rtl: false },
  SE: { greeting: "Hej",          language: "Swedish",    rtl: false },
  NO: { greeting: "Hei",          language: "Norwegian",  rtl: false },
  DK: { greeting: "Hej",          language: "Danish",     rtl: false },
  FI: { greeting: "Hei",          language: "Finnish",    rtl: false },
  PL: { greeting: "Cześć",        language: "Polish",     rtl: false },
  CZ: { greeting: "Ahoj",         language: "Czech",      rtl: false },
  HU: { greeting: "Szia",         language: "Hungarian",  rtl: false },
  RO: { greeting: "Salut",        language: "Romanian",   rtl: false },
  GR: { greeting: "Γεια σας",     language: "Greek",      rtl: false },
  TR: { greeting: "Merhaba",      language: "Turkish",    rtl: false },
  // Hebrew
  IL: { greeting: "שלום",         language: "Hebrew",     rtl: true  },
  // African
  NG: { greeting: "Ndewo",        language: "Igbo",       rtl: false },
  KE: { greeting: "Jambo",        language: "Swahili",    rtl: false },
  ZA: { greeting: "Sawubona",     language: "Zulu",       rtl: false },
  ET: { greeting: "ሰላም",          language: "Amharic",    rtl: false },
};

const DEFAULT: GreetingInfo = { greeting: "Hello", language: "English", rtl: false };

export interface GeolocationGreeting extends GreetingInfo {
  country: string;
  loading: boolean;
}

export function useGeolocationGreeting(): GeolocationGreeting {
  const [state, setState] = useState<GeolocationGreeting>({
    ...DEFAULT,
    country: "",
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://ipapi.co/json/", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("geo fetch failed");
        return res.json();
      })
      .then((data) => {
        if (typeof data !== "object" || data === null) throw new Error("invalid response");
        const code = typeof data.country_code === "string"
          ? data.country_code.replace(/[^A-Z]/g, "").slice(0, 2)
          : "";
        const country = typeof data.country_name === "string"
          ? data.country_name.replace(/[<>"'&]/g, "").slice(0, 60)
          : "";
        const info = greetings[code] ?? DEFAULT;
        setState({ ...info, country, loading: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ ...DEFAULT, country: "", loading: false });
        }
      });

    return () => controller.abort();
  }, []);

  return state;
}

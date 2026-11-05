import { SampleArticle } from '../types';

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'kerala-rain-alert',
    title: 'Kerala Monsoon Yellow Alert (Malayalam)',
    language: 'malayalam',
    category: 'Kerala',
    imageUrl: 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Heavy monsoon showers lashed several parts of Kochi and Central Kerala on Thursday.',
    text: `സംസ്ഥാനത്ത് വരും ദിവസങ്ങളിൽ ശക്തമായ മഴയ്ക്ക് സാധ്യതയെന്ന് കാലാവസ്ഥാ വകുപ്പ്. വിവിധ ജില്ലകളിൽ യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു.

തെക്കുകിഴക്കൻ അറബിക്കടലിൽ രൂപംകൊണ്ട ന്യൂനമർദ്ദത്തിന്റെ ഫലമായി കേരളത്തിൽ അടുത്ത നാല് ദിവസം ഇടിമിന്നലോടു കൂടിയ കനത്ത മഴ പെയ്യുമെന്നാണ് കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ് (IMD) മുന്നറിയിപ്പ് നൽകിയിരിക്കുന്നത്. ഇടുക്കി, വയനാട്, കോഴിക്കോട്, പത്തനംതിട്ട ജില്ലകളിലാണ് യെല്ലോ അലർട്ട് പുറപ്പെടുവിച്ചിട്ടുള്ളത്.

തീരദേശ മേഖലകളിൽ മണിക്കൂറിൽ 45 മുതൽ 55 കിലോമീറ്റർ വരെ വേഗതയിൽ ശക്തമായ കാറ്റിന് സാധ്യതയുള്ളതിനാൽ മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുതെന്ന് ദുരന്തനിവാരണ അതോറിറ്റി (SDMA) നിർദ്ദേശിച്ചു. നദീതീരങ്ങളിലും മലയോര മേഖലകളിലും താമസിക്കുന്നവർ അതീവ ജാഗ്രത പാലിക്കണമെന്ന് സംസ്ഥാന സർക്കാർ അറിയിച്ചു.`,
    expectedResult: {
      malayalam: {
        headline: 'സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത',
        summary: 'കാലാവസ്ഥാ വകുപ്പ് വിവിധ ജില്ലകളിൽ യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു. മലയോര, തീരദേശ മേഖലകളിൽ ജാഗ്രതാ നിർദ്ദേശം നൽകി.',
        article: `സംസ്ഥാനത്ത് വരും ദിവസങ്ങളിൽ ശക്തമായ മഴയ്ക്ക് സാധ്യതയെന്ന് കാലാവസ്ഥാ വകുപ്പ് അറിയിച്ചു. വിവിധ ജില്ലകളിൽ കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ് യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു.\n\nതെക്കുകിഴക്കൻ അറബിക്കടലിൽ രൂപംകൊണ്ട ന്യൂനമർദ്ദത്തിന്റെ ഫലമായി കേരളത്തിൽ അടുത്ത നാല് ദിവസം ഇടിമിന്നലോടു കൂടിയ കനത്ത മഴ പെയ്യുമെന്നാണ് മുന്നറിയിപ്പ്. ഇടുക്കി, വയനാട്, കോഴിക്കോട്, പത്തനംതിട്ട ജില്ലകളിലാണ് യെല്ലോ അലർട്ട് പുറപ്പെടുവിച്ചിട്ടുള്ളത്.\n\nതീരദേശ മേഖലകളിൽ കാറ്റിന് സാധ്യതയുള്ളതിനാൽ മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുതെന്ന് ദുരന്തനിവാരണ അതോറിറ്റി നിർദ്ദേശിച്ചു.`
      },
      english: {
        headline: 'Heavy Rain Likely in Kerala Soon: Yellow Alert Issued',
        summary: 'The India Meteorological Department (IMD) has issued a yellow alert across multiple districts of Kerala anticipating heavy rainfall.',
        article: `Heavy rainfall accompanied by thunderstorms is very likely to lash Kerala over the next four days due to a low-pressure area over the southeastern Arabian Sea, according to the India Meteorological Department (IMD).\n\nA yellow alert has been sounded for Idukki, Wayanad, Kozhikode, and Pathanamthitta districts.\n\nThe State Disaster Management Authority (SDMA) has warned fishermen not to venture into sea as squally winds reaching speeds of 45 to 55 kmph are expected along the Kerala coast. Residents in hilly and riverine areas have been advised to remain on high alert.`
      },
      entities: {
        people: ['K. Santhosh (IMD Director)', 'Pinarayi Vijayan (Chief Minister)'],
        places: ['Kerala', 'Idukki', 'Wayanad', 'Kozhikode', 'Pathanamthitta', 'Arabian Sea'],
        organisations: ['IMD (India Meteorological Department)', 'SDMA (State Disaster Management Authority)']
      },
      keywords: ['Rain', 'Kerala', 'Yellow Alert', 'Weather', 'Monsoon', 'IMD', 'Disaster Management']
    }
  },
  {
    id: 'kochi-water-metro',
    title: 'Kochi Water Metro Fleet Expansion (English)',
    language: 'english',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Electric hybrid ferry operating along the scenic backwaters of Kochi.',
    text: `Kochi Water Metro has expanded its operations by inducting five new state-of-the-art electric-hybrid boats into its passenger fleet.

The battery-powered eco-friendly catamarans, built by Cochin Shipyard Limited for Kochi Metro Rail Limited (KMRL), will connect prime island terminals including Vypeen, Bolgatty, and Fort Kochi. KMRL Managing Director Loknath Behera announced that the expanded fleet will dramatically cut down waiting times for daily island commuters and tourists.

Chief Minister Pinarayi Vijayan lauded the initiative as a pioneering green mobility benchmark for urban water transport across India, reinforcing Kerala's commitment to sustainable public infrastructure.`,
    expectedResult: {
      english: {
        headline: 'Kochi Water Metro Expands Fleet with 5 New Electric Boats',
        summary: 'Kochi Water Metro has inducted five new battery-powered hybrid catamarans to enhance passenger connectivity across urban island corridors.',
        article: `Kochi Water Metro has expanded its operations by inducting five new state-of-the-art electric-hybrid boats into its passenger fleet.\n\nThe battery-powered eco-friendly catamarans, built by Cochin Shipyard Limited for Kochi Metro Rail Limited (KMRL), will connect prime island terminals including Vypeen, Bolgatty, and Fort Kochi. KMRL Managing Director Loknath Behera announced that the expanded fleet will dramatically cut down waiting times for daily island commuters and tourists.\n\nChief Minister Pinarayi Vijayan lauded the initiative as a pioneering green mobility benchmark for urban water transport across India.`
      },
      malayalam: {
        headline: 'കൊച്ചി വാട്ടർ മെട്രോയ്ക്ക് 5 പുതിയ ഇലക്ട്രിക് ബോട്ടുകൾ കൂടി',
        summary: 'ദ്വീപ് നിവാസികളുടെ യാത്രാസൗകര്യം വർദ്ധിപ്പിക്കാൻ കൊച്ചി വാട്ടർ മെട്രോ അഞ്ച് പുതിയ ഹൈബ്രിഡ് ബോട്ടുകൾ സർവീസിനായി നിരത്തിലിറക്കി.',
        article: `കൊച്ചി വാട്ടർ മെട്രോ തങ്ങളുടെ സർവീസുകൾ വിപുലീകരിക്കുന്നതിന്റെ ഭാഗമായി അത്യാധുനികമായ അഞ്ച് പുതിയ ഇലക്ട്രിക് ഹൈബ്രിഡ് ബോട്ടുകൾ കൂടി നിരത്തിലിറക്കി.\n\nകൊച്ചിൻ ഷിപ്പ്‌യാർഡ് നിർമ്മിച്ച പരിസ്ഥിതി സൗഹൃദ ബോട്ടുകൾ വൈപ്പിൻ, ബോൾഗാട്ടി, ഫോർട്ട് കൊച്ചി എന്നീ ടെർമിനലുകളെ ബന്ധിപ്പിക്കും. പുതിയ ബോട്ടുകൾ എത്തിയതോടെ യാത്രാ ക്ലേശത്തിന് വലിയ പരിഹാരമാകുമെന്ന് കെഎംആർഎൽ മാനേജിംഗ് ഡയറക്ടർ ലോക്നാഥ് ബെഹ്റ അറിയിച്ചു.\n\nപൊതുഗതാഗത മേഖലയിലെ കേരളത്തിന്റെ സുസ്ഥിര വികസന മാതൃകയാണിതെന്ന് മുഖ്യമന്ത്രി പിണറായി വിജയൻ പ്രശംസിച്ചു.`
      },
      entities: {
        people: ['Loknath Behera (KMRL MD)', 'Pinarayi Vijayan (Chief Minister)'],
        places: ['Kochi', 'Vypeen', 'Bolgatty', 'Fort Kochi', 'Kerala'],
        organisations: ['KMRL (Kochi Metro Rail Limited)', 'Cochin Shipyard Limited']
      },
      keywords: ['Water Metro', 'Kochi', 'Electric Boats', 'Green Mobility', 'KMRL', 'Public Transport']
    }
  },
  {
    id: 'isro-gaganyaan-space',
    title: 'ISRO Gaganyaan Mission Progress (English)',
    language: 'english',
    category: 'National / Science',
    imageUrl: 'https://images.unsplash.com/photo-1517976487502-5731c30e1049?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Rocket launch test vehicle preparing for integrated flight qualification.',
    text: `The Indian Space Research Organisation (ISRO) has completed integrated parachute and crew escape simulation tests for the ambitious Gaganyaan human spaceflight mission at Sriharikota.

ISRO Chairman S. Somanath confirmed that the human-rated launch vehicle systems have met safety parameters. The mission aims to send a three-member Indian crew into a 400-kilometer orbit for a three-day mission before safely returning them via splashdown in the Arabian Sea. The final uncrewed test flights carrying humanoid robot Vyommitra are slated to launch later this year.`,
    expectedResult: {
      english: {
        headline: 'ISRO Completes Critical Safety Tests for Gaganyaan Mission',
        summary: 'ISRO has successfully achieved vital crew escape and parachute simulation benchmarks ahead of India’s first human spaceflight.',
        article: `The Indian Space Research Organisation (ISRO) has completed integrated parachute and crew escape simulation tests for the ambitious Gaganyaan human spaceflight mission at Sriharikota.\n\nISRO Chairman S. Somanath confirmed that the human-rated launch vehicle systems have met safety parameters. The mission aims to send a three-member Indian crew into a 400-kilometer orbit for a three-day mission before safely returning them via splashdown in the Arabian Sea. The final uncrewed test flights carrying humanoid robot Vyommitra are slated to launch later this year.`
      },
      malayalam: {
        headline: 'ഗഗൻയാൻ നിർണായക പരീക്ഷണങ്ങൾ വിജയകരമായി പൂർത്തിയാക്കി ഐഎസ്ആർഒ',
        summary: 'ഇന്ത്യയുടെ പ്രഥമ മനുഷ്യ ബഹിരാകാശ ദൗത്യമായ ഗഗൻയാന്റെ സുരക്ഷാ പരീക്ഷണങ്ങൾ ശ്രീഹരിക്കോട്ടയിൽ വിജയകരമായി പൂർത്തിയായി.',
        article: `ഇന്ത്യയുടെ അഭിമാനകരമായ പ്രഥമ മനുഷ്യ ബഹിരാകാശ ദൗത്യമായ ഗഗൻയാന്റെ ക്രൂ എസ്കേപ്പ്, പാരഷൂട്ട് പരീക്ഷണങ്ങൾ ഐഎസ്ആർഒ ശ്രീഹരിക്കോട്ടയിൽ വിജയകരമായി പൂർത്തിയാക്കി.\n\nറോക്കറ്റ് സുരക്ഷാ മാനദണ്ഡങ്ങൾ പൂർണ്ണമായും തൃപ്തികരമാണെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് വ്യക്തമാക്കി. മൂന്ന് ബഹിരാകാശ സഞ്ചാരികളെ 400 കിലോമീറ്റർ ഭ്രമണപഥത്തിൽ എത്തിച്ച് മൂന്ന് ദിവസത്തിന് ശേഷം അറബിക്കടലിൽ സുരക്ഷിതമായി തിരിച്ചിറക്കുകയാണ് ലക്ഷ്യം. വ്യോമമിത്ര റോബോട്ടുമായുള്ള ആളില്ലാ ദൗത്യം ഈ വർഷം നടക്കും.`
      },
      entities: {
        people: ['S. Somanath (ISRO Chairman)', 'Vyommitra (Humanoid Robot)'],
        places: ['Sriharikota', 'Arabian Sea', 'India'],
        organisations: ['ISRO (Indian Space Research Organisation)']
      },
      keywords: ['ISRO', 'Gaganyaan', 'Space Mission', 'Sriharikota', 'Crew Escape', 'Science']
    }
  }
];

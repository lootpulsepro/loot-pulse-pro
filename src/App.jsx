import React from 'react';

// --- ICONS (from lucide-react) ---
// For single-file compatibility, we'll use inline SVG for icons.
const RefreshCw = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M3 21a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 16"/><path d="M3 16v5h5"/></svg>;
const Gift = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
const Star = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Bell = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const Sparkles = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
const ShoppingCart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>;
const AlertCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

// --- Animated Loading Icon ---
const AnimatedGiftIcon = (props) => {
    return (
        <>
            <style>{`
                @keyframes giftLid {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-3px) rotate(-5deg); }
                }
                @keyframes giftBow {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                .gift-lid { animation: giftLid 1.5s ease-in-out infinite; transform-origin: center; }
                .gift-bow { animation: giftBow 1.5s ease-in-out infinite; }
            `}</style>
            <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v10H4V12"/>
                <path className="gift-lid" d="M2 7h20v5H2z"/>
                <path d="M12 22V7"/>
                <path className="gift-bow" d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path className="gift-bow" d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
        </>
    );
};


// --- Monetization Architecture ---
const AFFILIATE_CONFIG = {
    cheapshark: 'YOUR_CHEAPSHARK_AFFILIATE_ID', 
    epicgames: 'KAISENAT',       
};

function monetizeUrl(rawUrl) {
    if (!rawUrl) return '#';
    try {
        const url = new URL(rawUrl);
        if (url.hostname.includes('cheapshark.com')) {
            url.searchParams.set('aid', AFFILIATE_CONFIG.cheapshark);
        } else if (url.hostname.includes('epicgames.com')) {
            url.searchParams.set('epic_creator_code', AFFILIATE_CONFIG.epicgames);
        }
        return url.toString();
    } catch (e) {
        console.error("Failed to monetize URL:", rawUrl, e);
        return rawUrl;
    }
}


// --- Core Hooks & Utils ---
const { useState, useEffect, forwardRef, createContext, useContext } = React;

function useLocalState(key, initial) {
    const [v, setV] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initial;
        } catch { return initial; }
    });
    useEffect(() => {
        try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    }, [key, v]);
    return [v, setV];
}

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
}

const COUNTRIES = [
  { code: "ALL", label: "All Regions", locale: "en-US" }, { code: "US", label: "United States", locale: "en-US" }, { code: "GB", label: "United Kingdom", locale: "en-GB" },
  { code: "DE", label: "Germany", locale: "de-DE" }, { code: "FR", label: "France", locale: "fr-FR" }, { code: "ES", label: "Spain", locale: "es-ES" },
  { code: "PL", label: "Poland", locale: "pl-PL" }, { code: "BR", label: "Brazil", locale: "pt-BR" }, { code: "RU", label: "Russia", locale: "ru-RU" },
];
const localeForCountry = (code) => COUNTRIES.find((c) => c.code === code)?.locale || "en-US";

const PLATFORM_TO_STORE_ID = {
    'steam': '1', 'gog': '7', 'epic-games-store': '25', 'uplay': '13', 'origin': '8', 'pc': '1,7,25,13,8',
};
const CONSOLE_PLATFORMS = ['ps4', 'ps5', 'xbox-one', 'xbox-series-xs', 'switch'];


async function fetchJSON(url) {
    const proxies = [
        { name: "Direct", buildUrl: (u) => u },
        { name: "AllOrigins", buildUrl: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}` },
        { name: "Jina.ai", buildUrl: (u) => `https://r.jina.ai/${u.replace(/^https?:\/\//, "")}` },
        { name: "CodeTabs", buildUrl: (u) => `https://api.codetabs.com/v1/proxy?quest=${u}` }
    ];

    for (const proxy of proxies) {
        try {
            const proxyUrl = proxy.buildUrl(url);
            const res = await fetch(proxyUrl, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
            
            const text = await res.text();
            if (!text) {
                 console.warn(`Proxy ${proxy.name} returned empty response for ${url}`);
                 continue;
            }
            
            const data = JSON.parse(text);

            if (proxy.name === 'AllOrigins' && data.contents) {
                return JSON.parse(data.contents);
            }
            return data;
        } catch (e) {
            console.warn(`Fetch attempt for ${url} using ${proxy.name} proxy failed:`, e.message);
        }
    }
    console.error(`All fetch attempts failed for ${url}.`);
    return null;
}

const matchesWatch = (text, terms) => {
    if (!terms || !terms.length) return false;
    const up = (text || "").toUpperCase();
    return terms.some((t) => up.includes(t.toUpperCase()));
};


// --- UI Component Library (Self-Contained) ---
const Card = ({ children, className = "", ...props }) => <div className={`border rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm ${className}`} {...props}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-4 border-b border-zinc-200 dark:border-zinc-700 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h2 className={`text-lg font-semibold tracking-tight ${className}`}>{children}</h2>;
const CardContent = ({ children, className = "" }) => <div className={`p-4 ${className}`}>{children}</div>;
const Button = forwardRef(({ children, asChild = false, variant = 'default', size = 'default', className = '', onClick, href, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
    const variantClasses = {
        default: "bg-blue-600 text-white hover:bg-blue-600/90",
        outline: "border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700",
        secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-200/80 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700/80",
    }[variant];
    const sizeClasses = { default: "h-10 py-2 px-4", sm: "h-9 px-3" }[size];
    
    const finalOnClick = href ? () => window.open(href, '_blank', 'noopener,noreferrer') : onClick;

    return <button ref={ref} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={finalOnClick} {...props}>{children}</button>;
});
const Input = forwardRef((props, ref) => <input ref={ref} className={`flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${props.className || ''}`} {...props} />);
const Badge = ({ children, variant = 'default', className = '', ...props }) => {
    const variantClasses = {
        default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        secondary: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
        highlight: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700",
    }[variant];
    return <div className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold ${variantClasses} ${className}`} {...props}>{children}</div>;
};
const Separator = (props) => <hr className="border-zinc-200 dark:border-zinc-700" {...props}/>;

const TabsContext = createContext(null);
const Tabs = ({ value, onValueChange, children, ...props }) => <TabsContext.Provider value={{ activeTab: value, onTabChange: onValueChange }}><div {...props}>{children}</div></TabsContext.Provider>;
const TabsList = ({ children, ...props }) => <div className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 p-1 text-zinc-500 dark:text-zinc-400" {...props}>{children}</div>;
const TabsTrigger = ({ value, children, ...props }) => {
    const { activeTab, onTabChange } = useContext(TabsContext);
    return <button onClick={() => onTabChange(value)} data-state={activeTab === value ? 'active' : 'inactive'} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 data-[state=active]:shadow-sm`} {...props}>{children}</button>;
};
const TabsContent = ({ value, children, ...props }) => {
    const { activeTab } = useContext(TabsContext);
    return <div className={`mt-4 ${activeTab === value ? 'block' : 'hidden'}`} {...props}>{children}</div>;
};

const CardSkeleton = () => <div className="border dark:border-zinc-700 rounded-lg overflow-hidden flex flex-col animate-pulse"><div className="w-full h-32 bg-zinc-200 dark:bg-zinc-700"></div><div className="p-3 flex flex-col flex-grow"><div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div><div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mt-2"></div><div className="mt-auto pt-2"><div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div></div></div></div>;
const Empty = ({ text }) => <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-center text-zinc-500">{text}</div>;
const ErrorMessage = ({ text }) => <div className="border-2 border-dashed border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl p-8 text-center text-red-600 dark:text-red-400 flex items-center justify-center gap-2"><AlertCircle className="w-5 h-5"/>{text}</div>;

const AdPlaceholder = ({ type = 'banner' }) => <div className="my-6"><div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 text-sm" style={{ height: type === 'banner' ? '90px' : '250px' }}>Monetized Ad Slot ({type})</div></div>;

// ============================================================
// Root App Component
// ============================================================
function App() {
    const [tab, setTab] = useLocalState("lp.tab", "free");
    const [watch, setWatch] = useLocalState("lp.watch", []);
    
    const [freeItems, setFreeItems] = useState({ data: [], loading: true, error: null });
    const [giveawayItems, setGiveawayItems] = useState({ data: [], loading: true, error: null });
    const [dealItems, setDealItems] = useState({ data: [], loading: true, error: null });

    const [storeNames, setStoreNames] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const arr = await fetchJSON("https://www.cheapshark.com/api/1.0/stores");
                if (Array.isArray(arr)) {
                    const map = {};
                    arr.forEach((s) => { if (s && s.storeID) map[String(s.storeID)] = s.storeName; });
                    setStoreNames(map);
                }
            } catch (error) { console.error("Failed to fetch store names:", error); }
        })();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-sans">
            <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Gift className="w-6 h-6 text-blue-600" />
                    <h1 className="font-bold text-xl">LootPulse <span className="font-light text-lg">Pro</span></h1>
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" variant="outline" title="Premium Feature: Coming Soon!"><Bell className="w-4 h-4 mr-1" /> Enable Alerts</Button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Tabs value={tab} onValueChange={setTab}>
                    <TabsList>
                        <TabsTrigger value="free"><Gift className="w-4 h-4 mr-1.5"/>Free Games</TabsTrigger>
                        <TabsTrigger value="giveaways"><Sparkles className="w-4 h-4 mr-1.5"/>Giveaways</TabsTrigger>
                        <TabsTrigger value="deals"><ShoppingCart className="w-4 h-4 mr-1.5"/>Deals</TabsTrigger>
                        <TabsTrigger value="watchlist"><Star className="w-4 h-4 mr-1.5"/>Watchlist</TabsTrigger>
                    </TabsList>
                    <TabsContent value="free"><FreeGames state={freeItems} setState={setFreeItems} watch={watch} /></TabsContent>
                    <TabsContent value="giveaways"><Giveaways state={giveawayItems} setState={setGiveawayItems} watch={watch} storeNames={storeNames} /></TabsContent>
                    <TabsContent value="deals"><Deals state={dealItems} setState={setDealItems} watch={watch} storeNames={storeNames} /></TabsContent>
                    <TabsContent value="watchlist"><Watchlist watch={watch} setWatch={setWatch} allItems={{ free: freeItems.data, giveaways: giveawayItems.data, deals: dealItems.data }} storeNames={storeNames} /></TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

// ============================================================
// Component: FREE GAMES
// ============================================================
function FreeGames({ state, setState, watch }) {
    const { data: items, loading: isLoading, error } = state;
    const [country, setCountry] = useLocalState("lp.country", "ALL");
    const [locale, setLocale] = useLocalState("lp.locale", "en-US");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const load = async () => {
            setState(s => ({...s, loading: true, error: null}));
            const allGames = new Map();

            const simplifyEpic = (e) => {
                if (!e) return null;
                const promo = e?.promotions?.promotionalOffers?.[0]?.promotionalOffers?.[0] || e?.promotions?.upcomingPromotionalOffers?.[0]?.promotionalOffers?.[0];
                if (!promo) return null;
                const slug = e.catalogNs?.mappings?.[0]?.pageSlug || e.productSlug || e.urlSlug || e.title?.replace(/\s+/g, "-");
                if (!slug) return null;
                return {
                    id: e.id, title: e.title,
                    image: (e?.keyImages || []).find(k => /OfferImageWide|DieselStoreFrontWide/.test(k.type))?.url || "",
                    end: promo.endDate,
                    activeNow: new Date(promo.startDate) <= new Date() && new Date(promo.endDate) > new Date(),
                    url: monetizeUrl(`https://store.epicgames.com/p/${slug}`), source: 'epic'
                };
            };
        
            try {
                const regionsToFetch = country === "ALL" ? ['US', 'GB', 'DE', 'RU'] : [country];
                const promises = regionsToFetch.map(region => 
                    fetchJSON(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=${region}&allowCountries=${region}&locale=en-US`)
                );
                const results = await Promise.allSettled(promises);

                results.forEach(result => {
                    if (result.status === 'fulfilled' && result.value?.data?.Catalog?.searchStore?.elements) {
                        result.value.data.Catalog.searchStore.elements.forEach(e => {
                            const simplified = simplifyEpic(e);
                            if (simplified) allGames.set(simplified.id, simplified);
                        });
                    }
                });

                let finalData = Array.from(allGames.values());
                if (finalData.length === 0) {
                    const freeCS = await fetchJSON("https://www.cheapshark.com/api/1.0/deals?upperPrice=0&pageSize=10");
                    if (Array.isArray(freeCS)) {
                        finalData = freeCS.map(d => ({
                            id: `csfree-${d.dealID}`, title: d.title, image: d.thumb, activeNow: true,
                            url: monetizeUrl(`https://www.cheapshark.com/redirect?dealID=${d.dealID}`), source: 'cs'
                        }));
                    } else {
                        throw new Error("All data sources for free games failed.");
                    }
                }
                
                setState({ data: finalData, loading: false, error: null });
            } catch (e) {
                console.error("Free games fetch failed:", e);
                setState({ data: [], loading: false, error: e.message });
            }
        };
        load();
    }, [country, locale, setState, refreshTrigger]);
    
    const current = items.filter(x => x.activeNow);
    const upcoming = items.filter(x => !x.activeNow);

    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Gift className="w-5 h-5" /> Free This Week</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                    <label className="text-xs">Region</label>
                    <select className="border rounded px-2 py-1 bg-transparent dark:bg-zinc-800" value={country} onChange={e => { setCountry(e.target.value); setLocale(localeForCountry(e.target.value)); }}>
                        {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                    <Button size="sm" onClick={() => setRefreshTrigger(t => t + 1)} disabled={isLoading}>
                         {isLoading ? <AnimatedGiftIcon className="w-4 h-4 mr-1" /> : <Gift className="w-4 h-4 mr-1" />}
                         {isLoading ? "Loading..." : "Refresh"}
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : 
                     error ? <div className="col-span-full"><ErrorMessage text={error} /></div> : 
                     items.length === 0 ? <div className="col-span-full"><Empty text="No free games detected." /></div> : 
                     [...current, ...upcoming].map(item => <ItemCard key={item.id} item={item} watch={watch} />)}
                </div>
            </CardContent>
        </Card>
    );
}

function ItemCard({ item, watch }) {
    const isWatched = matchesWatch(item.title, watch);
    return (
        <div className={`border rounded-lg overflow-hidden flex flex-col group transition-all ${isWatched ? 'border-yellow-400 dark:border-yellow-600 ring-2 ring-yellow-200 dark:ring-yellow-800' : 'dark:border-zinc-700'}`}>
            <div className="relative">
                <img src={item.image || 'https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image'} alt={item.title} className="w-full h-32 object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image'}/>
                {isWatched && <Badge variant="highlight" className="absolute top-2 right-2"><Star className="w-3 h-3 mr-1"/>Watched</Badge>}
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-semibold truncate text-sm" title={item.title}>{item.title}</h3>
                {item.end && <div className="text-xs text-zinc-500 mt-0.5">{item.activeNow ? 'Ends' : 'Starts'} {new Date(item.end).toLocaleDateString()}</div>}
                <div className="mt-auto pt-2">
                    <Button size="sm" href={item.url} className="w-full">{item.activeNow ? "Claim Now" : "Preview"}</Button>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// Component: GIVEAWAYS
// ============================================================
function Giveaways({ state, setState, watch, storeNames }) {
    const { data: items, loading: isLoading, error } = state;
    const [platform, setPlatform] = useLocalState("lp.giveaway_platform", "all");
    const cacheKey = `lp.cached.giveaways.${platform}`;
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const load = async () => {
            setState(s => ({...s, loading: true, error: null}));
            const allGiveaways = new Map();
            let apiSucceeded = false; // Flag to track if any API call was successful

            const fetchAndProcess = async (plat) => {
                const data = await fetchJSON(`https://www.gamerpower.com/api/giveaways?platform=${plat}`);
                if (Array.isArray(data)) {
                    apiSucceeded = true; // Mark success even if the array is empty
                    data.forEach(item => allGiveaways.set(item.id, item));
                }
            };
            
            try {
                if (platform === 'all') {
                    const allPlatforms = ["pc","ps4","ps5","xbox-one","xbox-series-xs","switch","android","ios"];
                    await Promise.allSettled(allPlatforms.map(p => fetchAndProcess(p)));
                } else {
                    await fetchAndProcess(platform);
                }

                let list = Array.from(allGiveaways.values());

                if (list.length === 0 && !apiSucceeded) {
                     console.log("Primary giveaway source failed, attempting fallback...");
                     if(!CONSOLE_PLATFORMS.includes(platform)) {
                         let url = "https://www.cheapshark.com/api/1.0/deals?upperPrice=0.00&pageSize=20";
                         const storeId = PLATFORM_TO_STORE_ID[platform];
                         if(storeId) url += `&storeID=${storeId}`;
                         const deals = await fetchJSON(url);
                         if (Array.isArray(deals)) {
                              apiSucceeded = true;
                              list = deals.map(d => ({
                                 id: `cs-giveaway-${d.dealID}`, title: d.title,
                                 platforms: storeNames[d.storeID] || 'PC',
                                 open_giveaway_url: monetizeUrl(`https://www.cheapshark.com/redirect?dealID=${d.dealID}`),
                              }));
                         }
                     }
                }

                if (apiSucceeded) {
                    setState({ data: list, loading: false, error: null });
                    if (list.length > 0) localStorage.setItem(cacheKey, JSON.stringify(list));
                } else {
                    // This block now only runs if ALL live APIs truly fail
                    const cachedDataRaw = localStorage.getItem(cacheKey);
                    if (cachedDataRaw) {
                         setState({ data: JSON.parse(cachedDataRaw), loading: false, error: "Failed to get updates. Showing cached data." });
                    } else {
                        setState({ data: [], loading: false, error: "All data sources for giveaways failed. Please try again later." });
                    }
                }
            } catch (e) {
                console.error("Giveaways fetch failed:", e);
                setState({ data: [], loading: false, error: e.message });
            }
        };
        if (Object.keys(storeNames).length > 0) {
            load();
        }
    }, [platform, storeNames, setState, refreshTrigger]);
    
    const shown = watch.length > 0 ? items.filter(g => matchesWatch(g.title, watch)) : items;

    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Live Giveaways</CardTitle></CardHeader>
            <CardContent>
                 <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                    <label className="text-xs">Platform</label>
                    <select className="border rounded px-2 py-1 bg-transparent dark:bg-zinc-800" value={platform} onChange={e => setPlatform(e.target.value)}>
                        {["all","pc","steam","epic-games-store","gog","uplay","origin","ps4","ps5","xbox-one","xbox-series-xs","switch","android","ios"].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                     <Button size="sm" onClick={() => setRefreshTrigger(t => t + 1)} disabled={isLoading}>
                         {isLoading ? <AnimatedGiftIcon className="w-4 h-4 mr-1" /> : <Gift className="w-4 h-4 mr-1" />}
                         {isLoading ? "Loading..." : "Refresh"}
                    </Button>
                </div>
                {error && <div className="mb-4"><ErrorMessage text={error} /></div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(isLoading && items.length === 0) ? Array.from({length:3}).map((_,i)=><CardSkeleton key={i}/>) :
                     (!isLoading && items.length === 0 && !error) ? <div className="col-span-full"><Empty text="No giveaways found for this platform." /></div> :
                     shown.map(item => <GiveawayCard key={item.id} item={item} watch={watch} />)}
                </div>
            </CardContent>
        </Card>
    );
}

function GiveawayCard({ item, watch }) {
    const isWatched = matchesWatch(item.title, watch);
    const platformsText = Array.isArray(item.platforms) ? item.platforms.join(", ") : (item.platforms || "PC");
    return (
        <div className={`border rounded-lg p-3 flex flex-col ${isWatched ? 'border-yellow-400 dark:border-yellow-600' : 'dark:border-zinc-700'}`}>
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <div className="text-xs text-zinc-500 mb-2 flex items-center gap-2">
                Platforms: {platformsText}
                {isWatched && <Badge variant="highlight"><Star className="w-3 h-3 mr-1"/>Watched</Badge>}
            </div>
            <div className="mt-auto pt-2">
                <Button size="sm" href={monetizeUrl(item.open_giveaway_url)} className="w-full">Go to Giveaway</Button>
            </div>
        </div>
    );
}

// ============================================================
// Component: DEALS
// ============================================================
function Deals({ state, setState, watch, storeNames }) {
    const { data: items, loading: isLoading, error } = state;
    const [maxPrice, setMaxPrice] = useLocalState("lp.maxPrice", "15");
    const debouncedMaxPrice = useDebounce(maxPrice, 500);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    useEffect(() => {
        const load = async () => {
            setState(s => ({...s, loading: true, error: null}));
            try {
                const url = `https://www.cheapshark.com/api/1.0/deals?upperPrice=${debouncedMaxPrice}&pageSize=24&sortBy=Deal%20Rating`;
                const data = await fetchJSON(url);
                if (!Array.isArray(data)) throw new Error("Invalid response from Deals API.");
                setState({data: data, loading: false, error: null});
            } catch (e) {
                console.error("Deals fetch failed:", e);
                setState({data: [], loading: false, error: e.message});
            }
        };
        load();
    }, [debouncedMaxPrice, setState, refreshTrigger]);
    
    const shown = watch.length > 0 ? items.filter(d => matchesWatch(d.title, watch)) : items;

    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Top Deals</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                    <label className="text-xs">Max Price ($)</label>
                    <Input className="w-24" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                     <Button size="sm" onClick={() => setRefreshTrigger(t => t + 1)} disabled={isLoading}>
                         {isLoading ? <AnimatedGiftIcon className="w-4 h-4 mr-1" /> : <Gift className="w-4 h-4 mr-1" />}
                         {isLoading ? "Refreshing..." : "Refresh"}
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading ? Array.from({length:6}).map((_,i)=><CardSkeleton key={i}/>) :
                     error ? <div className="col-span-full"><ErrorMessage text={error} /></div> :
                     shown.length === 0 ? <div className="col-span-full"><Empty text="No deals found for this price." /></div> :
                     shown.map(item => <DealCard key={item.dealID} item={item} watch={watch} storeName={storeNames[item.storeID] || item.storeID} />)}
                </div>
            </CardContent>
        </Card>
    );
}

function DealCard({ item, watch, storeName }) {
    const isWatched = matchesWatch(item.title, watch);
    const dealLink = monetizeUrl(`https://www.cheapshark.com/redirect?dealID=${item.dealID}`);

    return (
        <div className={`border rounded-lg p-3 flex gap-3 ${isWatched ? 'border-yellow-400 dark:border-yellow-600' : 'dark:border-zinc-700'}`}>
            <img src={item.thumb} alt={item.title} className="w-16 h-24 object-cover rounded" onError={(e) => e.target.src='https://placehold.co/120x180/1a1a1a/ffffff?text=N/A'}/>
            <div className="flex-1 flex flex-col min-w-0">
                <h3 className="text-sm font-semibold truncate" title={item.title}>{item.title}</h3>
                <div className="text-xs text-zinc-500">{storeName}</div>
                {isWatched && <Badge variant="highlight" className="w-fit mt-1"><Star className="w-3 h-3 mr-1"/>Watched</Badge>}
                <div className="flex-grow"></div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-lg text-green-600 dark:text-green-400">${item.salePrice}</span>
                        <span className="line-through text-xs text-zinc-400">${item.normalPrice}</span>
                    </div>
                    <Button size="sm" href={dealLink}>Get Deal</Button>
                </div>
            </div>
        </div>
    );
}


// ============================================================
// Component: WATCHLIST
// ============================================================
function Watchlist({ watch, setWatch, allItems, storeNames }) {
    const [term, setTerm] = useState("");

    function addWatch() {
        const t = term.trim().toUpperCase();
        if (!t || watch.map(w => w.toUpperCase()).includes(t)) {
             setTerm("");
             return;
        }
        setWatch([...watch, t]);
        setTerm("");
    }
    const dropWatch = (x) => setWatch(watch.filter(w => w !== x));

    const watchedItems = {
        free: allItems.free.filter(i => matchesWatch(i.title, watch)),
        giveaways: allItems.giveaways.filter(i => matchesWatch(i.title, watch)),
        deals: allItems.deals.filter(i => matchesWatch(i.title, watch)),
    };
    const total = watchedItems.free.length + watchedItems.giveaways.length + watchedItems.deals.length;

    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Star className="w-5 h-5" /> Your Watchlist</CardTitle></CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Input placeholder="Add a game or keyword..." value={term} onChange={e => setTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && addWatch()} />
                    <Button onClick={addWatch}>Add to Watchlist</Button>
                </div>
                {watch.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {watch.map(w => (
                            <Badge key={w} variant="secondary" className="pl-3 text-base">
                                {w}
                                <button className="ml-2 opacity-50 hover:opacity-100 text-lg font-bold" onClick={() => dropWatch(w)} title="Remove">&times;</button>
                            </Badge>
                        ))}
                    </div>
                )}
                <Separator className="my-4" />
                <AdPlaceholder type="square" />
                {total === 0 ? <Empty text={watch.length ? "Nothing on your watchlist is currently available." : "Add items to your watchlist to track them."} /> :
                    <div className="space-y-6">
                        {watchedItems.free.length > 0 && <ResultsSection title="Free Games on Watchlist" items={watchedItems.free} watch={watch} CardComponent={ItemCard} />}
                        {watchedItems.giveaways.length > 0 && <ResultsSection title="Giveaways on Watchlist" items={watchedItems.giveaways} watch={watch} CardComponent={GiveawayCard} storeNames={storeNames} />}
                        {watchedItems.deals.length > 0 && <ResultsSection title="Deals on Watchlist" items={watchedItems.deals} watch={watch} storeNames={storeNames} CardComponent={DealCard} />}
                    </div>
                }
            </CardContent>
        </Card>
    );
}

function ResultsSection({ title, items, CardComponent, ...props }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">{title} ({items.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map(item => (
                    <CardComponent 
                        key={item.id || item.dealID}
                        item={item} 
                        {...props} 
                        storeName={props.storeNames && item.storeID ? (props.storeNames[item.storeID] || item.storeID) : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;




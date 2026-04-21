/**
 * 批量创建文章云文档并写入内容
 * 10篇文章，覆盖 tech/industry/company 三个分类
 */

import { getToken } from './client';

const API_BASE = 'https://open.feishu.cn/open-apis';

async function createDoc(title: string): Promise<string> {
  const token = await getToken();
  const resp = await fetch(`${API_BASE}/docx/v1/documents`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await resp.json();
  if (data.code !== 0) throw new Error(`Failed to create doc: ${data.code} ${data.msg}`);
  return data.data.document.document_id;
}

async function writeBlocks(docId: string, blocks: any[]) {
  const token = await getToken();
  // 分批写入，每批 ≤20 blocks
  for (let i = 0; i < blocks.length; i += 20) {
    const batch = blocks.slice(i, i + 20);
    const resp = await fetch(`${API_BASE}/docx/v1/documents/${docId}/blocks/batch_update`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: batch.map(block => ({ create: block })),
      }),
    });
    const data = await resp.json();
    if (data.code !== 0) {
      console.log(`   ⚠️  Batch ${i}-${i+batch.length}: code=${data.code} ${data.msg}`);
    }
  }
}

const articles = [
  {
    title: 'Understanding Frequency Tolerance and Stability in Crystal Resonators',
    category: 'tech',
    date: '2026-04-15',
    author: 'China NewChip',
    excerpt: 'Frequency tolerance and stability are the two most critical specifications when selecting a crystal resonator. This article explains the difference, measurement methods, and how temperature affects crystal performance.',
    lines: [
      { type: 'bullet', text: 'Frequency tolerance and stability are the two most critical specifications when selecting a crystal resonator. This article explains the difference, measurement methods, and how temperature affects crystal performance.' },
      { type: 'h2', text: 'What Is Frequency Tolerance?' },
      { type: 'bullet', text: 'Frequency tolerance measures how much the actual resonant frequency may deviate from the nominal value at 25°C. It is expressed in parts per million (ppm). A ±10ppm crystal rated at 16MHz may oscillate anywhere between 16.00016MHz and 15.99984MHz at room temperature.' },
      { type: 'bullet', text: 'Common tolerance grades: ±10ppm (precision), ±20ppm (standard), ±30ppm (consumer), ±50ppm (cost-sensitive). The tighter the tolerance, the more expensive the crystal typically becomes.' },
      { type: 'h2', text: 'What Is Frequency Stability?' },
      { type: 'bullet', text: 'Frequency stability measures how much the frequency drifts across temperature ranges. Unlike tolerance (a one-time offset at 25°C), stability describes the drift curve from -40°C to +85°C or -40°C to +125°C for automotive grades.' },
      { type: 'bullet', text: 'Stability is typically expressed in ppm over the operating temperature range. A crystal with ±30ppm stability over -40°C to +85°C means the frequency stays within ±30ppm of nominal across the entire temperature range.' },
      { type: 'h2', text: 'Temperature Compensation Methods' },
      { type: 'ordered', text: 'AT-cut crystals — The most common cut, with a zero temperature coefficient around 25°C. Provides good stability from -40°C to +85°C.' },
      { type: 'ordered', text: 'Stress-compensated (SC) cuts — Used in high-stability oscillators, better at resisting mechanical stress effects.' },
      { type: 'ordered', text: 'Temperature-compensated crystal oscillators (TCXO) — Use a compensation circuit to actively correct frequency drift. Typical stability: ±0.5ppm to ±2.5ppm.' },
      { type: 'ordered', text: 'Oven-controlled crystal oscillators (OCXO) — Maintain crystal at constant temperature. Best stability: ±0.001ppm to ±0.1ppm. Used in base stations and precision timing.' },
      { type: 'h2', text: 'How to Select the Right Tolerance and Stability' },
      { type: 'bullet', text: 'Consumer electronics (smartwatches, IoT sensors): ±20ppm to ±30ppm is sufficient. Cost and power consumption are primary concerns.' },
      { type: 'bullet', text: 'Industrial control (PLC, motor drives): ±10ppm to ±20ppm. Reliability across wide temperature ranges matters.' },
      { type: 'bullet', text: 'Automotive (ECU, ADAS): AEC-Q200 compliant, ±10ppm to ±20ppm over -40°C to +125°C. Vibration resistance also critical.' },
      { type: 'bullet', text: 'Telecom infrastructure (base stations, sync equipment): ±0.01ppm to ±0.5ppm. OCXO or high-end TCXO required.' },
    ],
  },
  {
    title: 'SMD Crystal Packages: From 1610 to 7050 — A Complete Size Guide',
    category: 'tech',
    date: '2026-04-10',
    author: 'China NewChip',
    excerpt: 'Surface-mount crystal packages have standardized around a handful of common sizes. Understanding the dimensions, thermal characteristics, and mechanical suitability of each package helps you select the right crystal for your application.',
    lines: [
      { type: 'bullet', text: 'Surface-mount crystal packages have standardized around a handful of common sizes. Understanding the dimensions, thermal characteristics, and mechanical suitability of each package helps you select the right crystal for your application.' },
      { type: 'h2', text: 'Standard SMD Package Sizes' },
      { type: 'bullet', text: 'Crystal packages are named after their approximate dimensions in hundredths of a millimeter. A 3225 crystal measures 3.2mm × 2.5mm × 0.75mm (typical height varies by manufacturer).' },
      { type: 'h2', text: '1610 Package (1.6mm × 1.0mm)' },
      { type: 'bullet', text: 'Dimensions: 1.6mm × 1.0mm × 0.3mm. The smallest standard SMD crystal package available. Primarily used in wearables and space-constrained IoT devices.' },
      { type: 'bullet', text: 'Typical frequencies: 26MHz to 52MHz. ESR typically 60Ω to 100Ω due to small crystal blank. Load capacitance 8pF standard.' },
      { type: 'bullet', text: 'Limitations: Difficult to solder in manual rework due to small pads. Higher sensitivity to board flex stress.' },
      { type: 'h2', text: '2016 Package (2.0mm × 1.6mm)' },
      { type: 'bullet', text: 'Dimensions: 2.0mm × 1.6mm × 0.45mm. A popular choice for smartphones and tablets. Good balance between size and performance.' },
      { type: 'bullet', text: 'Typical frequencies: 16MHz to 52MHz. ESR typically 40Ω to 60Ω. Load capacitance 8pF or 12pF.' },
      { type: 'bullet', text: 'Height allows for better crystal blank thickness, improving frequency stability compared to 1610.' },
      { type: 'h2', text: '2520 Package (2.5mm × 2.0mm)' },
      { type: 'bullet', text: 'Dimensions: 2.5mm × 2.0mm × 0.55mm. Widely used in industrial and automotive applications. Excellent balance of solderability and performance.' },
      { type: 'bullet', text: 'Typical frequencies: 8MHz to 54MHz. ESR typically 30Ω to 50Ω. Good thermal dissipation and mechanical robustness.' },
      { type: 'bullet', text: 'AEC-Q100/200 compliant versions available. Preferred package for automotive electronics.' },
      { type: 'h2', text: '3225 Package (3.2mm × 2.5mm)' },
      { type: 'bullet', text: 'Dimensions: 3.2mm × 2.5mm × 0.75mm. The most common SMD crystal package. Used in everything from consumer electronics to industrial controls.' },
      { type: 'bullet', text: 'Typical frequencies: 4MHz to 80MHz. ESR typically 20Ω to 40Ω. Available in both ceramic and glass lid packages.' },
      { type: 'bullet', text: 'Excellent track record — well-understood mounting and reflow characteristics. Easy to inspect and rework.' },
      { type: 'h2', text: '5032 Package (5.0mm × 3.2mm)' },
      { type: 'bullet', text: 'Dimensions: 5.0mm × 3.2mm × 1.0mm. Used for lower frequency crystals (typically 8MHz to 40MHz) and oscillator modules.' },
      { type: 'bullet', text: 'Larger size means lower ESR (15Ω to 30Ω) and better frequency stability. Often used as the crystal in TCXO and OCXO modules.' },
      { type: 'h2', text: '7050 Package (7.0mm × 5.0mm)' },
      { type: 'bullet', text: 'Dimensions: 7.0mm × 5.0mm × 1.2mm. The largest standard SMD package. Used for low-frequency, high-stability applications.' },
      { type: 'bullet', text: 'Typical frequencies: 4MHz to 20MHz. ESR as low as 10Ω. Excellent for reference oscillators and telecom timing circuits.' },
    ],
  },
  {
    title: 'Crystal Resonators vs. MEMS Oscillators: Making the Right Choice',
    category: 'tech',
    date: '2026-04-05',
    author: 'China NewChip',
    excerpt: 'Both crystal and MEMS oscillators serve the same fundamental purpose — providing a stable frequency reference. But the underlying physics, performance characteristics, and application fit differ significantly. Here is how to decide.',
    lines: [
      { type: 'bullet', text: 'Both crystal and MEMS oscillators serve the same fundamental purpose — providing a stable frequency reference. But the underlying physics, performance characteristics, and application fit differ significantly. Here is how to decide.' },
      { type: 'h2', text: 'Fundamental Differences' },
      { type: 'bullet', text: 'Crystal oscillators use the mechanical resonance of a quartz crystal (piezoelectric effect). MEMS oscillators use a tiny silicon resonator that vibrates at RF frequencies, with the output divided down to the desired frequency.' },
      { type: 'bullet', text: 'Crystal: Ageing characteristics are well understood — typically ±1ppm to ±5ppm per year. Long-term stability excellent.' },
      { type: 'bullet', text: 'MEMS: Ageing is typically ±3ppm to ±10ppm per year. Silicon resonators age faster than quartz, though the difference narrows in precision compensated designs.' },
      { type: 'h2', text: 'Frequency Stability Comparison' },
      { type: 'bullet', text: 'Standard crystal oscillator: ±20ppm to ±50ppm over -40°C to +85°C. Inexpensive, widely available.' },
      { type: 'bullet', text: 'MEMS oscillator (any frequency programmable): ±20ppm to ±50ppm typical. Advantage: any frequency from 1MHz to 220MHz without custom tooling.' },
      { type: 'bullet', text: 'TCXO (crystal): ±0.5ppm to ±2.5ppm over -40°C to +85°C. Mature, reliable technology.' },
      { type: 'bullet', text: 'MEMS TCXO (Microchip, SiTime): ±0.5ppm to ±2.5ppm. Better initial tolerance, slightly worse long-term ageing.' },
      { type: 'h2', text: 'Startup Time and Power' },
      { type: 'bullet', text: 'Crystal oscillators: Startup time typically 2ms to 10ms. Cold start can be longer for large crystals in oscillator circuits.' },
      { type: 'bullet', text: 'MEMS oscillators: Startup time typically 1ms to 3ms. The silicon resonator heats up quickly, reaching stable frequency faster.' },
      { type: 'bullet', text: 'Power consumption: MEMS oscillators typically consume 1.5mA to 5mA at 3.3V. Crystal oscillators vary widely — TCXOs can consume 10mA to 30mA due to the heating element.' },
      { type: 'h2', text: 'Vibration and Shock Resistance' },
      { type: 'bullet', text: 'Crystal: Sensitive to vibration. High-G mechanical shock can cause frequency jumps or even crystal breakage in severe cases. Can be mitigated with mechanical isolation mounting.' },
      { type: 'bullet', text: 'MEMS: Excellent vibration resistance. Silicon resonators are immune to vibration-induced frequency shifts. Ideal for automotive, industrial, and asset tracking applications.' },
      { type: 'h2', text: 'When to Choose Crystal' },
      { type: 'bullet', text: 'High-precision timing applications (telecom base stations, test equipment): OCXOs and high-end TCXOs use crystal for best stability and lowest phase noise.' },
      { type: 'bullet', text: 'Lowest BOM cost for standard frequencies (32.768kHz, 8MHz, 16MHz, 26MHz, etc.): Crystal oscillators remain cheaper at scale for standard frequencies.' },
      { type: 'bullet', text: 'Long-term reliability where ±5ppm/year ageing is acceptable.' },
      { type: 'h2', text: 'When to Choose MEMS' },
      { type: 'bullet', text: 'High-vibration environments (automotive under-hood, industrial machinery, asset tracking on vehicles).' },
      { type: 'bullet', text: 'Applications requiring any frequency from 1MHz to 220MHz: One device can cover all frequencies vs. multiple crystal part numbers.' },
      { type: 'bullet', text: 'Rapid development cycles: No crystal matching or tolerance grading required — all frequencies at equal performance.' },
      { type: 'bullet', text: 'Programmable output: Some MEMS oscillators allow frequency changes via I2C or SPI after installation.' },
    ],
  },
  {
    title: 'Crystal Selection Guide for ESP32, STM32, and Nordic nRF52 MCUs',
    category: 'tech',
    date: '2026-03-28',
    author: 'China NewChip',
    excerpt: 'Each popular microcontroller platform has specific crystal requirements for its PLL and RF subsystems. Using the wrong crystal can cause UART baud rate errors, WiFi connection failures, or BLE protocol issues.',
    lines: [
      { type: 'bullet', text: 'Each popular microcontroller platform has specific crystal requirements for its PLL and RF subsystems. Using the wrong crystal can cause UART baud rate errors, WiFi connection failures, or BLE protocol issues.' },
      { type: 'h2', text: 'ESP32 (Espressif Systems)' },
      { type: 'bullet', text: 'The ESP32 requires a 40MHz crystal for its PLL. The on-chip crystal tolerance requirement is ±10ppm for normal operation, but WiFi 802.11b/g/n compliance requires ±10ppm overall system accuracy including crystal tolerance over temperature.' },
      { type: 'bullet', text: 'Recommended crystal: 40MHz, ±10ppm over -40°C to +85°C, CL=10pF or 12pF, ESR≤40Ω. SMD3225 package is standard.' },
      { type: 'bullet', text: 'The ESP32 has an internal crystal calibration circuit that can compensate for ±10ppm initial tolerance, but it cannot fully compensate for drift across temperature. A tighter tolerance crystal extends the usable temperature range for reliable WiFi.' },
      { type: 'bullet', text: 'Second crystal (optional): 32.768kHz for RTC sleep mode timing. Low-ESR (<70kΩ) 12.5pF load recommended.' },
      { type: 'h2', text: 'STM32 (STMicroelectronics)' },
      { type: 'bullet', text: 'STM32 microcontrollers use an external 8MHz crystal (HSE) for the PLL to generate the system clock (up to 480MHz on STM32F4/F7/H7). The PLL multiplies the 8MHz input.' },
      { type: 'bullet', text: 'UART baud rate accuracy depends on the HSE crystal tolerance. For UART at 115200 baud with 0% error tolerance on both ends, a ±5ppm crystal is recommended. ±10ppm may cause errors at 230400 baud and above.' },
      { type: 'bullet', text: 'For CAN bus applications, the crystal tolerance directly affects bit timing accuracy. CAN 2.0 requires ±0.5% overall accuracy on the bit time. At 500kbps, ±10ppm crystal is sufficient.' },
      { type: 'bullet', text: 'Recommended crystal for STM32F4: 8MHz, ±10ppm, CL=8pF to 18pF (check datasheet), ESR≤40Ω. SMD3225 standard.' },
      { type: 'bullet', text: 'For USB OTG on STM32F4: USB full-speed requires ±500ppm. An ±10ppm crystal easily meets this.' },
      { type: 'h2', text: 'Nordic nRF52 Series (nRF52832, nRF52840)' },
      { type: 'bullet', text: 'The nRF52 uses a 32MHz crystal for its radio PLL in BLE 5.x operation. The crystal tolerance requirement for BLE is ±40ppm (per the Bluetooth Core Specification), but practical implementations use ±20ppm or ±10ppm for margin.' },
      { type: 'bullet', text: 'For nRF52840 with USB: The USB peripheral requires ±500ppm. 32MHz ±10ppm crystal meets this easily.' },
      { type: 'bullet', text: 'Recommended crystal for nRF52: 32MHz, ±10ppm, CL=8pF or 10pF, ESR≤40Ω. SMD2520 or SMD3225.' },
      { type: 'bullet', text: 'nRF52 also supports an optional 32.768kHz crystal for RTC and low-power timing. Use low-ESR crystal (<70kΩ) for best current consumption during sleep.' },
      { type: 'h2', text: 'Common Crystal Selection Mistakes' },
      { type: 'bullet', text: 'Using a ±30ppm "generic" crystal for ESP32 in outdoor IoT sensor: The temperature drift at 40°C above room temperature pushes total error beyond ±30ppm, causing intermittent WiFi disconnections.' },
      { type: 'bullet', text: 'Wrong load capacitance: If the crystal datasheet specifies 12pF load capacitance but the MCU board uses 8pF effective load, the crystal will oscillate at a higher frequency than nominal — causing baud rate and RF issues.' },
      { type: 'bullet', text: 'Ignoring ESR: High-ESR crystals (>60Ω for 26MHz to 40MHz) may cause slow startup or failure to oscillate in circuits designed for 30Ω crystals.' },
    ],
  },
  {
    title: 'Global Crystal Oscillator Market Report 2026–2031',
    category: 'industry',
    date: '2026-04-18',
    author: 'China NewChip',
    excerpt: 'The global crystal oscillator market is projected to grow from $3.2 billion in 2025 to $4.8 billion by 2031, driven by 5G infrastructure expansion, electric vehicle proliferation, and the industrial IoT boom.',
    lines: [
      { type: 'bullet', text: 'The global crystal oscillator market is projected to grow from $3.2 billion in 2025 to $4.8 billion by 2031, driven by 5G infrastructure expansion, electric vehicle proliferation, and the industrial IoT boom.' },
      { type: 'h2', text: 'Market Size and Growth Drivers' },
      { type: 'bullet', text: '2025 market size: $3.2 billion USD. CAGR 2026–2031: 7.2%. Key growth regions: Asia-Pacific (60% of global demand), North America (18%), Europe (15%).' },
      { type: 'bullet', text: '5G infrastructure: Each 5G small cell requires 3–5 oscillators (reference clock, PLL, radio). Macro cells require even more. 5G deployment alone will account for 22% of new crystal demand through 2028.' },
      { type: 'bullet', text: 'Electric vehicles: A modern EV contains 80–120 crystal oscillators for ECUs, battery management, motor control, V2X, and infotainment. ICE vehicles typically contain 20–40.' },
      { type: 'bullet', text: 'Industrial IoT: Edge sensors and controllers in smart factories require crystals for real-time clock, communication timing, and motor control. Each smart factory installation adds 200–500 connected devices, each with 1–3 crystals.' },
      { type: 'h2', text: 'Technology Shift: From Crystal to MEMS?' },
      { type: 'bullet', text: 'MEMS oscillators are gaining share in the ±20ppm to ±50ppm market segment. The ability to program any frequency and faster startup make MEMS attractive for high-mix manufacturing.' },
      { type: 'bullet', text: 'However, precision timing (>1ppm stability) remains dominated by TCXO and OCXO crystal-based designs. No MEMS solution currently matches the ±0.001ppm performance of OCXOs for telecom timing.' },
      { type: 'bullet', text: 'Forecast: MEMS will capture 30% of the standard oscillator market (<±50ppm) by 2028, but crystal oscillators will remain dominant in total market value due to higher ASP of precision segments.' },
      { type: 'h2', text: 'Supply Chain Dynamics' },
      { type: 'bullet', text: 'Japan (NDK, KDS, Epson) historically held 55% of global crystal supply. The 2021–2023 semiconductor shortage exposed concentration risk. New capacity in China and Taiwan is reducing Japanese market share.' },
      { type: 'bullet', text: 'Chinese manufacturers (TongJing, TXC China, HubeiXDXC) are rapidly moving up the value chain from 3225 consumer-grade to automotive-grade and precision TCXO segments.' },
      { type: 'bullet', text: 'Quartz substrate: High-purity synthetic quartz remains a bottleneck. Major producers in Japan (Telling) and Russia control 70% of supply. New synthetic quartz capacity under construction in China will ease this constraint by 2027.' },
      { type: 'h2', text: 'Regional Outlook' },
      { type: 'bullet', text: 'China: Fastest growth at 12% CAGR, driven by domestic 5G and EV manufacturing. Government subsidies for semiconductor supply chain independence accelerating investment.' },
      { type: 'bullet', text: 'Southeast Asia: Emerging manufacturing hub for consumer electronics. Vietnam and Thailand becoming significant crystal resonator assembly locations.' },
      { type: 'bullet', text: 'USA: Defense and aerospace driving precision oscillator demand. Export controls on advanced TCXO/OCXO components creating supply constraints for Chinese manufacturers.' },
    ],
  },
  {
    title: 'Japan Earthquake Disrupts Global Crystal Component Supply Chain',
    category: 'industry',
    date: '2026-04-02',
    author: 'China NewChip',
    excerpt: 'A magnitude 7.1 earthquake off the coast of Kyushu on March 26 has disrupted operations at three major Japanese crystal component factories, potentially tightening global supply for automotive and industrial crystals through Q3 2026.',
    lines: [
      { type: 'bullet', text: 'A magnitude 7.1 earthquake off the coast of Kyushu on March 26 has disrupted operations at three major Japanese crystal component factories, potentially tightening global supply for automotive and industrial crystals through Q3 2026.' },
      { type: 'h2', text: 'Affected Facilities' },
      { type: 'bullet', text: 'NDK (Nihon Dempa Kogyo): Factory in Miyazaki Prefecture (produces automotive crystals) has suspended operations for safety inspection. Estimated restart: 3–4 weeks.' },
      { type: 'bullet', text: 'KDS (Kyocera Device): Factory in Nagano Prefecture (precision TCXO) reported structural damage to one production building. Full production restart: 6–8 weeks.' },
      { type: 'bullet', text: 'Epson: Factory in Akita Prefecture (consumer and industrial crystals) experienced power outage and equipment damage. Limited production resumed after 10 days.' },
      { type: 'h2', text: 'Supply Impact by Segment' },
      { type: 'bullet', text: 'Automotive crystals (AEC-Q100/Q200): High risk of shortage through Q3. NDK Miyazaki supplies 30% of Japanese automotive crystal market. Tier-1 EMS providers have been notified of 4–8 week delays.' },
      { type: 'bullet', text: 'Precision TCXO for telecom: KDS Nagano is a major TCXO supplier to Ericsson and Nokia. Inventory at distributors covers approximately 3 weeks of demand.' },
      { type: 'bullet', text: 'Consumer crystals (3225, 2520): Moderate impact. Alternative capacity in Taiwan and China available. Price increases of 5–10% expected at distributors through April.' },
      { type: 'h2', text: 'Price Movements' },
      { type: 'bullet', text: 'Distributor stock for automotive-grade crystals increased 15–25% in the week following the earthquake on anticipation of shortages.' },
      { type: 'bullet', text: 'Factory direct pricing for Q2 remains unchanged under existing contracts, but spot market premiums of 20–30% reported for automotive grades.' },
      { type: 'bullet', text: 'Long-term contracts (>1 year) typically locked at fixed pricing, protecting large buyers. Small and medium OEMs are most exposed to spot price volatility.' },
      { type: 'h2', text: 'Mitigation Strategies for Buyers' },
      { type: 'bullet', text: 'Alternative sourcing: Qualification of secondary suppliers takes 3–6 months for automotive, 2–4 weeks for consumer. Start qualification now to have alternatives ready by Q3.' },
      { type: 'bullet', text: 'Buffer stock: Distributors recommend 8–12 weeks of buffer inventory for automotive grades given continued uncertainty.' },
      { type: 'bullet', text: 'MEMS substitution: For non-safety-critical applications, MEMS oscillators from SiTime or Microchip can substitute for standard crystal oscillators (25MHz to 50MHz) with minimal hardware changes.' },
      { type: 'bullet', text: 'Long-term contracts: Lock in 12-month pricing and allocation with major suppliers now to avoid Q3 spot market exposure.' },
    ],
  },
  {
    title: 'The Rise of Chinese Crystal Manufacturers: From Low-Cost Copy to Tier-1 Quality',
    category: 'industry',
    date: '2026-03-25',
    author: 'China NewChip',
    excerpt: 'Chinese crystal resonator manufacturers have undergone a dramatic transformation over the past decade. Once dismissed as low-quality knockoffs, several Chinese brands now meet or exceed Japanese competitors in precision, reliability, and automotive certification.',
    lines: [
      { type: 'bullet', text: 'Chinese crystal resonator manufacturers have undergone a dramatic transformation over the past decade. Once dismissed as low-quality knockoffs, several Chinese brands now meet or exceed Japanese competitors in precision, reliability, and automotive certification.' },
      { type: 'h2', text: 'Historical Context' },
      { type: 'bullet', text: '2010–2015: Chinese crystal manufacturers primarily served the low-end consumer market. Products were often copies of Japanese designs with lower material quality and less rigorous testing. Primary value proposition: 30–40% lower price.' },
      { type: 'bullet', text: '2015–2020: As Chinese smartphone manufacturing grew, local suppliers gained scale. Brands like TongJing, TXC China, and HubeiXDXC invested heavily in automated production lines and in-house testing equipment.' },
      { type: 'bullet', text: '2020–present: Automotive electrification in China created demand for AEC-Q100/200 qualified crystals. Chinese EV manufacturers (BYD, NIO, Xpeng) prefer domestic suppliers for supply chain control and faster response times.' },
      { type: 'h2', text: 'Quality Improvements' },
      { type: 'bullet', text: 'Crystal blank manufacturing: Chinese manufacturers now produce synthetic quartz crystal blanks in-house with purity levels matching Japanese standards (99.9999% SiO₂). Some have adopted MCZ (Magnetic Czochralski) growth for larger, lower-defect blanks.' },
      { type: 'bullet', text: 'Precision tolerance: Many Chinese manufacturers now achieve ±5ppm and ±10ppm tolerances at volume, matching NDK and KDS. Tight-tolerance crystals (AEC-Q200) are no longer exclusively a Japanese domain.' },
      { type: 'bullet', text: 'Testing and certification: Major Chinese manufacturers have invested in in-house frequency tolerance testing, thermal cycling, and vibration testing. Third-party AEC-Q certification (by SGS, TÜV) is now standard for automotive grades.' },
      { type: 'h2', text: 'Competitive Advantages of Chinese Manufacturers Today' },
      { type: 'bullet', text: 'Shorter lead times: 2–4 weeks vs. 8–12 weeks from Japan. Faster response to design changes and volume ramp.' },
      { type: 'bullet', text: 'Lower logistics cost: No import tariffs, duties, or currency fluctuation risk for Chinese domestic buyers.' },
      { type: 'bullet', text: 'Technical support: Direct engineering support from the manufacturer rather than through a distributor. Faster resolution of application issues.' },
      { type: 'bullet', text: 'Customization: Willingness to produce non-standard frequencies, tolerances, and packages for high-volume customers.' },
      { type: 'h2', text: 'Remaining Gaps' },
      { type: 'bullet', text: 'Ultra-precision OCXO (>±0.001ppm): Still dominated by US and European specialty manufacturers (Microchip, Bliley, rakon). Chinese manufacturers have not yet entered this segment.' },
      { type: 'bullet', text: 'Phase noise performance: At frequencies above 100MHz, Japanese and US oscillators still lead in ultra-low-phase-noise specifications for radar and test equipment.' },
      { type: 'bullet', text: 'Brand recognition: In Western markets, Japanese brands retain strong preference, particularly in aerospace and defense. Chinese brands are gaining in Southeast Asia, India, and Africa.' },
    ],
  },
  {
    title: 'TongJing Electronics Launches New Automotive Crystal Production Line with IATF 16949 Certification',
    category: 'company',
    date: '2026-04-20',
    author: 'China NewChip',
    excerpt: 'TongJing Electronics announces the commissioning of its dedicated automotive crystal production line at its Shenzhen facility, achieving IATF 16949:2016 certification and tripling automotive-grade crystal capacity to 50 million units per month.',
    lines: [
      { type: 'bullet', text: 'TongJing Electronics announces the commissioning of its dedicated automotive crystal production line at its Shenzhen facility, achieving IATF 16949:2016 certification and tripling automotive-grade crystal capacity to 50 million units per month.' },
      { type: 'h2', text: 'New Production Line Details' },
      { type: 'bullet', text: 'Investment: RMB 120 million (~$16.5 million USD). Production area: 3,000 square meters. Equipment: Fully automated Japanese and German-made crystal processing and testing equipment.' },
      { type: 'bullet', text: 'Capacity: 50 million automotive-grade crystal units per month at full ramp (target: Q4 2026). Current production: 15 million/month. Expansion in two phases.' },
      { type: 'bullet', text: 'Product range: SMD2016, SMD2520, SMD3225, and SMD5032 packages. Frequency range: 4MHz to 54MHz. AEC-Q200 Grade 1 certified (-40°C to +125°C) for all automotive products.' },
      { type: 'h2', text: 'IATF 16949 Certification' },
      { type: 'bullet', text: 'IATF 16949:2016 is the global quality management standard for the automotive supply chain. Certification was achieved after a 6-month audit by TÜV Rheinland.' },
      { type: 'bullet', text: 'The audit covered: Process control, incoming material inspection, in-process testing, finished goods testing, traceability system, customer-specific requirements, and continuous improvement processes.' },
      { type: 'bullet', text: 'TongJing is now listed in the IATF database, allowing direct supply to Tier-1 automotive electronics suppliers globally.' },
      { type: 'h2', text: 'Production Control and Traceability' },
      { type: 'bullet', text: 'Each crystal lot is traceable to: Raw quartz batch, crystal blank production date, lapping and etching records, electrode deposition parameters, and final test data (frequency, ESR, CL, temperature curve).' },
      { type: 'bullet', text: 'Automated visual inspection of every unit before packaging. 100% testing of frequency tolerance, ESR, and load capacitance vs. 2% sampling at most competitors.' },
      { type: 'bullet', text: 'Statistical Process Control (SPC) running on all critical parameters. Cpk values >1.67 on all major characteristics, exceeding the automotive minimum of 1.33.' },
      { type: 'h2', text: 'Market Opportunity' },
      { type: 'bullet', text: 'China EV market: 12 million units sold in 2025, projected 18 million in 2026. Each EV uses 80–120 crystals, creating significant demand for domestically produced automotive-grade components.' },
      { type: 'bullet', text: 'Target customers: Major Chinese EV OEMs (BYD, NIO, Xpeng, Li Auto) and their Tier-1 EMS partners. Export to European and Southeast Asian automotive electronics manufacturers.' },
      { type: 'bullet', text: 'Pricing: 15–20% below comparable Japanese AEC-Q200 products, with equivalent or better quality as demonstrated by third-party testing data.' },
    ],
  },
  {
    title: 'TongJing Electronics Establishes Strategic Partnership with Arrow Electronics',
    category: 'company',
    date: '2026-04-12',
    author: 'China NewChip',
    excerpt: 'TongJing Electronics and Arrow Electronics announce a global distribution partnership, giving Arrow customers access to TongJing automotive-grade crystal resonators and oscillators through Arrow\'s worldwide sales network.',
    lines: [
      { type: 'bullet', text: 'TongJing Electronics and Arrow Electronics announce a global distribution partnership, giving Arrow customers access to TongJing automotive-grade crystal resonators and oscillators through Arrow\'s worldwide sales network.' },
      { type: 'h2', text: 'Partnership Scope' },
      { type: 'bullet', text: 'Arrow Electronics becomes the authorized global distributor for TongJing Electronics crystal products outside of Greater China.' },
      { type: 'bullet', text: 'Product line: Full range of TongJing crystal resonators (SMD1610 to SMD3225), crystal oscillators (SPXO, TCXO, VCXO), and RTC modules.' },
      { type: 'bullet', text: 'Initial focus: Automotive-grade products (AEC-Q100/Q200). Expansion to industrial and consumer grades planned for Q3 2026.' },
      { type: 'bullet', text: 'Arrow will hold strategic inventory of top 50 TongJing part numbers at distribution centers in US, Germany, Singapore, and Mexico.' },
      { type: 'h2', text: 'Technical Support' },
      { type: 'bullet', text: 'Arrow\'s FAE (Field Application Engineer) team has completed TongJing product training. Application support available for crystal selection, circuit design review, and troubleshooting.' },
      { type: 'bullet', text: 'TongJing will provide Arrow with reference designs for popular MCU platforms (STM32, ESP32, nRF52, Renesas RA), reducing design-in time for customers.' },
      { type: 'bullet', text: 'Joint marketing: Technical webinars, datasheet localization, and presence at major trade shows (electronica, embedded world, APEC).' },
      { type: 'h2', text: 'What This Means for Customers' },
      { type: 'bullet', text: 'Faster sourcing: Arrow\'s same-day shipping on in-stock items, 24/7 online ordering, and same-lot traceability for automotive customers.' },
      { type: 'bullet', text: 'Design-in support: Free samples for qualified automotive projects. Sample quantity: 100–500 units depending on application.' },
      { type: 'bullet', text: 'Supply chain resilience: Dual-source option for customers previously dependent on single-source Japanese suppliers. Arrow\'s global logistics network reduces lead times by 60–70% compared to factory-direct.' },
      { type: 'h2', text: 'Joint Development Roadmap' },
      { type: 'bullet', text: '2026 Q3: Co-developed reference design for automotive cluster MCUs using TongJing TCXO + NXP S32K3 platform.' },
      { type: 'bullet', text: '2026 Q4: Automotive camera module reference design with TongJing crystal + Sony IMX sensor + Renesas R-Car.' },
      { type: 'bullet', text: '2027: Next-generation precision RTC module targeting V2X and telematics applications.' },
    ],
  },
  {
    title: 'Inside TongJing Electronics: From Raw Quartz to Finished Crystal',
    category: 'company',
    date: '2026-03-30',
    author: 'China NewChip',
    excerpt: 'A behind-the-scenes look at the crystal resonator manufacturing process at TongJing Electronics — from synthetic quartz crystal growth to final test and packaging. Quality control at every stage ensures AEC-Q100 compliance.',
    lines: [
      { type: 'bullet', text: 'A behind-the-scenes look at the crystal resonator manufacturing process at TongJing Electronics — from synthetic quartz crystal growth to final test and packaging. Quality control at every stage ensures AEC-Q100 compliance.' },
      { type: 'h2', text: 'Stage 1: Synthetic Quartz Crystal Growth' },
      { type: 'bullet', text: 'TongJing sources high-purity synthetic quartz bars from certified suppliers (purity: 99.9999% SiO₂). The quartz is tested for R-point defects, bubble content, and Q-factor before acceptance.' },
      { type: 'bullet', text: ' quartz bars are precision-sliced into wafers using inner-diameter diamond saws. Slice thickness is calculated based on target frequency — for a 26MHz crystal, wafer thickness is approximately 65μm.' },
      { type: 'bullet', text: 'Surface roughness after slicing: <0.5μm. Wafers are inspected under 100x magnification for cracks, chips, and inclusions.' },
      { type: 'h2', text: 'Stage 2: Crystal Blank Processing' },
      { type: 'bullet', text: 'Individual crystal blanks are cut from wafers using ultrasonic cutting. Blanks are shaped to exact dimensions using lapping and polishing processes.' },
      { type: 'bullet', text: 'The blanks are then chemically etched to remove surface damage from cutting. Etchant: hydrofluoric acid-based solution. Etch depth: 5–10μm per side.' },
      { type: 'bullet', text: 'AT-cut angle verification: Crystal blanks are oriented to the AT-cut crystal orientation (±2 arc-minutes tolerance). Misorientation causes temperature drift characteristics to deviate from specifications.' },
      { type: 'bullet', text: 'Final blank inspection: Surface roughness <0.1μm, dimension tolerance ±5μm, visual inspection at 50x magnification.' },
      { type: 'h2', text: 'Stage 3: Electrode Deposition' },
      { type: 'bullet', text: 'Gold or silver electrodes are deposited on both sides of the crystal blank using vacuum evaporation or sputtering. Electrode pattern defines the resonant frequency through mass-loading effects.' },
      { type: 'bullet', text: 'Electrode thickness is precisely controlled (±0.01μm). A 0.05μm difference in electrode thickness can shift frequency by 50–100ppm at 26MHz.' },
      { type: 'bullet', text: 'Hanging wires (for leaded crystals) or pad contacts (for SMD) are attached using thermosonic bonding. Bond strength: >5g pull force.' },
      { type: 'h2', text: 'Stage 4: Crystal Mounting and Sealing' },
      { type: 'bullet', text: 'SMD crystals: The crystal blank is mounted on a ceramic base using conductive adhesive or solder. Lid sealing is done in a controlled atmosphere (nitrogen or vacuum) to prevent moisture ingress.' },
      { type: 'bullet', text: 'Leaded crystals: The blank is mounted on lead frames using spring clips or conductive adhesive. The case is sealed using resistance welding or glass-to-metal sealing.' },
      { type: 'bullet', text: 'Seal integrity test: Helium leak testing (sensitivity: 1×10⁻⁸ atm·cc/s). Every unit tested for hermeticity.' },
      { type: 'h2', text: 'Stage 5: Final Testing and Quality Control' },
      { type: 'bullet', text: 'Frequency test: Each crystal is tested at 25°C for frequency (within ±10ppm tolerance), ESR (within specification), and load capacitance.' },
      { type: 'bullet', text: 'Temperature cycling: Samples from each lot are tested from -40°C to +125°C to verify temperature stability. Full temperature curve measurement for AEC-Q100 Grade 1.' },
      { type: 'bullet', text: 'Accelerated life testing (ALT): Samples subjected to 85°C/85% RH (humidity), 1000 hours. Final frequency shift must be within ±5ppm after ALT.' },
      { type: 'bullet', text: '100% automated testing on every unit: Frequency, ESR, CL, insulation resistance. No manual sampling — every unit meets datasheet specifications before shipment.' },
      { type: 'h2', text: 'Traceability System' },
      { type: 'bullet', text: 'Every reel of crystals is labeled with a lot code traceable to: Quartz batch, crystal blank production date, shift (day/night), operator ID, and test data.' },
      { type: 'bullet', text: 'TongJing maintains lot records for 15 years per automotive customer requirements. Quality data available on request within 48 hours.' },
    ],
  },
];

async function main() {
  console.log('📝 Creating 10 new article documents in Feishu...\n');

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    process.stdout.write(`[${i+1}/10] Creating: "${a.title.slice(0, 50)}..."\n`);

    try {
      const docId = await createDoc(a.title);
      console.log(`   Doc ID: ${docId}`);

      // Build block requests
      const blocks: any[] = [];

      // First paragraph (intro)
      blocks.push({
        block_type: 12, // bullet
        bullet: { elements: [{ text_run: { content: a.excerpt } }] },
      });

      for (const line of a.lines) {
        if (line.type === 'h2') {
          blocks.push({
            block_type: 3, // heading1
            heading1: { elements: [{ text_run: { content: line.text } }] },
          });
        } else if (line.type === 'h3') {
          blocks.push({
            block_type: 4, // heading2
            heading2: { elements: [{ text_run: { content: line.text } }] },
          });
        } else if (line.type === 'bullet') {
          blocks.push({
            block_type: 12, // bullet
            bullet: { elements: [{ text_run: { content: line.text } }] },
          });
        } else if (line.type === 'ordered') {
          blocks.push({
            block_type: 13, // ordered
            ordered: { elements: [{ text_run: { content: line.text } }] },
          });
        } else if (line.type === 'quote') {
          blocks.push({
            block_type: 15, // quote
            quote: { elements: [{ text_run: { content: line.text } }] },
          });
        }
      }

      await writeBlocks(docId, blocks);
      console.log(`   ✅ Done`);
    } catch (err: any) {
      console.log(`   ❌ Error: ${err.message}`);
    }

    // Rate limit protection
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n✨ Done creating articles');
}

main().catch(console.error);

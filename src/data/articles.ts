export interface Article {
  slug: string;
  title: string;
  category: 'tech' | 'industry' | 'company';
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const articles: Article[] = [
  {
    slug: 'crystal-resonator-principles-applications',
    title: 'Working Principle and Applications of Crystal Resonators',
    category: 'tech',
    date: '2026-03-15',
    author: 'Dr. Zhang Wei',
    excerpt: 'Crystal resonators are precision electronic components that work based on the piezoelectric effect of quartz crystal. Understanding their working principles is essential for selecting the right component for your application.',
    content: `
## Introduction

Crystal resonators are fundamental components in modern electronics, providing highly stable frequency references for everything from smartphones to industrial control systems. Their reliability and precision make them indispensable in applications where timing accuracy is critical.

## How Crystal Resonators Work

Crystal resonators utilize the piezoelectric effect of quartz crystal. When an electric field is applied to a quartz crystal, it mechanically deforms. Conversely, when mechanical stress is applied, it generates an electrical charge. This bidirectional conversion allows the crystal to vibrate at precise frequencies.

The resonant frequency is determined by:
- **Crystal cut** - The angle at which the crystal is cut from the raw quartz
- **Crystal dimensions** - Thickness and shape of the quartz blank
- **Operating temperature** - Frequency stability varies with temperature

## Key Specifications

### Frequency Tolerance
Measured in parts per million (ppm), this indicates how much the actual frequency may deviate from the nominal value at 25°C. Common tolerances range from ±10ppm to ±50ppm.

### Load Capacitance
The external capacitance required to achieve the rated frequency. Typical values include 8pF, 12pF, and 20pF. Matching the load capacitance to your circuit is crucial for accurate frequency operation.

### Equivalent Series Resistance (ESR)
Lower ESR means less power loss and better performance. Modern crystal resonators typically have ESR values between 30Ω and 100Ω depending on the package size and frequency.

## Applications

### Consumer Electronics
- Smartphones and tablets
- Wearable devices
- Gaming consoles
- Audio equipment

### Industrial Systems
- PLC controllers
- Motor control systems
- Power electronics
- Industrial automation

### Automotive Electronics
- Engine control units (ECU)
- In-vehicle networking
- Safety systems
- Infotainment

## Selection Guide

When choosing a crystal resonator, consider:
1. Required frequency and tolerance
2. Package size constraints
3. Operating temperature range
4. Load capacitance requirements
5. ESR limitations for your circuit

Our product line offers crystal resonators in packages from 1610 to 3225, with frequencies ranging from 8MHz to 50MHz, meeting AEC-Q100 automotive standards.
    `,
    image: '/images/article-crystal-principles_001.jpg',
  },
  {
    slug: '2026-crystal-oscillator-industry-trends',
    title: '2026 Crystal Oscillator Industry Development Trend Analysis',
    category: 'industry',
    date: '2026-03-10',
    author: 'Market Research Team',
    excerpt: 'With the rapid development of 5G communication, automotive electronics, and IoT, crystal resonator demand continues to grow. This article analyzes the key trends shaping the industry in 2026.',
    content: `
## Market Overview

The global crystal resonator market is experiencing unprecedented growth, driven by several converging trends in telecommunications, automotive, and consumer electronics sectors.

## Key Trends for 2026

### 1. 5G Infrastructure Expansion
The continued rollout of 5G networks worldwide is creating massive demand for high-precision timing components. Base stations require crystals with excellent frequency stability and temperature characteristics.

### 2. Automotive Electronics Growth
The transition to electric vehicles and autonomous driving is accelerating demand for automotive-grade crystal resonators. Requirements include:
- AEC-Q100/Q200 certification
- Extended temperature range (-40°C to +125°C)
- High reliability and long lifecycle

### 3. IoT Proliferation
Billions of connected devices require affordable, reliable timing solutions. The trend toward smaller packages (1610, 2016) continues as devices become more compact.

### 4. Miniaturization
Product designers increasingly demand smaller crystal packages without sacrificing performance. This has driven innovation in:
- Wafer-level packaging
- Improved crystal cutting techniques
- Enhanced temperature compensation

## Technology Advancements

### Improved Temperature Stability
New crystal cuts and compensation techniques are enabling tighter frequency tolerance over wider temperature ranges.

### Lower ESR
Advanced manufacturing processes are producing crystals with consistently low equivalent series resistance.

### Higher Frequency Ranges
Traditionally, MHz-range crystals dominated. Now, demand is growing for higher frequencies in smaller packages.

## Regional Insights

### China
Chinese manufacturers are rapidly advancing in technology and quality, now competing with traditional Japanese brands in the global market.

### Japan
Japanese manufacturers maintain strong positions in high-precision and automotive segments.

### Southeast Asia
Emerging as a hub for consumer electronics manufacturing, driving local demand.

## Conclusion

The crystal resonator industry is adapting to meet the demands of next-generation electronics. Quality, reliability, and miniaturization remain the key focus areas for manufacturers worldwide.
    `,
    image: '/images/article-industry-trends-2026_001.jpg',
  },
  {
    slug: 'tongjing-aec-q100-certification',
    title: 'TongJing Electronics Achieves AEC-Q100 Certification',
    category: 'company',
    date: '2026-02-28',
    author: 'China NewChip',
    excerpt: 'Congratulations to our RTC module product line for successfully passing AEC-Q100 automotive certification. This milestone confirms our commitment to automotive-grade quality standards.',
    content: `
## Certification Achievement

We are proud to announce that TongJing Electronics' RTC module product line has successfully achieved AEC-Q100 certification, a critical milestone for automotive electronics components.

## What is AEC-Q100?

AEC-Q100 is the automotive-grade stress test qualification for integrated circuits. For crystal resonators and oscillators, it ensures:

- **Temperature Range**: Operation from -40°C to +125°C
- **Reliability**: Passed rigorous life-cycle testing
- **Quality**: Manufactured under strict quality control systems
- **Documentation**: Complete traceability and failure analysis capability

## Certification Process

The certification process involved:

1. **Design Verification**: Rigorous analysis of design margins and reliability
2. ** wafer-level Testing**: Comprehensive electrical characterization
3. **Packaging Stress Tests**: Mechanical and thermal stress testing
4. **Reliability Monitoring**: Extended life testing under various conditions
5. **Audit**: Quality system audit by independent laboratory

## Product Line

Our certified RTC modules include:

| Model | Package | Frequency | Temp Range |
|-------|---------|-----------|------------|
| TJ3215RT | 3215 | 32.768kHz | -40°C to +125°C |
| TJ2012RT | 2012 | 32.768kHz | -40°C to +125°C |

## Automotive Applications

These certified modules are ideal for:
- Body control modules
- Instrument clusters
- ADAS systems
- Infotainment systems
- Telematics

## Quality Commitment

This certification reinforces our commitment to providing automotive-grade electronic components that meet the highest standards of reliability and performance.
    `,
    image: '/images/article-aec-q100-certification_001.jpg',
  },
  {
    slug: 'crystal-resonator-package-selection',
    title: 'How to Choose the Right Crystal Resonator Package',
    category: 'tech',
    date: '2026-02-20',
    author: 'Technical Support Team',
    excerpt: 'Crystal resonator package selection requires considering factors such as board space, frequency range, and accuracy requirements. This guide helps you make the right choice for your application.',
    content: `
## Understanding Package Sizes

Crystal resonators come in standardized surface-mount packages. The package size indicates the dimensions in millimeters:
- **3225**: 3.2 × 2.5 × 0.8mm
- **2520**: 2.5 × 2.0 × 0.65mm
- **2016**: 2.0 × 1.6 × 0.5mm
- **1610**: 1.6 × 1.0 × 0.35mm

## Selection Criteria

### 1. Board Space Constraints

Modern electronics demand increasingly compact designs. Consider:

| Application | Recommended Package |
|------------|-------------------|
| Smartphones | 1610, 2016 |
| Wearables | 1610, 2016 |
| Tablets | 2016, 2520 |
| Industrial | 2520, 3225 |
| Automotive | 2520, 3225 |

### 2. Frequency Requirements

Different packages support different frequency ranges:

- **1610**: Best for 24MHz - 50MHz
- **2016**: 16MHz - 50MHz
- **2520**: 12MHz - 50MHz
- **3225**: 8MHz - 50MHz (most versatile)

### 3. ESR Considerations

Smaller packages typically have higher ESR:

| Package | Typical ESR (26MHz) |
|---------|---------------------|
| 3225 | 30Ω |
| 2520 | 40Ω |
| 2016 | 50Ω |
| 1610 | 60Ω |

### 4. Temperature Range

Automotive and industrial applications may require extended temperature range:

- **Consumer**: -20°C to +70°C
- **Industrial**: -40°C to +85°C
- **Automotive**: -40°C to +125°C

## Practical Recommendations

### High-Precision Applications
Choose 3225 or 2520 packages with tight tolerance (±10ppm) for best performance.

### Space-Constrained Designs
Opt for 2016 or 1610 packages in compact devices. Modern manufacturing ensures reliable solderability despite smaller size.

### High-Frequency Applications
For frequencies above 40MHz, 3225 packages offer the best ESR performance.

### Cost-Sensitive Projects
Larger packages (3225) are typically more economical due to established manufacturing processes.

## Conclusion

Package selection is a balance between size constraints, performance requirements, and cost considerations. When in doubt, consult with our technical team for recommendations specific to your application.
    `,
    image: '/images/article-package-selection_001.jpg',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter((a) => a.category === category);
}

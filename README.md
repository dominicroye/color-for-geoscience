# 🎨 GeoPalettes: Color Palettes for Geosciences

> An open, collaborative collection of color palettes for scientific visualization of geophysical and climatological variables.

[![Palettes](https://img.shields.io/badge/palettes-50-blue)](#palette-index)
[![Variables](https://img.shields.io/badge/variables-26-green)](#variables)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

---

## 📋 Table of Contents

- [Purpose](#-purpose)
- [Palette Types](#-palette-types)
- [Metadata Schema](#️-palette-metadata-schema)
- [Interactive Explorer](#️-interactive-explorer)
- [Palette Index](#-palette-index)
  - [🌡️ Temperature](#️-temperature)
  - [🌡️ Temperature Anomaly](#️-temperature-anomaly)
  - [🌊 Sea Surface Temperature](#-sea-surface-temperature)
  - [🌧️ Precipitation](#️-precipitation)
  - [🏔️ Elevation](#️-elevation)
  - [💨 Wind](#-wind)
  - [💧 Humidity & Moisture](#-humidity--moisture)
  - [🌿 Vegetation](#-vegetation)
  - [🌫️ Air Quality](#️-air-quality)
  - [☀️ Radiation](#️-radiation)
  - [🌋 Seismicity](#-seismicity)
  - [🌵 Drought](#-drought)
  - [🛰️ ECMWF — Atmospheric Variables](#️-ecmwf--atmospheric-variables)
- [Usage](#-usage)
  - [R](#r)
  - [Python](#python)
  - [Google Earth Engine](#google-earth-engine)
  - [CSS](#css)
- [Contributing](#-contributing)
- [License](#-license)
- [Author & Contact](#️-author--contact)

---

## 🌍 Purpose

GeoPalettes aims to build an open, well-documented collection of color palettes for geoscientific visualization. Each palette is accompanied by structured metadata covering: the primary variable, type (sequential, diverging, qualitative), recommended value range, color blindness safety, suggested contexts, and cross-variable utility.

**Design principles:**

- **Scientifically meaningful** — colors encode physical meaning (cold = blue, dry = brown, dense vegetation = green)
- **Contextually appropriate** — sequential for absolute values, diverging for anomalies and indices centered on zero
- **Accessible** — color blindness safety flagged for every palette
- **Interoperable** — HEX codes ready for R, Python, CSS, QGIS, GEE

---

## 📐 Palette Types

| Type | When to use | Examples |
|---|---|---|
| **Sequential** | Absolute values with a natural minimum | Precipitation totals, wind speed, AQI |
| **Diverging** | Anomalies, indices, values with a meaningful center | Temperature anomaly, SPI, NDVI, RH |
| **Qualitative** | Categorical / land cover classes | Land use, climate zones |
| **Bivariate** | Two simultaneous variables | Drought severity × frequency |

> **Note on NDVI:** Although NDVI spans −1 to 1, it should be treated as **diverging** when mapping anomalies around a climatological mean, with the neutral point at the mean, not at zero. When mapping raw greenness (0 to 1), a sequential palette is more appropriate.

---

## 🗂️ Palette Metadata Schema

Each palette JSON file follows this schema:

```json
{
  "id": "palette-id",
  "name": "Human-readable name",
  "variable": "primary variable",
  "type": "sequential | diverging | qualitative | bivariate",
  "blindsafe": true,
  "range": "min to max with units",
  "center": null,
  "context": "Recommended use case description",
  "also_useful": ["other variable 1", "other variable 2"],
  "theme": "Visual description of the color journey",
  "notes": "Optional scientific or design notes",
  "author": "Author name or handle",
  "license": "CC BY 4.0",
  "colors": ["#HEX1", "#HEX2", "..."]
}
```

The `center` field is `null` for sequential palettes and contains the divergence point value (e.g., `0`, `50`) for diverging palettes.

---

## 🖥️ Interactive Explorer

Open `index.html` locally or visit [https://dominicroye.github.io/color-for-geoscience/](https://dominicroye.github.io/color-for-geoscience/) to browse, filter, and export all palettes with code snippets for R, Python, and CSS.

---

## 📊 Palette Index

### 🌡️ Temperature

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| ThermClassic | diverging | −30 to 50 °C | ✅ | GeoPalettes |
| NWS Temperature | sequential | −51 to 66 °C | ⚠️ | Emily Meriam |
| Desert Heat | sequential | 0 to 60 °C | ⚠️ | GeoPalettes |
| Arctic Chill | sequential | −50 to 0 °C | ✅ | GeoPalettes |
| ECMWF Rainbow Purple–Red (25) | sequential | approx −50 to +50 °C | ⚠️ | ECMWF |
| ECMWF Rainbow Purple–Red (15) | sequential | approx −40 to +40 °C | ⚠️ | ECMWF |

### 🌡️ Temperature Anomaly

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| ECMWF Blue–White–Red Diverging (9) | diverging | negative to positive anomaly | ⚠️ | ECMWF |
| ECMWF Blue–White–Red Diverging (20) | diverging | negative to positive anomaly | ⚠️ | ECMWF |

### 🌊 Sea Surface Temperature

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| SST Pacific | sequential | 0 to 32 °C | ✅ | GeoPalettes |
| ECMWF Sea Surface Temperature (17) | sequential | −2 to +35 °C | ⚠️ | ECMWF |

### 🌧️ Precipitation

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Rain Blues | sequential | 0 to 300 mm | ✅ | GeoPalettes |
| Drought Index | diverging | −3 to 3 SPI | ✅ | GeoPalettes |
| Teal Cascade | sequential | 0 to 200 mm | ✅ | dominicroye |
| Lichen & Slate | sequential | 0 to 400 mm | ✅ | dominicroye |
| Mist & Violet | sequential | 0 to 500 mm | ⚠️ | dominicroye |
| Tropical Burst | sequential | 0 to 600 mm | ⚠️ | dominicroye |
| Meadow & Dusk | sequential | 0 to 300 mm | ⚠️ | dominicroye |
| Monsoon Burst | sequential | 0 to 500 mm/day | ⚠️ | GeoPalettes |
| Snowfall | sequential | 0 to 100 cm | ✅ | GeoPalettes |
| ECMWF Precipitation | sequential | 0 to ~100 mm | ⚠️ | ECMWF |
| ECMWF Precipitation Blue–Orange (20) | sequential | 0 to ~200 mm/24h | ⚠️ | ECMWF |

### 🏔️ Elevation

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Terrain Natural | sequential | −11000 to 8849 m | ⚠️ | GeoPalettes |
| Bathymetry | sequential | −11000 to 0 m | ✅ | GeoPalettes |
| Hypsometric Tint | sequential | 0 to 8849 m | ⚠️ | GeoPalettes |
| Hypsometric Warm Brown | diverging | −8000 to +4000 m | ⚠️ | — |
| Hypsometric Classic Green-Yellow | diverging | −8000 to +4000 m | ⚠️ | — |

### 💨 Wind

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Wind Speed | sequential | 0 to 60 m/s | ✅ | GeoPalettes |
| Storm Alert | sequential | 0 to 100 kt | ⚠️ | GeoPalettes |
| ECMWF Wind Speed Rainbow–Grey (30) | sequential | 0 to ~50 m/s | ⚠️ | ECMWF |

### 💧 Humidity & Moisture

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| RH Classic | diverging | 0 to 100 % | ✅ | GeoPalettes |
| Soil Moisture | sequential | 0 to 1 m³/m³ | ✅ | GeoPalettes |
| ECMWF Green–Blue Humidity (12) | sequential | 0 to 100 % | ⚠️ | ECMWF |
| ECMWF Soil Moisture (12) | sequential | 0 to 1 vol. fraction | ⚠️ | ECMWF |

### 🌿 Vegetation

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| NDVI Green | diverging | −1 to 1 | ⚠️ | GeoPalettes |
| EVI Tropical | sequential | 0 to 0.8 EVI | ✅ | GeoPalettes |

### 🌫️ Air Quality

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| AQI Standard | sequential | 0 to 500 AQI | ⚠️ | GeoPalettes |
| PM2.5 Exposure | sequential | 0 to 150 μg/m³ | ✅ | GeoPalettes |

### ☀️ Radiation

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Solar Rad | sequential | 0 to 1000 W/m² | ✅ | GeoPalettes |

### 🌋 Seismicity

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Seismic Intensity | sequential | I to XII MMI | ⚠️ | GeoPalettes |

### 🌵 Drought

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| Drought Monitor Bivariate | bivariate | severity × frequency | ⚠️ | John Nelson |

### 🛰️ ECMWF — Atmospheric Variables

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| ECMWF CAPE (10) | sequential | 0 to ~5000 J/kg | ⚠️ | ECMWF |
| ECMWF EFI Blue–Red (10) | diverging | −1 to +1 | ⚠️ | ECMWF |
| ECMWF Geopotential 500 hPa (11) | sequential | 488 to 600 dam | ⚠️ | ECMWF |
| ECMWF Probability (10) | sequential | 0 to 100 % | ⚠️ | ECMWF |
| ECMWF Cloud Cover Grey (20) | sequential | 0 to 1 fraction | ✅ | ECMWF |
| ECMWF Snow/Ice White–Blue (15) | sequential | 0 to ~3 m | ⚠️ | ECMWF |
| ECMWF Wave Height (10) | sequential | 0 to ~15 m | ⚠️ | ECMWF |
| ECMWF Aerosol Optical Depth Yellow–Brown (14) | sequential | 0 to ~2 AOD | ⚠️ | ECMWF |
| ECMWF GEFF Fire Weather Index | sequential | 0 to ~100+ FWI | ⚠️ | ECMWF |
| ECMWF Visibility Red–White (10) | sequential | 0 to >10 km | ⚠️ | ECMWF |

---

## 💻 Usage

### R

```r
# Copy any HEX vector from palettes.json or the web app
teal_cascade <- c("#d1eeea","#a8dbd9","#85c4c9","#68abb8","#4f90a6","#3b738f","#2a5674")

# ggplot2
library(ggplot2)
ggplot(data, aes(x, y, fill = precip)) +
  scale_fill_gradientn(colours = teal_cascade)

# Continuous interpolation
pal_fn  <- colorRampPalette(teal_cascade)
pal256  <- pal_fn(256)

# For diverging palettes set the midpoint
library(scales)
scale_fill_gradientn(
  colours = c("#003c30","#f5f5f5","#543005"),  # drought_index extremes + center
  values  = rescale(c(-3, 0, 3))
)
```

### Python

```python
from matplotlib.colors import LinearSegmentedColormap
import matplotlib.pyplot as plt

teal_cascade = ["#d1eeea","#a8dbd9","#85c4c9","#68abb8","#4f90a6","#3b738f","#2a5674"]
cmap = LinearSegmentedColormap.from_list("teal_cascade", teal_cascade)

plt.imshow(data, cmap=cmap, vmin=0, vmax=200)
plt.colorbar(label="Precipitation (mm)")
```

### Google Earth Engine

```javascript
var tealCascade = ['d1eeea','a8dbd9','85c4c9','68abb8','4f90a6','3b738f','2a5674'];

Map.addLayer(precipImage, {
  min: 0, max: 200,
  palette: tealCascade
}, 'Monthly Precipitation');
```

### CSS

```css
.precip-bar {
  background: linear-gradient(
    to right,
    #d1eeea 0%, #a8dbd9 17%, #85c4c9 33%,
    #68abb8 50%, #4f90a6 67%, #3b738f 83%, #2a5674 100%
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! To add a new palette:

1. Fork this repository
2. Add your palette to `app/palettes.json` following the metadata schema.
3. Open a pull request describing the variable, context, and design rationale

**Guidelines:**
- Provide at least 5 color stops (7+ recommended)
- Document whether the palette is safe for deuteranopia / protanopia (tools: [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/), [CVD Simulate in R](https://github.com/clauswilke/colorblindr))
- Specify units and a realistic value range
- For diverging palettes, always document the center value and what it represents physically
- Anomaly maps should use **diverging** palettes; absolute value maps should use **sequential** palettes

---

## 📜 License

All palettes are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).  
Please credit the author field when redistributing individual palettes.

---

## ✍️ Author & Contact

Maintained by [@dominicroye](https://github.com/dominicroye) · [dominicroye.github.io](https://dominicroye.github.io)  
Researcher at MBG-CSIC · Climatology & Geoscience Data Visualization

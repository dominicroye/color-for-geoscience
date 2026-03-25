# 🎨 GeoPalettes: Color Palettes for Geosciences

> An open, collaborative collection of color palettes for scientific visualization of geophysical and climatological variables.

[![Version](https://img.shields.io/badge/version-1.3.0-informational?style=flat-square)](CHANGELOG.md)
[![Palettes](https://img.shields.io/badge/palettes-61-blue)](#palette-index)
[![Variables](https://img.shields.io/badge/variables-38-green)](#variables)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

---

## 📋 Table of Contents

- [Purpose](#-purpose)
- [Palette Types](#-palette-types)
- [Metadata Schema](#️-palette-metadata-schema)
- [Perceptual Uniformity](#-perceptual-uniformity)
- [Interactive Explorer](#️-interactive-explorer)
- [Palette Index](#-palette-index)
  - [🌡️ Temperature](#️-temperature)
  - [🌡️ Temperature Anomaly](#️-temperature-anomaly)
  - [🌊 Sea Surface Temperature](#-sea-surface-temperature)
  - [🌧️ Precipitation](#️-precipitation)
  - [📡 Radar Nowcasting](#-radar-nowcasting)
  - [🏔️ Elevation](#️-elevation)
  - [💨 Wind](#-wind)
  - [💧 Humidity & Moisture](#-humidity--moisture)
  - [🌿 Vegetation](#-vegetation)
  - [🌫️ Air Quality](#️-air-quality)
  - [☀️ Radiation](#️-radiation)
  - [🌋 Seismicity](#-seismicity)
  - [🌵 Drought](#-drought)
  - [🔬 Scientific Colour Maps (Crameri)](#-scientific-colour-maps-crameri)
  - [🛰️ ECMWF — Atmospheric Variables](#️-ecmwf--atmospheric-variables)
- [Usage](#-usage)
  - [R](#r)
  - [Python](#python)
  - [Google Earth Engine](#google-earth-engine)
  - [QGIS](#qgis)
  - [CSS](#css)
- [Contributing](#-contributing)
- [License](#-license)
- [Changelog](#-changelog)
- [Author & Contact](#️-author--contact)

---

## 🌍 Purpose

GeoPalettes aims to build an open, well-documented collection of color palettes for geoscientific visualization. Each palette is accompanied by structured metadata covering: the primary variable, type (sequential, diverging, qualitative), recommended value range, color blindness safety, perceptual uniformity score, suggested contexts, and cross-variable utility.

**Design principles:**

- **Scientifically meaningful** — colors encode physical meaning (cold = blue, dry = brown, dense vegetation = green)
- **Contextually appropriate** — sequential for absolute values, diverging for anomalies and indices centered on zero
- **Accessible** — color blindness safety flagged for every palette
- **Perceptually grounded** — CIELAB ΔE76 uniformity computed for every palette
- **Interoperable** — HEX codes ready for R, Python, CSS, QGIS, GEE

---

## 📐 Palette Types

| Type | When to use | Examples |
|---|---|---|
| **Sequential** | Absolute values with a natural minimum | Precipitation totals, wind speed, AQI |
| **Diverging** | Anomalies, indices, values with a meaningful center | Temperature anomaly, SPI, NDVI, RH |
| **Qualitative** | Categorical / cyclic data (e.g. wind direction) | Land use, climate zones, wind bearing |
| **Bivariate** | Two simultaneous variables | Drought severity × frequency |

> **Note on NDVI:** Although NDVI spans −1 to 1, it should be treated as **diverging** when mapping anomalies around a climatological mean, with the neutral point at the mean, not at zero. When mapping raw greenness (0 to 1), a sequential palette is more appropriate.

---

## 🗂️ Palette Metadata Schema

Each palette entry in `palettes.json` follows this schema:

```json
{
  "id": "palette-id",
  "name": "Human-readable name",
  "variable": "primary variable",
  "type": "sequential | diverging | qualitative | bivariate",
  "blindsafe": true,
  "perceptually_uniform": false,
  "uniformity_cv": 0.213,
  "range": "min to max with units",
  "center": null,
  "context": "Recommended use case description",
  "also_useful": ["other variable 1", "other variable 2"],
  "theme": "Visual description of the color journey",
  "notes": "Optional scientific or design notes",
  "author": "Author name or handle",
  "license": "CC BY 4.0",
  "source": "https://...",
  "colors": ["#HEX1", "#HEX2", "..."]
}
```

The `center` field is `null` for sequential palettes and contains the divergence point value (e.g., `0`, `50`) for diverging palettes.

---

## 🔬 Perceptual Uniformity

The `perceptually_uniform` flag and `uniformity_cv` value are computed automatically for every palette using **CIELAB ΔE76**:

1. Each hex stop is converted to CIELAB via linearised sRGB → XYZ D65 → L\*a\*b\*.
2. ΔE76 (Euclidean distance in CIELAB) is computed between each pair of consecutive stops.
3. The **coefficient of variation** (CV = σ/μ) of those ΔE steps is stored as `uniformity_cv`.
4. `perceptually_uniform = true` when CV < 0.20 (perceptual steps vary by less than ±20% of the mean).

For **diverging** palettes, each arm is evaluated independently; both must pass. For **bivariate** palettes, the flag is always `false`.

> **Note:** analysis is run on the stored control points. Palettes designed for perceptual uniformity (e.g. Crameri Scientific Colour Maps) will score higher when evaluated at full 256-sample resolution.

---

## 🖥️ Interactive Explorer

Open `index.html` locally or visit [https://dominicroye.github.io/color-for-geoscience/](https://dominicroye.github.io/color-for-geoscience/) to browse, filter, and export all palettes with code snippets for R, Python, and CSS.

The app includes filters for variable, palette type, blindsafe, and **perceptually uniform**, plus full-text search across name, variable, theme, context, and `also_useful` tags.

---

## 📊 Palette Index

### 🌡️ Temperature

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| ThermClassic | diverging | −30 to 50 °C | ✅ | — | GeoPalettes |
| NWS Temperature | sequential | −51 to 66 °C | ⚠️ | — | Emily Meriam |
| Desert Heat | sequential | 0 to 60 °C | ⚠️ | ✅ | GeoPalettes |
| Arctic Chill | sequential | −50 to 0 °C | ✅ | ✅ | GeoPalettes |

> ECMWF Rainbow Purple–Red palettes removed in v1.3.0 — not perceptually uniform and not CVD-accessible. Use **Crameri Vik** for temperature anomaly or **Arctic Chill / Desert Heat** for absolute values.

### 🌡️ Temperature Anomaly

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| ECMWF Blue–White–Red (9) | diverging | negative to positive anomaly | ⚠️ | — | ECMWF |
| ECMWF Blue–White–Red (20) | diverging | negative to positive anomaly | ⚠️ | — | ECMWF |

### 🌊 Sea Surface Temperature

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| SST Pacific | sequential | 0 to 32 °C | ✅ | — | GeoPalettes |
| ECMWF Sea Surface Temperature (17) | sequential | −2 to +35 °C | ⚠️ | — | ECMWF |

### 🌧️ Precipitation

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Rain Blues | sequential | 0 to 300 mm | ✅ | — | GeoPalettes |
| Drought Index | diverging | −3 to 3 SPI | ✅ | ✅ | GeoPalettes |
| Teal Cascade | sequential | 0 to 200 mm | ✅ | ✅ | dominicroye |
| Lichen & Slate | sequential | 0 to 400 mm | ✅ | — | dominicroye |
| Mist & Violet | sequential | 0 to 500 mm | ⚠️ | — | dominicroye |
| Tropical Burst | sequential | 0 to 600 mm | ⚠️ | — | dominicroye |
| Meadow & Dusk | sequential | 0 to 300 mm | ⚠️ | — | dominicroye |
| Monsoon Burst | sequential | 0 to 500 mm/day | ⚠️ | ✅ | GeoPalettes |
| Snowfall | sequential | 0 to 100 cm | ✅ | ✅ | GeoPalettes |
| ECMWF Precipitation | sequential | 0 to ~100 mm | ⚠️ | — | ECMWF |
| ECMWF Precipitation Blue–Orange (20) | sequential | 0 to ~200 mm/24h | ⚠️ | — | ECMWF |

### 📡 Radar Nowcasting

Operational radar precipitation color scales from the [pysteps](https://github.com/pySTEPS/pysteps) nowcasting library (BSD-3-Clause). Designed for real-time radar rainfall products and **not** CVD-safe, but included for operational interoperability.

| Name | Type | Range | Blindsafe | Source | Author |
|---|---|---|---|---|---|
| pysteps Default | sequential | 0.08 to 160 mm/h | ⚠️ | pysteps | pysteps developers |
| pysteps BOM-RF3 | sequential | 0 to 150 mm/h | ⚠️ | Bureau of Meteorology (AUS) | pysteps developers |
| pysteps STEPS-NL | sequential | 0.1 to 40 mm/h | ⚠️ | KNMI (Netherlands) | pysteps developers |
| pysteps STEPS-BE | sequential | 0.1 to 100 mm/h | ⚠️ | RMI (Belgium) | pysteps developers |

### 🏔️ Elevation

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Bathymetry | sequential | −11000 to 0 m | ✅ | ✅ | GeoPalettes |
| Hypsometric Tint | sequential | 0 to 8849 m | ⚠️ | ✅ | GeoPalettes |

> Removed in v1.3.0: **Terrain Natural** (non-monotone L\*, impossible to make uniform while preserving semantics), **Hypsometric Warm Brown** and **Hypsometric Classic Green-Yellow** (diverging structure with CV ≈ 1.0). **Hypsometric Tint** re-optimised to CV=0.19 using equal-step LAB interpolation across four anchors: lowland green → mid-elevation tan → bare-rock brown → alpine scree → summit white.

### 💨 Wind

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Wind Speed | sequential | 0 to 60 m/s | ✅ | — | GeoPalettes |
| Storm Alert | sequential | 0 to 100 kt | ⚠️ | — | GeoPalettes |

> ECMWF Wind Speed Rainbow–Grey removed in v1.3.0. For wind direction use **Crameri VikO** (cyclic, CVD-safe).

### 💧 Humidity & Moisture

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| RH Classic | diverging | 0 to 100 % | ✅ | — | GeoPalettes |
| Soil Moisture | sequential | 0 to 1 m³/m³ | ✅ | ✅ | GeoPalettes |
| ECMWF Green–Blue Humidity (12) | sequential | 0 to 100 % | ⚠️ | — | ECMWF |
| ECMWF Soil Moisture (12) | sequential | 0 to 1 vol. fraction | ⚠️ | — | ECMWF |

### 🌿 Vegetation

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| EVI Tropical | sequential | 0 to 0.8 EVI | ✅ | — | GeoPalettes |

> NDVI Green removed in v1.3.0 — red–green diverging combination is inaccessible for deuteranopia/protanopia. Use **Crameri Broc** for NDVI anomaly (diverging, CVD-safe) or **EVI Tropical** for absolute greenness.

### 🌫️ Air Quality

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| AQI Standard | sequential | 0 to 500 AQI | ⚠️ | — | GeoPalettes |
| PM2.5 Exposure | sequential | 0 to 150 μg/m³ | ✅ | — | GeoPalettes |

### ☀️ Radiation

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Solar Rad | sequential | 0 to 1000 W/m² | ✅ | — | GeoPalettes |

### 🌋 Seismicity

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Seismic Intensity | sequential | I to XII MMI | ⚠️ | — | GeoPalettes |

### 🌵 Drought

| Name | Type | Range | Blindsafe | Uniform | Author |
|---|---|---|---|---|---|
| Drought Severity | sequential | D0 (abnormally dry) to D4 (exceptional) | ⚠️ | ✅ | John Nelson |

### 🔬 Scientific Colour Maps (Crameri)

Selected from [Scientific Colour Maps](https://doi.org/10.5281/zenodo.1243862) (Crameri 2018, MIT). Only palettes with a clear, non-redundant geoscientific use case are included. All are designed for perceptual uniformity, CVD accessibility, and device independence.

| Name | Type | Variable | Blindsafe | Author |
|---|---|---|---|---|
| Batlow | sequential | Multi-variable (rainbow replacement) | ✅ | Fabio Crameri |
| Oslo | sequential | Snow cover, sea ice, albedo | ✅ | Fabio Crameri |
| Lajolla | sequential | Aridity, drought severity, VPD | ✅ | Fabio Crameri |
| Davos | sequential | Geopotential height, pressure layers | ✅ | Fabio Crameri |
| Hawaii | sequential | Geological mapping, lithology | ✅ | Fabio Crameri |
| Turku | sequential | CAPE, OLR, thermal emissivity | ✅ | Fabio Crameri |
| GrayC | sequential | DEM hillshade, SAR backscatter, radar | ✅ | Fabio Crameri |
| Vik | diverging | Temperature anomaly, SST anomaly, ENSO | ✅ | Fabio Crameri |
| Cork | diverging | Ocean salinity anomaly, seawater pH | ✅ | Fabio Crameri |
| Lisbon | diverging | SPI, PDSI, discharge anomaly | ✅ | Fabio Crameri |
| Berlin | diverging | Relative vorticity, wind divergence | ✅ | Fabio Crameri |
| Broc | diverging | NDVI anomaly, greening/browning trends | ✅ | Fabio Crameri |
| Tofino | diverging | Sea surface height anomaly, ocean eddies | ✅ | Fabio Crameri |
| VikO | qualitative | Wind direction, current bearing, slope aspect | ✅ | Fabio Crameri |

### 🛰️ ECMWF — Atmospheric Variables

| Name | Type | Range | Blindsafe | Author |
|---|---|---|---|---|
| ECMWF CAPE (10) | sequential | 0 to ~5000 J/kg | ⚠️ | ECMWF |
| ECMWF EFI Blue–Red (10) | diverging | −1 to +1 | ⚠️ | ECMWF |
| ECMWF Geopotential 500 hPa (11) | sequential | 488 to 600 dam | ⚠️ | ECMWF |
| ECMWF Probability (10) | sequential | 0 to 100 % | ✅ | ECMWF |
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
  colours = c("#003c30","#f5f5f5","#543005"),
  values  = rescale(c(-3, 0, 3))
)
```

### Python

```python
import json
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

def load_palette(json_path, palette_name):
    """Loads a color palette from the JSON file by its name."""
    with open(json_path, 'r') as f:
        palettes = json.load(f)
    
    # Filter to find the palette by name
    try:
        data = next(p for p in palettes if p['name'] == palette_name)
        return LinearSegmentedColormap.from_list(data['id'], data['colors'])
    except StopIteration:
        raise ValueError(f"Palette '{palette_name}' not found in {json_path}")

# Example Usage:
# cmap = load_palette('palettes.json', 'ECMWF Blue–White–Red Diverging (9)')
# plt.imshow(data, cmap=cmap)
```

### Google Earth Engine

```javascript
var tealCascade = ['d1eeea','a8dbd9','85c4c9','68abb8','4f90a6','3b738f','2a5674'];

Map.addLayer(precipImage, {
  min: 0, max: 200,
  palette: tealCascade
}, 'Monthly Precipitation');
```

### QGIS

Use the bundled QGIS style library at [`app/color-for-geoscience.xml`](app/color-for-geoscience.xml) to import all GeoPalettes ramps into your QGIS style database.

1. Download [`app/color-for-geoscience.xml`](app/color-for-geoscience.xml) from the repository.
2. In QGIS, open **Settings > Style Manager...**
3. Choose **Color ramp** in the left panel.
4. Select **Import/Export > Import Items...**
5. Open `color-for-geoscience.xml` and import the ramps you want.
6. Open a raster or vector layer's symbology panel and pick the imported ramp.

Tips:
- Use the **Interpolated** renderer for continuous raster or graduated vector data.
- For anomaly maps, choose diverging ramps and set the midpoint to the physical neutral value.
- For stepped classes, switch the interpolation to discrete after selecting the ramp.

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

1. Fork this repository.
2. Add your palette to `palettes.json` following the schema above.
3. Open a pull request describing the variable, context, and design rationale.

**Guidelines:**
- Provide at least 5 color stops (7+ recommended).
- Document whether the palette is safe for deuteranopia / protanopia (tools: [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/), [colorblindr](https://github.com/clauswilke/colorblindr) in R).
- Specify units and a realistic value range.
- For diverging palettes, document the center value and what it represents physically.
- The `perceptually_uniform` and `uniformity_cv` fields will be recomputed automatically.

---

## 📜 License

All original GeoPalettes content is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).  
Third-party palettes retain their original licenses — MIT for Crameri; Apache-2.0 for ECMWF; BSD-3-Clause for pysteps.  
See individual palette entries for per-palette `license` and `source` fields.

---

## 📋 Changelog

### v1.3.0
- Removed 3 ECMWF Rainbow palettes (not perceptually uniform, not CVD-accessible): Rainbow Purple–Red (25), Rainbow Purple–Red (15), Wind Speed Rainbow–Grey (30)
- Removed NDVI Green (red–green diverging, inaccessible for deuteranopia/protanopia) — replaced by Crameri Broc
- Removed 3 hypsometric palettes: Terrain Natural (non-monotone L\*), Hypsometric Warm Brown and Classic Green-Yellow (diverging, CV ≈ 1.0)
- Re-optimised Hypsometric Tint from CV=0.72 → CV=0.19 using equal-step LAB interpolation with rock-scree anchor; now `perceptually_uniform: true`
- Fixed Drought Severity: corrected type `bivariate` → `sequential`; colours re-optimised for perceptual uniformity (CV=0.12)

### v1.2.0
- Added 14 palettes from Fabio Crameri's Scientific Colour Maps (MIT): Batlow, Oslo, Lajolla, Davos, Hawaii, Turku, GrayC, Vik, Cork, Lisbon, Berlin, Broc, Tofino, VikO
- Added version badge to the web app header

### v1.1.0
- Added 4 radar nowcasting palettes from pysteps (BSD-3-Clause): Default, BOM-RF3, STEPS-NL, STEPS-BE
- Added `perceptually_uniform` flag (CIELAB ΔE76 CV < 0.20) to all palettes
- Added `uniformity_cv` diagnostic field
- Added ◎ Perceptually uniform filter chip and badge in the web app

### v1.0.0
- Initial release: 50 palettes across temperature, precipitation, wind, humidity, vegetation, elevation, SST, air quality, radiation, seismicity, drought, and ECMWF operational variables
- Interactive web app with variable chips, type filters, search, and code export (R/Python/CSS)

---

## ✍️ Author & Contact

Maintained by [@dominicroye](https://github.com/dominicroye) · [dominicroye.github.io](https://dominicroye.github.io)  
Researcher at MBG-CSIC · Bioclimatology & Global Change Group | Geoscience Data Visualization

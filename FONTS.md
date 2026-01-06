# re.build Typography System

## Font Family

**Primary:** Neue Montreal (by Pangram Pangram)
- Clean, modern grotesque sans-serif
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)

```css
font-family: 'Neue Montreal', system-ui, sans-serif;
```

> **Note:** Neue Montreal is a premium font. Font files must be self-hosted (not available via CDN).

---

## Type Scale

All sizes use fluid typography with `clamp()` for smooth scaling between mobile (375px) and desktop (1440px).

### Headings

| Class | Size (mobile → desktop) | Weight | Line Height | Letter Spacing | Usage |
|-------|-------------------------|--------|-------------|----------------|-------|
| `.heading-xl` | 2.5rem → 4rem | 700 | 1.1 | -0.02em | Hero headlines |
| `.heading-l` | 2rem → 3rem | 700 | 1.15 | -0.02em | Section headings |
| `.heading-m` | 1.5rem → 2rem | 600 | 1.2 | -0.01em | Subsection headings |
| `.heading-s` | 1.125rem → 1.25rem | 600 | 1.3 | -0.01em | Card titles, labels |

### Body

| Class | Size (mobile → desktop) | Weight | Line Height | Letter Spacing | Usage |
|-------|-------------------------|--------|-------------|----------------|-------|
| `.body-l` | 1.125rem → 1.25rem | 400 | 1.6 | 0 | Lead paragraphs, intros |
| `.body-m` | 1rem → 1.125rem | 400 | 1.6 | 0 | Primary body text |
| `.body-s` | 0.875rem | 400 | 1.5 | 0 | Captions, fine print |

### Utility

| Class | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `.label` | 0.75rem | 500 | 1.4 | Form labels, tags |
| `.nav` | 0.875rem | 500 | 1 | Navigation links |
| `.button` | 0.875rem → 1rem | 500 | 1 | Button text |

---

## CSS Implementation

```css
/* Headings */
.heading-xl {
  font-size: clamp(2.5rem, 5vw + 1rem, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.heading-l {
  font-size: clamp(2rem, 3vw + 1rem, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.heading-m {
  font-size: clamp(1.5rem, 2vw + 0.5rem, 2rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.heading-s {
  font-size: clamp(1.125rem, 1vw + 0.5rem, 1.25rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

/* Body */
.body-l {
  font-size: clamp(1.125rem, 0.5vw + 1rem, 1.25rem);
  font-weight: 400;
  line-height: 1.6;
}

.body-m {
  font-size: clamp(1rem, 0.25vw + 0.9rem, 1.125rem);
  font-weight: 400;
  line-height: 1.6;
}

.body-s {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

/* Utility */
.label {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Design Principles

1. **Tight headings, relaxed body** — Negative letter-spacing on headings for impact, neutral on body for readability.

2. **Fluid, not breakpoint** — Sizes scale smoothly. No jarring jumps at arbitrary breakpoints.

3. **Limited scale** — 4 heading sizes, 3 body sizes. Enough hierarchy without chaos.

4. **Weight for emphasis** — Use weight (500, 600, 700) over size to create emphasis within a text block.

---

## Usage Guidelines

### Do
- Use `heading-xl` only once per page (the main headline)
- Pair `heading-l` with `body-l` for section intros
- Use `body-m` for all standard content
- Use `body-s` sparingly (captions, legal, metadata)

### Don't
- Mix more than 2 heading sizes in a single section
- Use bold (`700`) for body text emphasis — use `500` instead
- Add extra letter-spacing to body text
- Use heading classes for non-heading elements (use semantic HTML)

---

## Implementation Status

✅ **Migrated** — All typography now uses the named class system.

| Element | Class |
|---------|-------|
| Hero h1 | `.heading-xl` |
| Section h2 | `.heading-l` |
| Card/step h3 | `.heading-s` |
| Lead paragraphs | `.body-l` |
| Body text | `.body-m` |
| Captions/footer | `.body-s` |

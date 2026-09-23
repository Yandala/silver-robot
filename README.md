# RoadReady

RoadReady is a cross-platform Expo / React Native starter app for DIY automotive repair and on-the-road assistance. It is designed for iPhone and Android users who need calm, practical guidance when their vehicle needs attention.

## Included in this first build

- Home dashboard with the selected vehicle
- One-tap roadside help flow
- Symptom shortcuts for battery, tires, overheating, and warning lights
- Quick repair guides
- Vehicle garage with multiple vehicle selection
- Profile and help center area
- Responsive, accessible mobile layout with a high-contrast orange / navy visual system

## Run locally

Install Node.js, then run:

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` for an iOS simulator and `a` for an Android emulator.

## Next production steps

1. Connect the roadside help action to location permissions and a dispatch API.
2. Add authentication and a backend for vehicles, service history, and saved guides.
3. Replace the alert-based guide previews with full step-by-step screens, photos, and safety checks.
4. Add push notifications, mechanic chat, payments, and a real map / ETA experience.

RoadReady is a starting point for a full roadside repair companion; any repair instruction should include appropriate safety warnings and advise calling emergency services when there is immediate danger.

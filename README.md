# khanaGo Navigation Assignment

Expo React Native food delivery UI focused on React Navigation patterns: auth flow, nested stack/tab/drawer navigators, params, deep linking, and programmatic navigation.

## Run with Bun

```bash
bun install
bun run start
```

## Navigation Structure

```text
RootNavigator
|-- AuthNavigator
|   |-- Onboarding
|   `-- Login
`-- AppNavigator (Bottom Tabs)
    |-- HomeTab
    |   `-- HomeStack
    |       |-- Home
    |       |-- RestaurantDetail
    |       `-- Cart
    |-- SearchTab
    |-- OrdersTab
    `-- ProfileTab
        `-- ProfileDrawer
            |-- ProfileHome
            |-- MyOrders
            |-- Settings
            |-- Help
            `-- Logout (custom drawer action)
```

## Requirement Mapping

- `Onboarding -> Login` uses `replace`.
- `Home -> RestaurantDetail -> Cart` uses a stack navigator with a custom header.
- Restaurant cards pass `restaurantName` and `averagePrice` as params.
- `HomeStack` is nested inside the `Home` tab.
- `ProfileDrawer` is nested inside the `Profile` tab.
- The Orders tab shows a badge whenever the cart has items.
- The tab bar hides on `RestaurantDetail` and `Cart`.
- Auth state is persisted with AsyncStorage and restored on reload.
- Checkout uses `reset`; cart actions use `goBack`; screen jumps use `navigate`.
- Deep link `foodapp://restaurant/123` opens the restaurant detail screen directly. If the user is signed out, the app saves the target and opens it after login.

## Deep Link Test

Use:

```text
foodapp://restaurant/123
```

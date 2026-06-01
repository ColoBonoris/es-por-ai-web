import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { PermissionsScreen } from "./components/PermissionsScreen";
import { HomeScreen } from "./components/HomeScreen";
import { MapScreen } from "./components/MapScreen";
import { AIAssistantScreen } from "./components/AIAssistantScreen";
import { MoreScreen } from "./components/MoreScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { AddPlaceScreen } from "./components/AddPlaceScreen";
import { FavoritesScreen } from "./components/FavoritesScreen";
import { PlaceDetailScreen } from "./components/PlaceDetailScreen";
import { WriteReviewScreen } from "./components/WriteReviewScreen";
import { BottomNav } from "./components/BottomNav";

type Screen = "onboarding" | "login" | "register" | "forgot-password" | "permissions" | "main" | "place-detail" | "write-review" | "ai-assistant" | "profile" | "settings" | "add-place" | "favorites";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const handleNavigate = (screen: string, placeId?: string) => {
    if (screen === "place-detail" && placeId) {
      setSelectedPlaceId(placeId);
      setCurrentScreen("place-detail");
    } else if (screen === "ai") {
      setCurrentScreen("ai-assistant");
    } else if (screen === "map") {
      setActiveTab("map");
    } else if (screen === "home") {
      setActiveTab("home");
    } else if (screen === "favorites") {
      setCurrentScreen("favorites");
    } else if (screen === "profile") {
      setCurrentScreen("profile");
    } else if (screen === "settings") {
      setCurrentScreen("settings");
    } else if (screen === "add-place") {
      setCurrentScreen("add-place");
    } else if (screen === "privacy" || screen === "terms") {
      setCurrentScreen("main");
    } else if (screen === "logout") {
      setCurrentScreen("login");
    }
  };

  const showBottomNav = currentScreen === "main";

  return (
    <div className="size-full">
      {currentScreen === "onboarding" && (
        <OnboardingScreen onComplete={() => setCurrentScreen("login")} />
      )}
      {currentScreen === "login" && (
        <LoginScreen
          onLogin={() => setCurrentScreen("permissions")}
          onForgotPassword={() => setCurrentScreen("forgot-password")}
          onRegister={() => setCurrentScreen("register")}
        />
      )}
      {currentScreen === "register" && (
        <RegisterScreen
          onRegister={() => setCurrentScreen("permissions")}
          onLogin={() => setCurrentScreen("login")}
        />
      )}
      {currentScreen === "forgot-password" && (
        <ForgotPasswordScreen
          onBack={() => setCurrentScreen("login")}
          onSubmit={() => setCurrentScreen("login")}
        />
      )}
      {currentScreen === "permissions" && (
        <PermissionsScreen onComplete={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "main" && (
        <>
          {activeTab === "home" && <HomeScreen onNavigate={handleNavigate} />}
          {activeTab === "map" && <MapScreen onNavigate={handleNavigate} />}
          {activeTab === "more" && <MoreScreen onNavigate={handleNavigate} />}
        </>
      )}
      {currentScreen === "ai-assistant" && (
        <AIAssistantScreen
          onBack={() => setCurrentScreen("main")}
          onPlaceClick={(placeId) => {
            setSelectedPlaceId(placeId);
            setCurrentScreen("place-detail");
          }}
        />
      )}
      {currentScreen === "profile" && (
        <ProfileScreen onBack={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "settings" && (
        <SettingsScreen onBack={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "add-place" && (
        <AddPlaceScreen
          onBack={() => setCurrentScreen("main")}
          onSubmit={() => {
            setCurrentScreen("main");
            setActiveTab("more");
          }}
        />
      )}
      {currentScreen === "favorites" && (
        <FavoritesScreen
          onPlaceClick={(placeId) => {
            setSelectedPlaceId(placeId);
            setCurrentScreen("place-detail");
          }}
        />
      )}
      {currentScreen === "place-detail" && selectedPlaceId && (
        <PlaceDetailScreen
          placeId={selectedPlaceId}
          onBack={() => {
            if (currentScreen === "place-detail") {
              setCurrentScreen("main");
            }
          }}
          onWriteReview={() => setCurrentScreen("write-review")}
        />
      )}
      {currentScreen === "write-review" && (
        <WriteReviewScreen
          onBack={() => setCurrentScreen("place-detail")}
          onSubmit={() => setCurrentScreen("place-detail")}
        />
      )}

      {showBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
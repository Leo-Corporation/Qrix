import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

import { Button } from "./ui/button";

export default function InstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState(null as any);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Save the event so it can be triggered later.
      setDeferredPrompt(e);
    });

    window.addEventListener("appinstalled", (e) => {
      // Log install to analytics
      console.log("PWA installed");
    });
  }, []);

  const handleClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User dismissed");
        }
        // Reset deferred prompt variable
        setDeferredPrompt(null);
      });
    }
  };
  const { t } = useTranslation("common"); // default namespace (optional)

  return (
    <div>
      {deferredPrompt && (
        <>
          <h3 className="m-2 text-xs font-bold">{t("app")}</h3>

          <Button
            variant="outline"
            className="w-full justify-center font-bold"
            onClick={handleClick}
          >
            {t("install")}
          </Button>
        </>
      )}
    </div>
  );
}

const SHEET_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyDzgU6LjVOtj523vtPyOktiVFIIGW-Xtd50f2kpopz95Zmcop_4gGTikFd-Wti-tJWIg/exec";

export const trackClick = async ({
  type = "call", // call | wa
  number = "",
  name = "Click Lead",
  value = "1",
}) => {
  const gclid = localStorage.getItem("gclid") || "";

  const message =
    type === "wa"
      ? `User clicked WhatsApp: ${number}`
      : `User clicked Call: ${number}`;

  const conversionName =
    type === "wa" ? "WhatsApp Click" : "Call Click";

  try {
    if (gclid) {
      const params = new URLSearchParams({
        conversion_time: new Date().toISOString(),
        conversion_name: conversionName,
        google_click_id: gclid,
        conversion_value: value,
        conversion_currency: "USD",
        ad_user_data: "GRANTED",
        ad_personalization: "GRANTED",
        name: name,
        number: number,
        email: "click@lead.com",
        message: message,
      });

      await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`);
    }
  } catch (err) {
    console.log("TRACK ERROR", err);
  }
};
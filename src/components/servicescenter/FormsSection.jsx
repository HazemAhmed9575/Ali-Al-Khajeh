import { t } from "@/i18n/t";
import DynamicWaiverForm from "./DynamicWaiverForm";

export default function FormsSection({ messages }) {
  return (
    <section className="bg-[#0a1d37] py-24 px-[5%]" id="services">

      <div className="max-w-6xl mx-auto text-white">

        <div className="text-center mb-16">
          <h2 className="text-4xl text-[#c5a059] font-bold mb-2">
            {t(messages, "servicesCenter.forms.title")}
          </h2>

          <p>
            {t(messages, "servicesCenter.forms.subtitle")}
          </p>
        </div>

        <DynamicWaiverForm messages={messages} />

      </div>

    </section>
  );
}
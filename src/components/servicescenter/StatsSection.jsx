import { t } from "@/i18n/t";

export default function StatsSection({ messages, locale }) {
  return (
    <section className="bg-[#f8f9fa] py-16 px-[10%]">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">

        {/* Item 1 */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#eee] transition hover:-translate-y-2 hover:border-[#e2c27d]">
          <div className="text-3xl md:text-4xl font-bold text-[#0a1d37] mb-3">
            {t(messages, "personalStatus.stats.items.cases.number")}
          </div>
          <div className="text-[#666] font-semibold">
            {t(messages, "personalStatus.stats.items.cases.label")}
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#eee] transition hover:-translate-y-2 hover:border-[#e2c27d]">
          <div className="text-3xl md:text-4xl font-bold text-[#0a1d37] mb-3">
            {t(messages, "personalStatus.stats.items.satisfaction.number")}
          </div>
          <div className="text-[#666] font-semibold">
            {t(messages, "personalStatus.stats.items.satisfaction.label")}
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#eee] transition hover:-translate-y-2 hover:border-[#e2c27d]">
          <div className="text-3xl md:text-4xl font-bold text-[#0a1d37] mb-3">
            {t(messages, "personalStatus.stats.items.experience.number")}
          </div>
          <div className="text-[#666] font-semibold">
            {t(messages, "personalStatus.stats.items.experience.label")}
          </div>
        </div>

        {/* Item 4 */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-[#eee] transition hover:-translate-y-2 hover:border-[#e2c27d]">
          <div className="text-3xl md:text-4xl font-bold text-[#0a1d37] mb-3">
            {t(messages, "personalStatus.stats.items.support.number")}
          </div>
          <div className="text-[#666] font-semibold">
            {t(messages, "personalStatus.stats.items.support.label")}
          </div>
        </div>

      </div>

    </section>
  );
}
"use client";

import { useState } from "react";
import { t } from "@/i18n/t";
import DynamicWaiverForm from "./DynamicWaiverForm";
import { FaCheck } from "react-icons/fa";
import WaiverModal from "./WaiverModal";
export default function FormsSection({ messages, locale }) {
  const [selected, setSelected] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <section className="bg-[#E3E0D8] py-24 px-[5%]" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-black font-bold mb-2">
            {t(messages, "servicesCenter.forms.title")}
          </h2>
          <p className="text-black">
            {t(messages, "servicesCenter.forms.subtitle")}
          </p>
        </div>

        {/* 🔹 لو لسه مختارش */}
        {!selected && (
          <div className="flex justify-center">
            <div className="rounded-2xl shadow-lg p-3 bg-[#85754E] max-w-xs">
              <div className="relative flex flex-col items-center p-6 pt-10 bg-white rounded-xl">
                {/* Price */}
                <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-[#85754E]/90 rounded-l-full py-2 px-4 text-lg font-semibold text-white shadow-md">
                  $49 <small className="text-xs ml-1 opacity-80">/ month</small>
                </span>

                {/* Plan Name */}
                <p className="text-xl font-semibold bg-[#85754E]/20 px-3 py-1 rounded-lg text-[#85754E]">
                  Professional
                </p>

                {/* Description */}
                <p className="text-center text-gray-600 mt-4">
                  This plan is for those who have a team already and running a
                  large business.
                </p>

                {/* Features */}
                <ul className="flex flex-col space-y-4 mt-6 w-full">
                  <li className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-[#85754E] text-white rounded-full">
                      <FaCheck size={12} />
                    </span>
                    <span>
                      <strong className="font-semibold text-gray-800">
                        20
                      </strong>{" "}
                      team members
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-[#85754E] text-white rounded-full">
                      <FaCheck size={12} />
                    </span>
                    <span>
                      Plan{" "}
                      <strong className="font-semibold text-gray-800">
                        team meetings
                      </strong>
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-[#85754E] text-white rounded-full">
                      <FaCheck size={12} />
                    </span>
                    <span>File sharing</span>
                  </li>
                </ul>

                {/* Button */}
                <div className="w-full mt-8">
                  <button
                    onClick={() => setSelected(true)}
                    className="w-full py-3 text-white bg-[#85754E] rounded-lg font-medium text-lg hover:bg-[#6e613e] transition-all duration-300 hover:shadow-md active:scale-95">
                    Choose plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 بعد ما يختار */}
        {selected && (
          <div className="transition-all duration-700 animate-fade-in">
            <DynamicWaiverForm
              messages={messages}
              locale={locale}
              openModal={(data) => {
                setModalData(data);
                setOpenModal(true);
              }}
            />
          </div>
        )}


{openModal && (
  <WaiverModal
    {...modalData}
    onClose={() => setOpenModal(false)}
    messages={messages}
    locale={locale}
  />
)}
      </div>
    </section>
  );
}

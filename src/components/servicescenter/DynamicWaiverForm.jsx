"use client";

import { useState } from "react";
import { t } from "@/i18n/t";
import CustomSelect from "./CustomSelect";
import WaiverModal from "./WaiverModal";

export default function DynamicWaiverForm({ messages }) {
  const [type, setType] = useState("case");
const [idFile, setIdFile] = useState(null);
  const [formData, setFormData] = useState({
    type: type,
    reportNumber: "",
    policeStation: "",
    caseNumber: "",
    prosecution: "",
    waverName: "",
    waverId: "",
    beneficiaryName: "",
    beneficiaryId: "",
  });

  const [errors, setErrors] = useState({});
const [openModal, setOpenModal] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (type === "report") {
      if (!formData.reportNumber.trim()) newErrors.reportNumber = true;

      if (!formData.policeStation.trim()) newErrors.policeStation = true;
    }

    if (type === "case") {
      if (!formData.caseNumber.trim()) newErrors.caseNumber = true;

      if (!formData.prosecution.trim()) newErrors.prosecution = true;
    }

    if (!formData.waverName.trim()) newErrors.waverName = true;

    if (!formData.waverId.trim()) newErrors.waverId = true;

    if (!formData.beneficiaryName.trim()) newErrors.beneficiaryName = true;

    if (!formData.beneficiaryId.trim()) newErrors.beneficiaryId = true;
    if (!idFile) {
      newErrors.idFile = "required";
    } else {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(idFile.type)) {
        newErrors.idFile = "invalidType";
      }

      if (idFile.size > 5 * 1024 * 1024) {
        newErrors.idFile = "size";
      }
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = () => {
  if (validate()) {
    setOpenModal(true);
  }
};

  return (
    <div className="bg-[#0f2a44] p-8 md:p-10 rounded-2xl space-y-8">
      {/* نوع الطلب */}
      <div>
        <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
          {t(messages, "servicesCenter.forms.requestType")}
        </label>
        <CustomSelect type={type} setType={setType} messages={messages} />
      </div>

      {/* بيانات البلاغ */}
      {type === "report" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
              {t(messages, "servicesCenter.forms.reportNumber")}
            </label>
            <input
              name="reportNumber"
              value={formData.reportNumber}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.reportNumberPlaceholder",
              )}
              className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
            />
            {errors.reportNumber && (
              <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
            )}
          </div>

          <div>
            <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
              {t(messages, "servicesCenter.forms.policeStation")}
            </label>
            <input
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.policeStationPlaceholder",
              )}
              className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
            />
            {errors.policeStation && (
              <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
            )}
          </div>
        </div>
      )}

      {/* بيانات القضية */}
      {type === "case" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
              {t(messages, "servicesCenter.forms.caseNumber")}
            </label>
            <input
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.caseNumberPlaceholder",
              )}
              className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
            />
            {errors.caseNumber && (
              <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
            )}
          </div>

          <div>
            <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
              {t(messages, "servicesCenter.forms.prosecution")}
            </label>
            <input
              name="prosecution"
              value={formData.prosecution}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.prosecutionPlaceholder",
              )}
              className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
            />
            {errors.prosecution && (
              <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
            )}
          </div>
        </div>
      )}

      {/* المتنازل */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
            {t(messages, "servicesCenter.forms.waverName")}
          </label>
          <input
            name="waverName"
            value={formData.waverName}
            onChange={handleChange}
            placeholder={t(
              messages,
              "servicesCenter.forms.fullNamePlaceholder",
            )}
            className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
          />
          {errors.waverName && (
            <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
          )}
        </div>

        <div>
          <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
            {t(messages, "servicesCenter.forms.waverId")}
          </label>
          <input
            name="waverId"
            value={formData.waverId}
            onChange={handleChange}
            placeholder={t(messages, "servicesCenter.forms.idPlaceholder")}
            className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
          />
          {errors.waverId && (
            <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
          )}
        </div>
      </div>

      {/* المتنازل له */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
            {t(messages, "servicesCenter.forms.beneficiaryName")}
          </label>
          <input
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
            placeholder={t(
              messages,
              "servicesCenter.forms.fullNamePlaceholder",
            )}
            className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
          />
          {errors.beneficiaryName && (
            <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
          )}
        </div>

        <div>
          <label className="block text-[#d4b26a] font-semibold mb-2 text-sm">
            {t(messages, "servicesCenter.forms.beneficiaryId")}
          </label>
          <input
            name="beneficiaryId"
            value={formData.beneficiaryId}
            onChange={handleChange}
            placeholder={t(messages, "servicesCenter.forms.idPlaceholder")}
            className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
          />
          {errors.beneficiaryId && (
            <p className="text-red-500 text-sm mt-1">هذا الحقل مطلوب</p>
          )}
        </div>
      </div>

      {/* رفع ملفات */}
      <div>
        <label className="block text-[#d4b26a] font-semibold mb-3 text-sm">
          {t(messages, "servicesCenter.forms.attachments")}
        </label>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setIdFile(e.target.files[0])}
          className="w-full bg-[#e5e5e5] text-black p-4 rounded-xl outline-none"
        />

        {errors.idFile === "required" && (
          <p className="text-red-500 text-sm mt-1">
            يجب رفع صورة الهوية أو ملف PDF
          </p>
        )}

        {errors.idFile === "invalidType" && (
          <p className="text-red-500 text-sm mt-1">
            الملف يجب أن يكون PDF أو صورة فقط
          </p>
        )}

        {errors.idFile === "size" && (
          <p className="text-red-500 text-sm mt-1">الحد الأقصى للحجم 5MB</p>
        )}
      </div>

      {/* زر الإرسال */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-[#caa85f] to-[#d9b978] text-[#0f2a44] font-bold py-5 rounded-xl text-lg transition hover:opacity-90">
        {t(messages, "servicesCenter.forms.submit")}
      </button>
      {openModal && (
  <WaiverModal
    formData={formData}
    type={type}
    onClose={() => setOpenModal(false)}
  />
)}
    </div>
  );
}

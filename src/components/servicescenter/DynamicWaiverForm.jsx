"use client";

import { useEffect, useRef, useState } from "react";
import { t } from "@/i18n/t";
import CustomSelect from "./CustomSelect";
import WaiverModal from "./WaiverModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FileUpload from "./FileUpload";
export default function DynamicWaiverForm({ messages, locale , openModal }) {
  const [type, setType] = useState("case");
  const [waverIdFile, setWaverIdFile] = useState(null);
  const [phone, setPhone] = useState("");
  const [extraParties, setExtraParties] = useState([]);
  const [formData, setFormData] = useState({
    type: type,
    reportNumber: "",
    reportYear: "",
    policeStation: "",
    caseNumber: "",
    caseYear: "",
    prosecution: "",
    waverName: "",
    waverId: "",
    beneficiaryName: "",
    beneficiaryId: "",
    waverPhone: "",
    waverEmail: "",
    email: "",
  });
  // مطلوب
  const [beneficiaryIdFile, setBeneficiaryIdFile] = useState(null); // اختياري
  const [extraFiles, setExtraFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [openYear, setOpenYear] = useState(false);
  const yearRef = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const addParty = () => {
    setExtraParties((prev) => [
      ...prev,
      {
        name: "",
        id: "",
        file: null,
      },
    ]);
  };

  const updateParty = (index, field, value) => {
    const updated = [...extraParties];
    updated[index][field] = value;
    setExtraParties(updated);
  };

  const removeParty = (index) => {
    setExtraParties(extraParties.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    const safeTrim = (val) => (val || "").trim();

    /* ========================
     بيانات البلاغ
  ======================== */
    if (type === "report") {
      if (!safeTrim(formData.reportNumber)) newErrors.reportNumber = true;

      if (!safeTrim(formData.policeStation)) newErrors.policeStation = true;
    }

    /* ========================
     بيانات القضية
  ======================== */
    if (type === "case") {
      if (!safeTrim(formData.caseNumber)) newErrors.caseNumber = true;

      if (!formData.caseYear) newErrors.caseYear = true;

      if (!safeTrim(formData.prosecution)) newErrors.prosecution = true;
    }

    /* ========================
     بيانات المتنازل
  ======================== */
    if (!safeTrim(formData.waverName)) newErrors.waverName = true;

    if (!safeTrim(formData.waverId)) newErrors.waverId = true;

    /* ========================
     بيانات المتنازل له
  ======================== */
    if (!safeTrim(formData.beneficiaryName)) newErrors.beneficiaryName = true;

    if (!safeTrim(formData.beneficiaryId)) newErrors.beneficiaryId = true;

    /* ========================
     الأطراف الإضافية
  ======================== */
    extraParties.forEach((party, index) => {
      if (!safeTrim(party.name)) {
        newErrors[`extraPartyName_${index}`] = true;
      }

      if (!safeTrim(party.id)) {
        newErrors[`extraPartyId_${index}`] = true;
      } else if (!/^\d{15}$/.test(party.id)) {
        newErrors[`extraPartyId_${index}`] = "invalid";
      }

      if (party.file) {
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/webp",
        ];

        if (!allowedTypes.includes(party.file.type)) {
          newErrors[`extraPartyFile_${index}`] = "invalidType";
        }

        if (party.file.size > 5 * 1024 * 1024) {
          newErrors[`extraPartyFile_${index}`] = "size";
        }
      }
    });

    /* ========================
     الموبايل
  ======================== */
    const cleanPhone = (formData.waverPhone || "").replace(/\D/g, "");

    if (!cleanPhone) {
      newErrors.waverPhone = true;
    } else if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      newErrors.waverPhone = "invalid";
    }

    /* ========================
     الإيميل
  ======================== */
    if (!safeTrim(formData.email)) {
      newErrors.email = true;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "invalid";
    }

    /* ========================
     هوية المتنازل
  ======================== */
    if (!waverIdFile) {
      newErrors.waverIdFile = "required";
    } else {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(waverIdFile.type)) {
        newErrors.waverIdFile = "invalidType";
      }

      if (waverIdFile.size > 5 * 1024 * 1024) {
        newErrors.waverIdFile = "size";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
   openModal({
  formData,
  type,
  extraParties,
  waverIdFile,
  beneficiaryIdFile
});
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setOpenYear(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={yearRef} className=" p-8 md:p-10 rounded-2xl space-y-8">
      {/* نوع الطلب */}
      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          {t(messages, "servicesCenter.forms.requestType")}
        </label>
        <CustomSelect type={type} setType={setType} messages={messages} />
      </div>

      {/* بيانات البلاغ */}
      {type === "report" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                name="reportNumber"
                value={formData.reportNumber}
                onChange={handleChange}
                onKeyDown={(e) => {
                  // نسمح بالأرقام 0-9 فقط + أزرار التحكم
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text");
                  if (!/^[0-9]+$/.test(paste)) {
                    e.preventDefault();
                  }
                }}
                placeholder={t(
                  messages,
                  "servicesCenter.forms.reportNumberPlaceholder",
                )}
                className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
              />
              {errors.reportNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {t(messages, "servicesCenter.forms.required")}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setOpenYear(!openYear)}
                className="
      w-full
      bg-white
      text-black
      p-4
      rounded-xl
      border border-gray-200
      text-left
      flex justify-between items-center
      transition
      focus:border-[#85754E]
      focus:ring-2 focus:ring-[#85754E]/20
    ">
                {formData.reportYear ||
                  t(messages, "servicesCenter.forms.yearPlaceholder")}

                <svg
                  className={`w-4 h-4 transition-transform ${
                    openYear ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openYear && (
                <div
                  className="
      absolute z-50 mt-2 w-full
      bg-white
      rounded-xl
      shadow-xl
      max-h-60
      overflow-y-auto
      border border-gray-100
    ">
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <div
                        key={year}
                        onClick={() => {
                          setFormData({ ...formData, reportYear: year });
                          setOpenYear(false);
                        }}
                        className="
              px-4 py-3
              hover:bg-[#85754E]/10
              cursor-pointer
              transition
            ">
                        {year}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <input
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.policeStationPlaceholder",
              )}
              className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
            />
            {errors.policeStation && (
              <p className="text-red-500 text-sm mt-1">
                {t(messages, "servicesCenter.forms.required")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* بيانات القضية */}
      {type === "case" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* رقم البلاغ */}
            <div className="md:col-span-2">
              <input
                name="caseNumber"
                value={formData.caseNumber}
                onChange={handleChange}
                placeholder={t(messages, "servicesCenter.forms.caseNumber")}
                className="w-full bg-white text-black p-4 rounded-xl outline-none"
              />
              {errors.caseNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {t(messages, "servicesCenter.forms.required")}
                </p>
              )}
            </div>

            {/* سنة البلاغ */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setOpenYear(!openYear)}
                className="
      w-full
      bg-white
      text-black
      p-4
      rounded-xl
      border border-gray-200
      text-left
      flex justify-between items-center
      transition
      focus:border-[#85754E]
      focus:ring-2 focus:ring-[#85754E]/20
    ">
                {formData.caseYear ||
                  t(messages, "servicesCenter.forms.yearPlaceholder")}

                <svg
                  className={`w-4 h-4 transition-transform ${
                    openYear ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openYear && (
                <div
                  className="
      absolute z-50 mt-2 w-full
      bg-white
      rounded-xl
      shadow-xl
      max-h-60
      overflow-y-auto
      border border-gray-100
    ">
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <div
                        key={year}
                        onClick={() => {
                          setFormData({ ...formData, caseYear: year });
                          setOpenYear(false);
                        }}
                        className="
              px-4 py-3
              hover:bg-[#85754E]/10
              cursor-pointer
              transition
            ">
                        {year}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <input
              name="prosecution"
              value={formData.prosecution}
              onChange={handleChange}
              placeholder={t(
                messages,
                "servicesCenter.forms.prosecutionPlaceholder",
              )}
              className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
            />
            {errors.prosecution && (
              <p className="text-red-500 text-sm mt-1">
                {t(messages, "servicesCenter.forms.required")}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* رقم الهاتف */}
        <div className="relative">
          <div className="w-full [direction:ltr]">
            <PhoneInput
              country="ae"
              value={formData.waverPhone}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  waverPhone: value,
                }))
              }
              enableSearch
              containerClass="!w-full"
              inputClass="
        !w-full
        !h-[52px]
        !rounded-xl
        !border
        !border-gray-300
        !bg-white
        !pl-[75px]
        !pr-4
        !text-sm
        !text-left
        focus:!ring-2
        focus:!ring-[#85754E]
        focus:!border-[#85754E]
      "
              buttonClass="
        !absolute
        !left-0
        !top-0
        !h-[52px]
        !w-[65px]
        !bg-white
        !border-r
        !border-gray-300
        !rounded-l-xl
        flex
        items-center
        justify-center
        z-20
      "
              dropdownClass="
        !absolute
        !top-full
        !left-0
        !mt-2
        !rounded-xl
        !shadow-xl
        !text-left
        !z-50
      "
            />
          </div>

          {errors.waverPhone && (
            <span className="text-xs text-red-500 mt-1 block">
              {t(messages, "servicesCenter.forms.invalidPhone")}
            </span>
          )}
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t(messages, "servicesCenter.forms.emailPlaceholder")}
            className="w-full bg-white text-black p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#85754E]"
          />

          {errors.email === true && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.required")}
            </p>
          )}

          {errors.email === "invalid" && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.invalidEmail")}
            </p>
          )}
        </div>
      </div>

      {/* المتنازل */}
      <div ref={yearRef} className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            name="waverName"
            value={formData.waverName}
            onChange={handleChange}
            placeholder={t(messages, "servicesCenter.forms.waverName")}
            className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
          />
          {errors.waverName && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.required")}
            </p>
          )}
        </div>

        <div>
          <input
            name="waverId"
            value={formData.waverId}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text");
              if (!/^[0-9]+$/.test(paste)) {
                e.preventDefault();
              }
            }}
            placeholder={t(messages, "servicesCenter.forms.waverId")}
            className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
          />
          {errors.waverId && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.required")}
            </p>
          )}
        </div>
      </div>

      {/* المتنازل له */}
      <div ref={yearRef} className="grid md:grid-cols-2 gap-6">
        <div ref={yearRef}>
          <input
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
            placeholder={t(messages, "servicesCenter.forms.beneficiaryName")}
            className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
          />
          {errors.beneficiaryName && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.required")}
            </p>
          )}
        </div>

        <div ref={yearRef}>
          <input
            name="beneficiaryId"
            value={formData.beneficiaryId}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                ![
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                ].includes(e.key)
              ) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text");
              if (!/^[0-9]+$/.test(paste)) {
                e.preventDefault();
              }
            }}
            placeholder={t(messages, "servicesCenter.forms.beneficiaryId")}
            className="w-full bg-[#fff] text-black p-4 rounded-xl outline-none"
          />
          {errors.beneficiaryId && (
            <p className="text-red-500 text-sm mt-1">
              {t(messages, "servicesCenter.forms.required")}
            </p>
          )}
        </div>
      </div>

      {extraParties.map((party, index) => (
        <div key={index} className="space-y-2">
          <div className="flex gap-6">
            <input
              value={party.name}
              onChange={(e) => updateParty(index, "name", e.target.value)}
              placeholder={"اسم الطرف رقم " + (index + 3)}
              className="w-full bg-white text-black p-4 rounded-xl outline-none"
            />
            <div className="w-full flex gap-4">
              <input
                value={party.id}
                onChange={(e) => updateParty(index, "id", e.target.value)}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                placeholder="رقم الهوية"
                className="w-full bg-white text-black p-4 rounded-xl outline-none"
              />

              <button
                type="button"
                onClick={() => removeParty(index)}
                className="bg-red-50 text-red-500 rounded-xl px-4 py-2 hover:bg-red-100 transition  w-16 ">
                حذف
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addParty}
        className="mt-4 text-[#85754E] font-semibold hover:underline">
        + إضافة طرف آخر
      </button>

      {/* رفع ملفات */}
      <div className="grid md:grid-cols-2 gap-8 w-full">
        {/* هوية المتنازل */}
        <FileUpload
          label={t(messages, "servicesCenter.forms.waverIdUpload")}
          file={waverIdFile}
          onChange={setWaverIdFile}
          placeholder={t(messages, "servicesCenter.forms.attachments")}
          error={
            errors.waverIdFile
              ? t(messages, "servicesCenter.forms.requiredIdUpload")
              : null
          }
        />

        {/* هوية المتنازل له */}
        <FileUpload
          label={t(messages, "servicesCenter.forms.beneficiaryIdUpload")}
          file={beneficiaryIdFile}
          onChange={setBeneficiaryIdFile}
          placeholder={t(messages, "servicesCenter.forms.attachments")}
        />

        {/* هويات الأطراف الإضافية */}
        {extraParties.map((party, index) => (
          <FileUpload
            key={index}
            label={`هوية الطرف رقم ${index + 3}`}
            file={party.file}
            onChange={(file) => updateParty(index, "file", file)}
            placeholder="رفع صورة الهوية (اختياري)"
          />
        ))}
      </div>

      <div>
        <label className="block text-black font-semibold mb-2 text-sm">
          {t(messages, "servicesCenter.forms.extraFilesUpload")}
        </label>

        <div className="relative">
          <input
            type="file"
            multiple
            accept=".pdf,image/*"
            onChange={(e) =>
              setExtraFiles((prev) => [...prev, ...Array.from(e.target.files)])
            }
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          <div className="w-full min-h-[120px] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#85754E]/300 hover:border-[#85754E] transition">
            <p className="text-gray-400 text-sm">
              {t(messages, "servicesCenter.forms.uploadExtraHint")}
            </p>
          </div>
        </div>

        {/* عرض الملفات المضافة */}
        {extraFiles.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {extraFiles.map((file, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-md p-3 flex flex-col items-center group">
                {/* زر الحذف */}
                <button
                  type="button"
                  onClick={() =>
                    setExtraFiles(extraFiles.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 bg-white rounded-full shadow p-1 opacity-0 group-hover:opacity-100 transition">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M6 18L18 6"
                    />
                  </svg>
                </button>

                {/* صورة لو Image */}
                {file.type.startsWith("image") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-lg mb-2"
                  />
                )}

                {/* PDF Icon */}
                {file.type === "application/pdf" && (
                  <div className="w-20 h-20 flex items-center justify-center bg-red-50 rounded-lg mb-2">
                    <svg
                      className="w-10 h-10 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
                    </svg>
                  </div>
                )}

                {/* اسم الملف */}
                <p className="text-xs text-gray-700 text-center truncate w-full">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* زر الإرسال */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-[#85754E] to-[#85754E]  font-bold py-5 rounded-xl text-lg text-white transition hover:opacity-90">
        {t(messages, "servicesCenter.forms.submit")}
      </button>
      {/* {openModal && (
        <WaiverModal
          formData={formData}
          type={type}
          extraParties={extraParties}
          waverIdFile={waverIdFile}
          beneficiaryIdFile={beneficiaryIdFile}
          onClose={() => setOpenModal(false)}
        />
      )} */}
    </div>
  );
}

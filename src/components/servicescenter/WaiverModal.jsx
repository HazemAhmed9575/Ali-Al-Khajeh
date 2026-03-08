"use client";

import { useState, useRef } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";
import SignatureCanvas from "react-signature-canvas";
import Swal from "sweetalert2";

export default function WaiverModal({
  formData,
  type,
  extraParties,
  waverIdFile,
  beneficiaryIdFile,
  onClose,
  locale,
  messages,
}) {
const [showSignaturePad, setShowSignaturePad] = useState(false);
const [signatureImage, setSignatureImage] = useState(null);

const sigCanvas = useRef(null);

const closePad = () => setShowSignaturePad(false);

const resetModal = () => {
  setSignatureImage(null);
  setShowSignaturePad(false);
};

const baseBtn =
  "px-6 py-3 bg-[#85754E] hover:bg-[#6f6241] active:scale-95 text-white rounded-xl shadow-md transition duration-200";

const sendBtn =
  "px-6 py-3 bg-[#6f6241] hover:bg-[#5e5337] active:scale-95 text-white rounded-xl shadow-md transition duration-200";

/* =========================
   اللغة المختارة
========================= */
const lang = locale || "ar";

const titleText =
  type === "case"
    ? lang === "ar"
      ? "إقرار تنازل عن قضية"
      : "Case Waiver Declaration"
    : lang === "ar"
    ? "إقرار تنازل عن بلاغ"
    : "Police Report Waiver Declaration";
/* =========================
   تحديد هل هناك أطراف إضافية
========================= */
const hasExtraParties = extraParties && extraParties.length > 0;

/* =========================
   قائمة الموقعين
========================= */
const signersList = [
  {
    name: formData.waverName,
    id: formData.waverId,
  },
  ...(extraParties || []).map((p) => ({
    name: p.name,
    id: p.id,
  })),
]
  .map(
    (p, i) =>
      lang === "ar"
        ? `${i + 1}- السيد/ ${p.name} ، ويحمل هوية إماراتية رقم (${p.id})`
        : `${i + 1}- Mr. ${p.name}, Emirates ID (${p.id})`
  )
  .join("\n");

/* =========================
   الطرف المقابل
========================= */
const defendantLine =
  lang === "ar"
    ? `${formData.beneficiaryName} ، ويحمل هوية إماراتية رقم (${formData.beneficiaryId})`
    : `${formData.beneficiaryName}, Emirates ID (${formData.beneficiaryId})`;

/* =========================
   معلومات القضية
========================= */
const caseLine =
  type === "case"
    ? lang === "ar"
      ? `(${formData.caseNumber} لسنة ${formData.caseYear} – ${formData.prosecution})`
      : `(Case No. ${formData.caseNumber} / ${formData.caseYear} - ${formData.prosecution})`
    : lang === "ar"
    ? `(${formData.reportNumber} – مركز ${formData.policeStation})`
    : `(Report No. ${formData.reportNumber} - ${formData.policeStation})`;

/* =========================
   صيغة القضية - شخصين
========================= */
const twoPartyCaseText =
  lang === "ar"
    ? `
أنا الموقع أدناه:
السيد/ ${formData.waverName} ، وأحمل هوية إماراتية رقم (${formData.waverId})

أقر وأنا بالحالة المعتبرة شرعاً وقانوناً والتي تسمح لي بالإقرار ونفاذ التصرفات بأنني قد تنازلت عن القضية رقم ${caseLine}
المرفوعة مني ضد/ ${defendantLine}

حيث أنني تنازلت عن القضية أعلاه، وعلى هذا أوقع وأطلب من كاتب العدل توثيقه حسب الأصول.

وهذا إقرار مني بذلك.

المقر بما فيه/
${formData.waverName}
`
    : `
WAIVER DECLARATION – CASE

I, the undersigned:
Mr. ${formData.waverName}, holder of Emirates ID (${formData.waverId})

Hereby declare, while in full legal capacity, that I waive my rights in the case ${caseLine}
filed by me against ${defendantLine}.

I confirm that I voluntarily waive the above case and request the Notary Public to attest this declaration according to the applicable legal procedures.

Declarant:
${formData.waverName}
`;

/* =========================
   صيغة القضية - أكثر من شخصين
========================= */
const multiPartyCaseText =
  lang === "ar"
    ? `
نقر نحن الموقعون أدناه السادة/

${signersList}

نقر على أنفسنا ونحن بالحالة المعتبرة شرعاً وقانوناً والتي تسمح لنا بالإقرار ونفاذ التصرفات بأننا تنازلنا عن الحكم في القضية رقم ${caseLine} ، المرفوعة منا ضد /
${defendantLine}

وحيث أننا تنازلنا عن الحكم في القضية المذكورة أعلاه، ونتعهد بعدم الطعن على الحكم بأي مطعن أياً كان نوعه.

وعلى هذا نوقع ونطلب من كاتب العدل توثيقه حسب الأصول المتبعة قانوناً.

وهذا إقرار منا بذلك.
`
    : `
WAIVER DECLARATION – CASE

We, the undersigned:

${signersList}

Declare that we waive the judgment in case ${caseLine}
filed by us against ${defendantLine}.

We confirm that we voluntarily waive the above case and will not challenge the judgment in the future.

We request the Notary Public to attest this declaration according to the legal procedures.
`;

/* =========================
   صيغة البلاغ - شخصين
========================= */
const twoPartyReportText =
  lang === "ar"
    ? `
إقرار تنازل عن بلاغ

انا الموقع أدناه:
السيد/ ${formData.waverName} , احمل هوية اماراتية رقم (${formData.waverId})

اقر على نفسي انا بالحالة المعتبرة شرعا وقانونا والتي تسمح لي بالاقرار ونفاذ التصرفات بأنني تنازلت عن البلاغ رقم ${caseLine}

المرفوعة مني ضد /
${defendantLine}

حيث أنني تنازلت عن البلاغ أعلاه ، وعلى هذا أوقع واطلب من الكاتب العدل توثيقه حسب الأصول.

وهذا إقرار مني بذلك.

المقر بما فيه/
${formData.waverName}
`
    : `
WAIVER DECLARATION – REPORT

I, the undersigned:
Mr. ${formData.waverName}, holder of Emirates ID (${formData.waverId})

Hereby declare that I waive the police report ${caseLine}
filed by me against ${defendantLine}.

I confirm that I voluntarily waive the above report and request the Notary Public to attest this declaration.

Declarant:
${formData.waverName}
`;

/* =========================
   صيغة البلاغ - أكثر من شخصين
========================= */
const multiPartyReportText =
  lang === "ar"
    ? `
إقرار تنازل عن بلاغ

نقر نحن الموقعون أدناه السادة/

${signersList}

نقر على أنفسنا ونحن بالحالة المعتبرة شرعاً وقانوناً والتي تسمح لنا بالإقرار ونفاذ التصرفات بأننا تنازلنا عن البلاغ رقم ${caseLine}

المرفوع منا ضد /
${defendantLine}

وحيث أننا تنازلنا عن البلاغ المذكور أعلاه تنازلاً نهائياً ولا يحق لنا الرجوع فيه مستقبلاً.

وعلى هذا نوقع ونطلب من كاتب العدل توثيقه حسب الأصول المتبعة قانوناً.

وهذا إقرار منا بذلك.
`
    : `
WAIVER DECLARATION – REPORT

We, the undersigned:

${signersList}

Declare that we waive the police report ${caseLine}
filed by us against ${defendantLine}.

We confirm that we voluntarily waive the above report and will not claim any rights related to it in the future.

We request the Notary Public to attest this declaration according to the legal procedures.
`;

/* =========================
   اختيار النص النهائي
========================= */
let fullText = "";

if (type === "case") {
  fullText = hasExtraParties ? multiPartyCaseText : twoPartyCaseText;
}

if (type === "report") {
  fullText = hasExtraParties ? multiPartyReportText : twoPartyReportText;
}

/* =========================
   حفظ التوقيع
========================= */
const handleSaveSignature = () => {
  if (!sigCanvas.current.isEmpty()) {
    const dataUrl = sigCanvas.current.toDataURL("image/png");
    setSignatureImage(dataUrl);
    closePad();
  }
};

/* =========================
   رفع صورة توقيع
========================= */
const handleUploadSignature = (e) => {
  closePad();

  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setSignatureImage(reader.result);
  };

  reader.readAsDataURL(file);
};

/* =========================
   إرسال الإقرار
========================= */
const handleSend = async () => {
  if (!signatureImage) {
    Swal.fire({
      icon: "warning",
      title: lang === "ar" ? "تنبيه" : "Warning",
      text:
        lang === "ar"
          ? "يرجى توقيع الإقرار أولاً"
          : "Please sign the declaration first",
      confirmButtonColor: "#85754E",
    });
    return;
  }

  await Swal.fire({
    icon: "success",
    title: lang === "ar" ? "تم الإرسال بنجاح" : "Sent Successfully",
    text:
      lang === "ar"
        ? "تم إرسال الإقرار الموقع بنجاح ✔"
        : "The signed waiver has been sent successfully ✔",
    confirmButtonColor: "#85754E",
  }).then(() => {
    resetModal();
    onClose();
  });
};

const signed = !!signatureImage;
  return (
<div
  className="fixed inset-0 z-50 pt-18 flex items-center justify-center bg-black/50"
  onClick={onClose}
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white w-[95%] max-w-4xl rounded-xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl text-black"
  >
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">{titleText}</h2>
      <button onClick={onClose}>✕</button>
    </div>

    {/* Contract Text */}
    <div className={`border p-10 leading-8 min-h-[400px] ${
  lang === "ar" ? "text-right" : "text-left"
}`}>
      <h3 className="text-center font-bold mb-6 text-lg">{titleText}</h3>

      <p className="whitespace-pre-line">{fullText}</p>

      <div className="mt-16">
        <p>{  lang === "ar" ? "المقر بما فيه/" : "Declarant:"}</p>

        {signatureImage && (
          <img
            src={signatureImage}
            alt="signature"
            className="mt-4 h-20 object-contain"
          />
        )}
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-8 flex gap-4 justify-end flex-wrap">
      {!signed && (
        <>
          <button
            onClick={() => {
              closePad();
              setShowSignaturePad(true);
            }}
            className={baseBtn}
          >
            توقيع إلكتروني
          </button>

          <label className={baseBtn + " cursor-pointer"}>
            رفع صورة توقيع
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleUploadSignature}
              hidden
            />
          </label>
        </>
      )}

      {signed && (
        <button onClick={handleSend} className={sendBtn}>
          إرسال الإقرار
        </button>
      )}
    </div>

    {/* Signature Pad */}
    {showSignaturePad && (
      <div className="mt-6 p-6 border rounded-lg bg-gray-50">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: "border w-full h-40 bg-white",
          }}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => sigCanvas.current.clear()}
            className="px-4 py-2 bg-gray-400 rounded"
          >
            مسح
          </button>

          <button
            onClick={handleSaveSignature}
            className="px-4 py-2 bg-[#85754E] text-white rounded"
          >
            اعتماد التوقيع
          </button>
        </div>
      </div>
    )}
  </div>
</div>
  );
}

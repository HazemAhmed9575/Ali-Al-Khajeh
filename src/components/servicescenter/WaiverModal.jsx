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

export default function WaiverModal({ formData, type, onClose }) {
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [contractDownloaded, setContractDownloaded] = useState(false);
  const [uploadedSignedContract, setUploadedSignedContract] = useState(null);

  const sigCanvas = useRef(null);

  const closePad = () => setShowSignaturePad(false);
const resetModal = () => {
  setSignatureImage(null);
  setContractDownloaded(false);
  setUploadedSignedContract(null);
  setShowSignaturePad(false);
};
  const baseBtn =
    "px-6 py-3 bg-[#85754E] hover:bg-[#6f6241] active:scale-95 text-white rounded-xl shadow-md transition duration-200";

  const sendBtn =
    "px-6 py-3 bg-[#6f6241] hover:bg-[#5e5337] active:scale-95 text-white rounded-xl shadow-md transition duration-200";

  const titleText =
    type === "case" ? "إقرار تنازل عن قضية" : "إقرار تنازل عن بلاغ";

  const waiverText =
    type === "case"
      ? `تنازلت عن القضية رقم ${formData.caseNumber} – جزاء – نيابة ${formData.prosecution}`
      : `تنازلت عن البلاغ الجزائي رقم ${formData.reportNumber} – جزاء – مركز ${formData.policeStation}`;

  const fileName =
    type === "case" ? "Waiver-Case.docx" : "Waiver-Report.docx";

  const fullText = `
السيد/ ${formData.waverName} , احمل هوية اماراتية رقم (${formData.waverId})
اقر على نفسي انا بالحالة المعتبرة شرعا وقانونا والتي تسمح لي بالاقرار ونفاذ التصرفات بأنني ${waiverText}
, المرفوعة مني ضد / ${formData.beneficiaryName} , يحمل هوية اماراتية رقم (${formData.beneficiaryId})
حيث أنني تنازلت عن الموضوع أعلاه وذلك بدون التنازل عن الحق المدني المقرر قانونا عن المطالبة بقيمة الشيك مدنيا ،
وعلى هذا أوقع واطلب من الكاتب العدل توثيقه حسب الأصول.
`;

  const handleSaveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL("image/png");
      setSignatureImage(dataUrl);
      closePad();
    }
  };

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

  const generateWord = async () => {
    closePad();

    let imageRun = null;

    if (signatureImage) {
      const base64 = signatureImage.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );
      const binary = Uint8Array.from(atob(base64), (c) =>
        c.charCodeAt(0)
      );

      imageRun = new ImageRun({
        data: binary,
        transformation: { width: 200, height: 80 },
      });
    }

    const doc = new Document({
      sections: [
        {
          properties: { bidi: true },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: titleText,
                  bold: true,
                  size: 40,
                  font: "Traditional Arabic",
                }),
              ],
            }),
            new Paragraph(""),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: fullText,
                  size: 32,
                  font: "Traditional Arabic",
                }),
              ],
            }),
            new Paragraph(""),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "المقر بما فيه/",
                  size: 32,
                  font: "Traditional Arabic",
                }),
              ],
            }),
            imageRun
              ? new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [imageRun],
                })
              : new Paragraph(""),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);

    setContractDownloaded(true);
  };

  const handleSend = async () => {
  if (!signatureImage && !uploadedSignedContract) {
    Swal.fire({
      icon: "warning",
      title: "تنبيه",
      text: "يرجى توقيع العقد أو رفع نسخة موقعة أولاً",
      confirmButtonColor: "#85754E",
    });
    return;
  }

await Swal.fire({
  icon: "success",
  title: "تم الإرسال بنجاح",
  text: "تم إرسال العقد الموقع بنجاح ✔",
  confirmButtonColor: "#85754E",
}).then(() => {
  resetModal();
  onClose();
});

};

  const signed = !!signatureImage;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-4xl rounded-xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl text-black">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{titleText}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="border p-10 text-right leading-8 min-h-[400px]">
          <h3 className="text-center font-bold mb-6 text-lg">
            {titleText}
          </h3>

          <p className="whitespace-pre-line">{fullText}</p>

          <div className="mt-16">
            <p>المقر بما فيه/</p>
            {signatureImage && (
              <img
                src={signatureImage}
                alt="signature"
                className="mt-4 h-20"
              />
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-end flex-wrap">

          {!signed && !contractDownloaded && (
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

              <button onClick={generateWord} className={baseBtn}>
                تحميل بدون توقيع
              </button>
            </>
          )}

          {signed && (
            <>
              {!contractDownloaded && (
                <button onClick={generateWord} className={baseBtn}>
                  تحميل العقد
                </button>
              )}

              {contractDownloaded && (
                <label className={baseBtn + " cursor-pointer"}>
                  رفع العقد موقع
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) =>
                      setUploadedSignedContract(e.target.files[0])
                    }
                    hidden
                  />
                </label>
              )}

              <button onClick={handleSend} className={sendBtn}>
                إرسال العقد
              </button>
            </>
          )}

          {!signed && contractDownloaded && (
            <>
              <label className={baseBtn + " cursor-pointer"}>
                رفع العقد موقع
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) =>
                    setUploadedSignedContract(e.target.files[0])
                  }
                  hidden
                />
              </label>

              {uploadedSignedContract && (
                <button onClick={handleSend} className={sendBtn}>
                  إرسال العقد
                </button>
              )}
            </>
          )}
        </div>

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
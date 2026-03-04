export default function Steps() {

  const steps = [
    "Submit your legal request",
    "Receive acknowledgment",
    "Legal team review",
    "Formal advisory response",
  ];

  return (
    <section className="px-[20px] max-w-[900px] mx-auto text-center">

      <h2 className="text-[24px] mb-[15px]">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">

        {steps.map((step, i) => (

          <div key={i} className="bg-white p-[20px] rounded-[10px] flex gap-[10px] items-center shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">

            <span className="bg-[#85754E] text-white px-3 py-1 rounded-full">
              {i + 1}
            </span>

            {step}

          </div>

        ))}

      </div>

    </section>
  );
}
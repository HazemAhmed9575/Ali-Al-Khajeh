"use client";

export default function AdvisoryForm() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit advisory");
  };

  return (
    <section className="max-w-[700px] mx-auto mt-[40px] bg-white p-[40px] rounded-[10px] shadow-[0px_2px_15px_rgba(0,0,0,0.08)]">

      <h2 className="text-center text-[22px] mb-[20px]">
        Submit Legal Advisory Request
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">

        <input type="text" placeholder="Full Name" required className="p-[12px] border rounded-[5px]" />

        <input type="text" placeholder="Company Name" required className="p-[12px] border rounded-[5px]" />

        <input type="email" placeholder="Email Address" required className="p-[12px] border rounded-[5px]" />

        <textarea placeholder="Description" className="p-[12px] border rounded-[5px]" />

        <button className="bg-[#85754E] text-white py-[14px] rounded-[5px]">
          Submit Advisory Request
        </button>

      </form>

    </section>
  );
}
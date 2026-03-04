import { t } from "@/i18n/t";

export default function Hero({ messages }) {
  return (
    <section
      className="h-[90vh] flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: "url('/images/slider-2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="home"
    >
      <div className="max-w-4xl px-4">

        <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
          {t(messages, "servicesCenter.hero.title")}
        </h1>

        <p className="inline-block bg-[#c5a059]/20 backdrop-blur-md px-10 py-4 rounded-4xl md:rounded-full border border-white/20 text-lg md:text-xl">
          {t(messages, "servicesCenter.hero.subtitle")}
        </p>

      </div>
      


<div className="group relative flex justify-center items-center text-sm font-bold mt-16">

  {/* Tooltip */}
  <div className="absolute opacity-0 group-hover:opacity-100 
                  group-hover:-translate-y-[150%] -translate-y-[300%] 
                  duration-500 group-hover:delay-300 
                  skew-y-[10deg] group-hover:skew-y-0">

    <div className="bg-gradient-to-r from-[#9a8a60] to-[#85754E] 
                    text-white px-4 py-2 rounded-lg shadow-lg 
                    backdrop-blur-sm border border-[#6f6241]">
      <span>تنازل عن قضية أو بلاغ</span>
    </div>

    <div className="bg-[#85754E] absolute bottom-0 
                    translate-y-1/2 left-1/2 
                    translate-x-full rotate-45 p-2 shadow-md" />
  </div>


  {/* Main Button */}
  <a href="#services">
  <div  className="
      flex items-center gap-0 group-hover:gap-3
      bg-gradient-to-br from-[#9a8a60] via-[#85754E] to-[#6f6241]
      hover:from-[#85754E] hover:to-[#5e5337]
      text-white
      px-5 py-3
      rounded-full
      cursor-pointer
      shadow-lg hover:shadow-xl
      transition-all duration-300 ease-out
      active:scale-95
    ">

    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white transition duration-300"
    >
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
      />
    </svg>

    <span className="text-[0px] group-hover:text-sm transition-all duration-300 whitespace-nowrap">
      طلب التنازل الآن
    </span>
  </div>
</a>
</div>


    </section>
  );
}
import FadeIn from "./FadeIn";
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function FeaturedResources({ resources }) {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 md:px-16 bg-gradient-to-b from-sky-900 via-sky-900/95 to-sky-950">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div
          className="px-4 py-1.5 rounded-full
                     bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500
                     text-yellow-900 font-semibold text-sm
                     shadow-sm"
        >
          ✨ Trusted Community Partners
        </div>
      </div>

      <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-12">
        Organizations Making a Difference
      </h2>

      <p className="text-sky-100 text-center max-w-2xl mx-auto mb-16">
        Working together with Louisville&apos;s leading organizations to serve our community
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {resources.map((res, idx) => (
          <FadeIn key={idx} delay={idx/2 * 300}>
            <div
              className="
                relative
                rounded-2xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-lg
                p-6
                text-white
                transition
                hover:-translate-y-1
                hover:shadow-2xl
                hover:bg-white/10
              "
            >
              {res.icon && (
                <div
                  className="
                    w-14 h-14 mb-5
                    flex items-center justify-center
                    rounded-[18px]
                    bg-gradient-to-br from-sky-300/30 to-sky-500/30
                    border border-white/20
                    backdrop-blur
                    shadow-inner
                  "
                >
                  <res.icon className="w-7 h-7 text-sky-200" />
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">
                {res.name}
              </h3>

              <p className="text-sky-100/90 mb-4 leading-relaxed">
                {res.description}
              </p>

              <button
                onClick={() => {
                  navigate(`/resources?query=${encodeURIComponent(res.name)}`)
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="
                  inline-flex items-center gap-1
                  text-amber-400/80 font-medium
                  hover:text-amber-400
                  transition
                "
              >
                Learn More →
              </button>

            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={350}>
        <div className="max-w-7xl mx-auto mb-20 my-8">
            <div
            className="
                rounded-2xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-lg
                px-8 py-10
                text-white
            "
            >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-8">
                <div>
                <div className="text-4xl font-bold text-amber-200 mb-1">500+</div>
                <div className="text-amber-400/80 text-sm tracking-wide uppercase">
                    Resources Listed
                </div>
                </div>

                <div>
                <div className="text-4xl font-bold text-amber-200 mb-1">50+</div>
                <div className="text-amber-400/80 text-sm tracking-wide uppercase">
                    Partner Organizations
                </div>
                </div>

                <div>
                <div className="text-4xl font-bold text-amber-200 mb-1">24/7</div>
                <div className="text-amber-400/80 text-sm tracking-wide uppercase">
                    Access Available
                </div>
                </div>
            </div>

            <div className="h-px bg-white/10 mb-6" />

            <p className="text-center text-sky-100/90 max-w-3xl mx-auto leading-relaxed">
                These organizations represent just a few of the incredible partners working
                to support Louisville residents. Every resource on our platform has been
                verified and is ready to help you today.
            </p>
            </div>
        </div>
      </FadeIn>
    </section>
  );
}

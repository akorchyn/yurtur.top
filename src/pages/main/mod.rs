use dioxus::prelude::*;

pub mod education_clients;
pub mod technologies;

use education_clients::EducationClientsTimeline;
use technologies::Technologies;

#[component]
pub fn Main(cx: Scope) -> Element {
    let rsx = rsx! { div {
        class: "bg-secondary text-main w-full p-safe-or-4 lg:p-safe-or-16",
        div {
            class: "flex justify-between items-center",
            div {
                h1 {
                    class: "font-extrabold text-2xl lg:text-6xl",
                    "Ar"
                    span {
                        class: "text-third",
                        "tur-Yur"
                    }
                    "ii"
                }
                h1 {
                    class: "font-extrabold text-2xl lg:text-6xl",
                    "Korchynskyi"
                }
                h2 {
                    class: "text-xl lg:text-5xl",
                    "Protocol Engineer"
                }
            }
        }
        Technologies {}
        EducationClientsTimeline {}
    }};

    cx.render(rsx)
}

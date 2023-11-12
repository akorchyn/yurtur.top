use dioxus::prelude::*;

pub mod education_clients;
pub mod technologies;

use education_clients::EducationClientsTimeline;
use technologies::Technologies;

use crate::components::particle_image::ParticleImage;

pub fn Main(cx: Scope) -> Element {
    let image = include_bytes!("../../../public/heart.png");

    let image = image::load_from_memory(image).unwrap();
    let image = image.to_rgba8();

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

            ParticleImage {
                class: "w-32 h-32 lg:w-64 lg:h-64".to_string(),
                image: image,
            }
        }
        Technologies {}
        EducationClientsTimeline {}
    }};

    cx.render(rsx)
}

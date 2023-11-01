use dioxus::prelude::*;

pub mod education_clients;
pub mod technologies;

use education_clients::EducationClientsTimeline;
use technologies::Technologies;

use crate::components::particle_image::ParticleImage;

pub fn Main(cx: Scope) -> Element {
    let image = include_bytes!("../../../public/heart.jpg");

    let image = image::load_from_memory(image).unwrap();
    let image = image.to_rgba8();

    let rsx = rsx! { div {
        class: "bg-secondary text-main w-full p-safe-or-4 md:p-safe-or-16",
        div {
            class: "flex justify-between items-center",
            div {
                h1 {
                    class: "font-extrabold text-2xl md:text-6xl",
                    "Artur-Yurii"
                }
                h1 {
                    class: "font-extrabold text-2xl md:text-6xl",
                    "Korchynskyi"
                }
                h2 {
                    class: "text-xl md:text-5xl",
                    "Protocol Engineer"
                }
            }

            div {
                height: "25%",
                width: "25%",
                max_width: "350px",
                max_height: "350px",
                ParticleImage {
                    scale: 12.,
                    size: 2,
                    x_offset: 10,
                    y_offset: 0,
                    image: image,
                }
            }
        }
        Technologies {}
        EducationClientsTimeline {}
    }};

    cx.render(rsx)
}

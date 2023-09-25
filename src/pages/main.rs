use dioxus::prelude::*;

use crate::components::particle_text::ParticleText;

pub fn Main(cx: Scope) -> Element {
    let rsx = rsx! {
        div {
            class: "bg-secondary flex justify-between items-center text-main w-full p-16",
            div {
                h1 {
                    class: "font-extrabold text-6xl",
                    "Artur-Yurii"
                }
                h1 {
                    class: "font-extrabold text-6xl",
                    "Korchynskyi"
                }
                h2 {
                    class: "text-5xl",
                    "Protocol Engineer"
                }
            }

            div {
                class: "w-full h-full",
                ParticleText {
                    text: "Rust".to_string(),
                    scale: 20.,
                    size: 2,
                    x_offset: 0,
                    y_offset: -15,
                }
            }
        }
        div {
            class: "flex w-full h-full",
            ParticleText {
                text: "Rust".to_string(),
                scale: 20.,
                size: 2,
                x_offset: 0,
                y_offset: -15,
            }
        }
    };

    cx.render(rsx)
}

use dioxus::prelude::*;

use crate::components::particle_image::ParticleImage;

pub fn Main(cx: Scope) -> Element {
    let image = include_bytes!("../../public/heart.jpg");

    let image = image::load_from_memory(image).unwrap();
    let image = image.to_rgba8();

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
                height:"50%",
                width: "50%",
                max_width: "350px",
                max_height: "350px",
                ParticleImage {
                    scale: 10.,
                    size: 2,
                    x_offset: 0,
                    y_offset: -10,
                    image: image,
                }
            }
        }
    };

    cx.render(rsx)
}

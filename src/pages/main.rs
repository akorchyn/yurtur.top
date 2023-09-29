use dioxus::prelude::*;

use crate::components::particle_image::ParticleImage;

pub fn Main(cx: Scope) -> Element {
    let image = include_bytes!("../../public/heart.jpg");

    let image = image::load_from_memory(image).unwrap();
    let image = image.to_rgba8();

    let rsx = rsx! { div {
        class: "bg-secondary text-main w-full p-16",
        div {
            class: "flex justify-between items-center",
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
                    scale: 12.,
                    size: 2,
                    x_offset: 10,
                    y_offset: 0,
                    image: image,
                }
            }
        }
        div {
            h1 {
                class: "font-extrabold text-4xl text-center p-8",
                "Technologies"

            }
            div {
                class: "flex justify-evenly items-center h-24",

                img {
                    class: "h-full w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                    src: "./rust.svg",
                }
                img {
                    class: "h-full w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                    src: "./cplusplus.svg",
                }
                img {
                    class: "h-full w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                    src: "./substrate.svg",
                }
                img {
                    class: "h-full w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                    src: "./python.svg",
                }
            }
        }
    }};

    cx.render(rsx)
}

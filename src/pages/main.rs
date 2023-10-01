use dioxus::prelude::*;

use crate::components::{particle_image::ParticleImage, popover::PopOver};

pub fn Main(cx: Scope) -> Element {
    let image = include_bytes!("../../public/heart.jpg");

    let image = image::load_from_memory(image).unwrap();
    let image = image.to_rgba8();
    const TEXT: &str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam nisl, posuere sed quam vitae, tincidunt lobortis quam. Morbi non nunc porta, efficitur turpis lacinia, gravida risus. Fusce dignissim eros id justo elementum, at egestas ipsum posuere. Vivamus suscipit ullamcorper massa. Pellentesque ex nulla, fringilla sed consequat eu, sollicitudin eu nisi. Quisque pulvinar varius risus non pellentesque. Cras eu enim facilisis, maximus arcu quis, gravida lacus. Suspendisse id dui eget erat lobortis rhoncus at tristique turpis. Aliquam finibus commodo vestibulum. Donec maximus laoreet tempor. Phasellus viverra tortor eget euismod gravida. Cras auctor ante sed metus pretium eleifend.";

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
                class: "flex justify-evenly items-center",

                PopOver {
                    title: "Rust experience",
                    text: TEXT,
                    img {
                        class: "h-24 w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                        src: "./rust.svg",
                    }
                }
                PopOver {
                    title: "C++ experience",
                    text: TEXT,
                    img {
                        class: "h-24 w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                        src: "./cplusplus.svg",
                    }
                }
                PopOver {
                    title: "Substrate experience",
                    text: TEXT,
                    img {
                        class: "h-24 w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                        src: "./substrate.svg",
                    }
                }
                PopOver {
                    title: "Python experience",
                    text: TEXT,
                    img {
                        class: "h-24 w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                        src: "./python.svg",
                    }
                }
            }
        }
    }};

    cx.render(rsx)
}

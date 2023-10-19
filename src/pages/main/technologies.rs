use dioxus::prelude::*;

use crate::components::popover::PopOver;

pub fn Technologies(cx: Scope) -> Element {
    const TEXT: &str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quam nisl, posuere sed quam vitae, tincidunt lobortis quam. Morbi non nunc porta, efficitur turpis lacinia, gravida risus. Fusce dignissim eros id justo elementum, at egestas ipsum posuere. Vivamus suscipit ullamcorper massa. Pellentesque ex nulla, fringilla sed consequat eu, sollicitudin eu nisi. Quisque pulvinar varius risus non pellentesque. Cras eu enim facilisis, maximus arcu quis, gravida lacus. Suspendisse id dui eget erat lobortis rhoncus at tristique turpis. Aliquam finibus commodo vestibulum. Donec maximus laoreet tempor. Phasellus viverra tortor eget euismod gravida. Cras auctor ante sed metus pretium eleifend.";

    const TECHNOLOGIES: [(&str, &str); 4] = [
        ("Rust", "icons/rust.svg"),
        ("C++", "icons/cplusplus.svg"),
        ("Substrate", "icons/substrate.svg"),
        ("Python", "icons/python.svg"),
    ];

    let rsx = rsx!(
        div {
            h1 {
                class: "font-bold text-4xl text-center p-8",
                "Technologies"

            }
            div {
                class: "flex justify-evenly items-center",
                for (title, src) in TECHNOLOGIES {
                    PopOver {
                        title: title,
                        text: TEXT,
                        class: "relative w-fit",
                        div {
                            class: "flex flex-col items-center",
                            img {
                                class: "h-24 w-auto rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                                src: src,
                            }
                            p {
                                class: "mix-blend-multiply  ",
                                format!("{title} experience")
                            }
                        }
                    }
                }
            }
        }
    );

    cx.render(rsx)
}

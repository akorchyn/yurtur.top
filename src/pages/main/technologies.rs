use dioxus::prelude::*;

pub fn Technologies(cx: Scope) -> Element {
    const TECHNOLOGIES: [(&str, &str); 3] = [
        ("Rust", "icons/rust.svg"),
        ("C++", "icons/cplusplus.svg"),
        ("Blockchain", "icons/blockchain.svg"),
    ];

    let rsx = rsx!(
        div {
            h1 {
                class: "font-bold text-xl md:text-4xl text-center p-2 md:p-8",
                "Technologies"

            }
            div {
                class: "flex justify-evenly md:items-center flex-wrap space-x-4",
                for (title, src) in TECHNOLOGIES {
                        div {
                            class: "p-2 flex flex-col items-center rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
                            img {
                                class: "w-16 md:w-32 mb-2 h-auto",
                                src: src,
                            }
                            p {
                                class: "mix-blend-multiply text-center text-sm md:text-xl",
                                title
                            }
                        }
                }
            }
        }
    );

    cx.render(rsx)
}

use dioxus::prelude::*;

pub fn Header() -> Element {
    rsx!(
        header { class: "flex justify-between items-center bg-main w-full sticky top-0 z-50 p-safe-or-4",

            a { href: "/",
                h1 { class: "text-2xl text-white font-bold lg:ml-16",
                    "Yurtur"
                    span { class: "ml-1 text-xl font-normal", " | Your turn to innovations" }
                }
            }
        }
    )
}

use dioxus::prelude::*;

pub fn Header(cx: Scope) -> Element {
    let rsx = rsx! {
            header {
                class: "flex justify-between items-center bg-main p-4 w-full sticky top-0 z-50",

            a {
                href: "/",
                h1 {
                    class: "text-2xl text-white font-bold md:ml-16",
                    "Yurtur"
                    span {
                        class: "ml-1 text-xl font-normal",
                        " | Your turn to innovations"
                    }
                }
            }

        }
    };

    cx.render(rsx)
}

use dioxus::prelude::*;

pub fn Header(cx: Scope) -> Element {
    let rsx = rsx! {
            header {
                class: "flex justify-between items-center bg-main p-4 w-full sticky top-0",

            a {
                href: "/",
                h1 {
                    class: "text-2xl text-white font-bold ml-8",
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

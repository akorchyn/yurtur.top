use dioxus::prelude::*;

pub fn Valentine(cx: Scope) -> Element {
    let rsx = rsx! {
        div {
            class: "h-dvh bg-secondary",
            h1 {
                class: "text-center text-white",
                "Valentine"
            }
        }
    };

    cx.render(rsx)
}

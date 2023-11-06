use dioxus::prelude::*;

#[derive(Props, PartialEq)]
pub struct Props {
    text: String,
}

// Define a Tag component for individual tags
pub fn Tag(cx: Scope<Props>) -> Element {
    cx.render(rsx! {
        span {
            class: "bg-third text-white text-xs font-semibold mr-2 p-1 rounded",
            cx.props.text.as_str()
        }
    })
}

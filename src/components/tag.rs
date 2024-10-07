use dioxus::prelude::*;

// Define a Tag component for individual tags
#[component]
pub fn Tag(text: String) -> Element {
    rsx! {
        span { class: "bg-third text-white text-xs font-semibold mr-2 p-1 rounded", {text} }
    }
}

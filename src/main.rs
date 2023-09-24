#![allow(non_snake_case)]
use dioxus::prelude::*;

mod footer;
mod header;

fn main() {
    dioxus_web::launch(App);
}

fn App(cx: Scope) -> Element {
    let rsx = rsx! {
        header::Header {}
        div {
            p {
                class: "p-2 w-9/12"
            }
        }

        footer::Footer {}
    };
    cx.render(rsx)
}

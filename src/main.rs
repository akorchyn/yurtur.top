#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;
mod pages;

fn main() {
    dioxus_web::launch(App);
}

fn App(cx: Scope) -> Element {
    let rsx = rsx! {

        div {
            components::header::Header {}
            pages::main::Main {}
            components::footer::Footer {}
        }
    };
    cx.render(rsx)
}

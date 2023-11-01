#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;
mod pages;

pub fn base_url() -> String {
    web_sys::window().unwrap().location().origin().unwrap()
}

fn main() {
    let log_config = wasm_logger::Config::new(log::Level::Info);
    wasm_logger::init(log_config);
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

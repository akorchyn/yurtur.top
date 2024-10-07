#![allow(non_snake_case)]
use dioxus::prelude::*;

mod components;
mod pages;

pub fn base_url() -> String {
    web_sys::window().unwrap().location().origin().unwrap()
}

use pages::main::Main;

const _TAILWIND_URL: &str = manganis::mg!(file("public/tailwind.css"));
const _: &str = manganis::mg!(font().families(["Roboto"]));

#[component]
fn PageNotFound(route: Vec<String>) -> Element {
    rsx! {
        h1 { "Page not found" }
        p { "We are terribly sorry, but the page you requested doesn't exist." }
        pre { color: "red", "log:\nattemped to navigate to: {route:?}" }
    }
}

fn main() {
    let log_config = wasm_logger::Config::new(log::Level::Info);
    wasm_logger::init(log_config);

    launch(App);
}

fn App() -> Element {
    rsx! {
        div { class: "h-dvh bg-secondary",
            components::header::Header {}
            Main {}
            components::footer::Footer {}
        }
    }
}

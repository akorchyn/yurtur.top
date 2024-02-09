#![allow(non_snake_case)]
use dioxus::prelude::*;
use dioxus_router::prelude::*;

mod components;
mod pages;

pub fn base_url() -> String {
    web_sys::window().unwrap().location().origin().unwrap()
}

use pages::main::Main;
use pages::valentine::Valentine;

#[derive(Routable, Clone)]
#[rustfmt::skip]
enum Route {
    #[layout(Layout)]
        #[route("/")]
        Main {},
        #[nest("/#")]
            #[route("/#/valentine")]
            Valentine {},
        #[end_nest]
    #[end_layout]
    #[route("/:..route")]
    PageNotFound { route: Vec<String> },
}

#[component]
fn PageNotFound(cx: Scope, route: Vec<String>) -> Element {
    render! {
        h1 { "Page not found" }
        p { "We are terribly sorry, but the page you requested doesn't exist." }
        pre {
            color: "red",
            "log:\nattemped to navigate to: {route:?}"
        }
    }
}

fn main() {
    let log_config = wasm_logger::Config::new(log::Level::Info);
    wasm_logger::init(log_config);
    dioxus_web::launch(App);
}

#[component]
fn App(cx: Scope) -> Element {
    render! {
        Router::<Route> {}
    }
}

#[component]
fn Layout(cx: Scope) -> Element {
    let rsx = rsx! {
        div {
            class: "h-dvh bg-secondary",
            components::header::Header {}
            Outlet::<Route> {}
            components::footer::Footer {}
        }
    };
    cx.render(rsx)
}

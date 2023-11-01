use std::collections::HashMap;

use dioxus::prelude::*;

use crate::{base_url, components::expandable_card::ExpandableCard};

#[derive(serde::Deserialize, Debug)]
struct Type {
    name: String,
    timeline: String,
    description: String,
    url: String,
    #[serde(rename = "type")]
    type_: String,
    is_education: bool,
}

async fn load_content(
    key: String,
    url: String,
    mut state: UseRef<HashMap<String, Option<String>>>,
) {
    if state.read().get(&key).is_some() {
        return;
    }
    state.write().insert(key.clone(), None);
    match reqwest::get(base_url() + &url).await {
        Ok(data) => {
            let content = data.text().await.unwrap_or_else(|_| "Error".to_string());
            state.write().insert(key.clone(), Some(content));
        }
        Err(err) => {
            state
                .write()
                .insert(key.clone(), Some(format!("Error: {}", err)));
        }
    }
}

pub fn EducationClientsTimeline(cx: Scope) -> Element {
    log::info!("EducationClientsTimeline");
    let data: Vec<Type> =
        serde_json::from_str(include_str!("../../../public/education_client_data.json")).ok()?;
    log::info!("Data: {:?}", data);
    let state = use_ref(cx, || HashMap::<String, Option<String>>::new());
    log::info!("State: {:?}", state.read());

    let elements = data.into_iter().map(|element| {
        let classes = if element.is_education {
            "relative flex items-stretch items-center justify-between lg:justify-normal lg:flex-row-reverse"
        } else {
            "relative flex items-stretch items-center justify-between lg:justify-normal"
        };
        let name = element.name.clone();
        rsx! {div {
            class: classes,
            onmouseenter: move |_| {
                log::info!("Clicked on {}", element.name);
                load_content(element.name.clone(), element.url.clone(), state.clone())
            },

            ExpandableCard {
                type_: element.type_,
                right_top: element.timeline,
                header: name,
                description: element.description,
                markdown_details: state.read().get(&element.name).unwrap_or(&None).clone().unwrap_or_else(|| "Failure".to_string()),

            }
        }}
    });

    let rsx = rsx! { div {
        class: "mb-32 mt-5 m-5 md:m-10 md:mt-32 md:mb-32",
        h1 {
            class: "md:text-3xl text-xl font-bold text-center text-main",
            "Experience timeline"
        }
        // Only show this on large screens
        div {
            class: "text-2xl font-semibold text-main justify-around hidden lg:flex",
            div {
                "Work Experience"
            }
            div {
                "Education"
            }
        }
        div {
            class: "mt-5 md:mt-10 space-y-14 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-main before:to-transparent",
            elements
        }
    }};

    cx.render(rsx)
}

use std::collections::HashMap;

use dioxus::prelude::*;

use crate::{base_url, components::expandable_card::ExpandableCard};

#[derive(serde::Deserialize, Debug)]
struct Type {
    id: String,
    position: String,
    timeline: String,
    description: String,
    url: String,
    #[serde(rename = "type")]
    type_: String,
    is_education: bool,
    company: Option<String>,
    via: Option<String>,
    tags: Option<String>,
}

async fn load_content(key: String, url: String, state: UseRef<HashMap<String, Option<String>>>) {
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
    let data: Vec<Type> =
        serde_json::from_str(include_str!("../../../public/education_client_data.json")).ok()?;
    let state = use_ref(cx, HashMap::<String, Option<String>>::new);

    let elements = data.into_iter().map(|element| {
        let classes = if element.is_education {
            "relative flex items-stretch items-center justify-between lg:justify-normal lg:flex-row-reverse"
        } else {
            "relative flex items-stretch items-center justify-between lg:justify-normal"
        };
        let suffix = match (element.company, element.via) {
            (Some(company), Some(via)) => format!("at {} via {}", company, via),
            (Some(company), None) => format!("at {}", company),
            (None, Some(via)) => format!("via {}", via),
            _ => "".to_string(),
        };
        let name = element.position + " " + &suffix;

        rsx! {div {
            class: classes,
            onmouseenter: move |_| {
                load_content(element.id.clone(), element.url.clone(), state.clone())
            },

            ExpandableCard {
                id: element.id.clone(),
                type_: element.type_,
                right_top: element.timeline,
                header: name,
                description: element.description,
                markdown_details: state.read().get(&element.id).unwrap_or(&None).clone().unwrap_or_else(|| "Loading".to_string()),
                tags: element.tags.unwrap_or_default(),
            }
        }}
    });

    let rsx = rsx! { div {
        class: "mb-32 mt-5 m-5 lg:m-10 lg:mt-32 lg:mb-32",
        h1 {
            class: "lg:text-3xl text-xl font-bold text-center text-main",
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
            class: "mt-5 lg:mt-10 space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-main before:to-transparent",
            elements
        }
    }};

    cx.render(rsx)
}

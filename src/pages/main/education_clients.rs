use dioxus::prelude::*;

use crate::components::expandable_card::ExpandableCard;

#[derive(serde::Deserialize)]
struct Type {
    name: String,
    started_year: u16,
    timeline: String,
    description: String,
    details: String,
    #[serde(rename = "type")]
    type_: String,
    is_education: bool,
}

pub fn EducationClientsTimeline(cx: Scope) -> Element {
    let mut education: Vec<Type> =
        serde_json::from_str(include_str!("../../../public/education_client_data.json")).ok()?;

    education.sort_by(|a, b| a.started_year.cmp(&b.started_year).reverse());
    let elements = education.into_iter().map(|element| {
        let classes = if element.is_education {
            "relative flex items-center justify-between md:justify-normal md:flex-row-reverse"
        } else {
            "relative flex items-center justify-between md:justify-normal"
        };
        rsx! {div {
            class: classes,

            ExpandableCard {
                type_: element.type_,
                right_top: element.timeline,
                header:     element.name,
                description: element.description,
                details: element.details,

            }
        }}
    });

    let rsx = rsx! { div {
        class: "mb-32 mt-5 m-5 md:m-10 md:mt-32 md:mb-32",
        h1 {
            class: "md:text-3xl text-xl font-bold text-center text-main",
            "Experience timeline"
        }
        // Only show this on medium and large screens
        div {
            class: "text-2xl font-semibold text-main justify-around hidden md:flex",
            div {
                "Work Experience"
            }
            div {
                "Education"
            }
        }
        div {
            class: "mt-5 md:mt-10 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-main before:to-transparent",
            elements
        }
    }};

    cx.render(rsx)
}

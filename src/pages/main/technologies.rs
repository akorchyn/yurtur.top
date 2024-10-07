use dioxus::prelude::*;

use crate::components::rotatable_icon_card::RotatableIconCard;

#[derive(serde::Deserialize)]
struct UsedTechnologies {
    title: String,
    src: String,
    description: String,
}

pub fn Technologies() -> Element {
    let technologies: Vec<UsedTechnologies> =
        serde_json::from_str(include_str!("../../../public/technologies.json")).ok()?;

    rsx!(
        div {
            h1 { class: "font-bold text-xl lg:text-4xl text-center p-2 lg:p-8", "Technologies" }
            div { class: "flex justify-evenly lg:items-center flex-wrap space-x-4",
                for obj in technologies {
                    RotatableIconCard {
                        tooltip: obj.title,
                        src: obj.src,
                        size_class: "w-24 h-24 lg:w-48 lg:h-48".to_string(),
                        description: obj.description
                    }
                }
            }
        }
    )
}
